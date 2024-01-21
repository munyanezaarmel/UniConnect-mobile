import React from 'react';
import { Avatar } from 'react-native-elements';

const CustomAvatar = ({ name, size }) => {
  // Function to get the first letter from the name
  const getInitials = (name) => {
    const nameArray = name?.split(' ');
    return nameArray?.map(word => word[0])?.join('');
  };

  return (
    <Avatar
      size={size}
      rounded
      title={getInitials(name)}
      overlayContainerStyle={{ backgroundColor: '#8200D6' }} 
      containerStyle={{ marginRight: 10 }}
      // Customize the background color
    />
  );
};

export default CustomAvatar;
