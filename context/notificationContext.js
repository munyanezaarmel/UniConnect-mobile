import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'CLEAR_NOTIFICATIONS':
      return [];
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          dispatch({ type: 'CLEAR_NOTIFICATIONS' });
          const parsedNotifications = JSON.parse(storedNotifications);
          dispatch({ type: 'ADD_NOTIFICATION', payload: parsedNotifications });
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    const saveNotifications = async () => {
      try {
        await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      } catch (error) {
        console.error('Error saving notifications:', error);
      }
    };

    saveNotifications();
  }, [notifications]);

  const sendPushNotification = async (expoPushToken, messageText) => {
    try {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: messageText,
        data: { someData: 'goes here' },
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      // Update the notifications state
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: messageText } });

    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, dispatch, sendPushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };
