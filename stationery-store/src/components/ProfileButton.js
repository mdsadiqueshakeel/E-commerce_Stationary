"use client";
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { isLoggedIn, getUserProfile } from '../utils/authUtils';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Check user authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = isLoggedIn();
      setUserLoggedIn(loggedIn);
      
      if (loggedIn) {
        const profile = getUserProfile();
        setUserProfile(profile);
      }
    };
    
    // Initial check
    checkAuthStatus();
    
    // Listen for auth state changes
    window.addEventListener('userProfileUpdated', checkAuthStatus);
    window.addEventListener('userLoggedOut', checkAuthStatus);
    
    return () => {
      window.removeEventListener('userProfileUpdated', checkAuthStatus);
      window.removeEventListener('userLoggedOut', checkAuthStatus);
    };
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.profile-popup-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!userLoggedIn) return null;

  return (
    <div className="fixed top-16 right-4 z-40 flex flex-col items-end profile-popup-container">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-3 bg-[#2f153c] text-white rounded-full shadow-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-300"
        aria-label="View profile"
      >
        {userProfile?.avatar ? (
          <div className="h-6 w-6 rounded-full overflow-hidden">
            <img 
              src={userProfile.avatar} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <User className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-xl p-4 w-64 animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[#2f153c]">My Account</h3>
          </div>
          
          <div className="py-2 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              {userProfile?.avatar ? (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#2f153c]/20">
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-[#FFE8CD] rounded-full flex items-center justify-center flex-shrink-0 border border-[#2f153c]/20">
                  <User className="h-5 w-5 text-[#2f153c]" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-[#2f153c]">{userProfile?.name || 'User'}</p>
                <p className="text-xs text-[#2f153c]/70">{userProfile?.email || ''}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <Link 
              href="/profile" 
              className="block w-full text-left px-3 py-2 text-sm text-[#2f153c] hover:bg-[#FFE8CD]/50 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View Profile
            </Link>
            <Link 
              href="/my-orders" 
              className="block w-full text-left px-3 py-2 text-sm text-[#2f153c] hover:bg-[#FFE8CD]/50 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              My Orders
            </Link>
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Link 
                href="/logout" 
                className="block w-full text-center py-2 bg-[#2f153c] text-white rounded-lg text-sm font-medium hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;