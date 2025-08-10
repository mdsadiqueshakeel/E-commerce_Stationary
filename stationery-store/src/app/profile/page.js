import React from 'react';
import UserProfile from '../../components/Profile/UserProfile';
import "../../Styles/globals.css";

export const metadata = {
  title: 'My Profile | Stationery Store',
  description: 'View and manage your profile information',
};

export default function ProfilePage() {
  return <UserProfile />;
}