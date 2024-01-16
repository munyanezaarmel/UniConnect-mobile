import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";
import { NotificationProvider } from './context/notificationContext'; 


const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
      <NotificationProvider>
          <ScreenMenu />
        </NotificationProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
