// src/utils/mockAuthHelper.js
// This file is for development/testing purposes only

/**
 * Simulate a user login for testing purposes
 * @param {Object} userData - User data to save in localStorage
 */
export const mockLogin = (userData = null) => {
  // Default user data if none provided
  const defaultUserData = {
    name: 'John Doe',
    email: 'test@ac.in',
    avatar: null
  };
  
  const userProfile = userData || defaultUserData;
  
  // Set auth token and user profile in localStorage
  localStorage.setItem('auth_token', 'mock_token_' + Date.now());
  localStorage.setItem('user_profile', JSON.stringify(userProfile));
  
  // Dispatch events to notify components
  window.dispatchEvent(new Event('userProfileUpdated'));
  window.dispatchEvent(new Event('storage'));
};