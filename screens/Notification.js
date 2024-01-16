import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNotification } from '../context/notificationContext';

const Notification = () => {
  const { expoPushToken, notification, sendPushNotification } = useNotification();

  return (
    <View>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={() => sendPushNotification('This is a notification message')}
      />
    </View>
  );
};

export default Notification;
