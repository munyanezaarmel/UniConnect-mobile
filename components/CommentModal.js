// CommentComponent.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CommentModal = ({ postId, onPostComment, comments }) => {
  const [comment, setComment] = useState('');

  const handlePostComment = () => {
    if (comment.trim() !== '') {
      onPostComment(comment, postId);
      setComment('');
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Enter your comment"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <Button title="Post Comment" onPress={handlePostComment} />
      <View>
        {comments.map((comment, index) => (
          <Text key={index}>{comment.text}</Text>
        ))}
      </View>
    </View>
  );
};

export default CommentModal;
