// src/utils/authUtils.js

/**
 * Check if user is logged in by checking for auth token in localStorage
 * @returns {boolean} True if user is logged in, false otherwise
 */
export const isLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = localStorage.getItem('auth_token');
    return !!token; // Convert to boolean
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

/**
 * Get user profile data from localStorage
 * @returns {Object|null} User profile data or null if not found
 */
export const getUserProfile = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userProfile = localStorage.getItem('user_profile');
    return userProfile ? JSON.parse(userProfile) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Save user profile data to localStorage and cookies
 * @param {Object} profileData - User profile data to save
 */
export const saveUserProfile = (profileData) => {
  if (typeof window === 'undefined') return;
  
  try {
    const profileJson = JSON.stringify(profileData);
    
    // Save to localStorage
    localStorage.setItem('user_profile', profileJson);
    
    // Save to cookies for server-side access
    document.cookie = `user_profile=${profileJson}; path=/; max-age=86400`;
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('userProfileUpdated'));
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
};

/**
 * Log user out by removing auth token and user profile from localStorage and cookies
 */
export const logout = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    
    // Clear cookies
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_profile=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('userLoggedOut'));
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

/**
 * Update specific user profile fields in both localStorage and cookies
 * @param {Object} updatedFields - Fields to update in the user profile
 */
export const updateUserProfile = (updatedFields) => {
  if (typeof window === 'undefined') return;
  
  try {
    const currentProfile = getUserProfile() || {};
    const updatedProfile = { ...currentProfile, ...updatedFields };
    
    // Use saveUserProfile to update both localStorage and cookies
    saveUserProfile(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};