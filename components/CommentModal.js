// CommentComponent.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CustomAvatar from "./CustomAvatar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import moment from "moment";

const CommentModal = ({
  postId,
  onPostComment,
  comments,
  cancel,
  isVisible,
}) => {
  const [comment, setComment] = useState("");

  const handlePostComment = () => {
    if (comment.trim() !== "") {
      onPostComment(comment, postId);
      setComment("");
    }
  };

  return (
    <View className="flex justify-center items-center p-4 bg-white rounded-lg  mx-5 space-y-4 mb-3">
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        className="bg-black/5 p-5 rounded-2xl w-full mb-2 "
      >
        <TextInput
          placeholder="Enter your comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        style={{
          padding: 5,
          flexDirection: "row", // Flex direction to make the buttons appear in a row
          justifyContent: "space-between", // Align buttons at the ends of the container
          alignItems: "center", // Align items in the center vertically
          marginBottom: 2,
          borderRadius: 20,
          width: "100%",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "gray", // You can change the color
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
          onPress={cancel}
        >
          <Text style={{ color: "white" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#8200D6", // You can change the color
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
          onPress={handlePostComment}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Post Comment
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          padding: 5,
          flexDirection: "column", // Updated to column to display comments vertically
          justifyContent: "space-between",
          alignItems: "flex-start", // Align items to the start of the column
          marginBottom: 2,
          borderRadius: 20,
          width: "100%",
        }}
        entering={FadeInDown.duration(1000).springify()}
        className="bg-black/5 p-5 rounded-2xl w-full mb-2 "
      >
        {comments.length === 0 ? (
          <Text>No comments yet.</Text>
        ) : (
          comments.map((comment, index) => (
            <View key={comment._id} className="flex mb-2">
              <View
                style={{
                  padding: 5,
                  flexDirection: "row", // Updated to column to display comments vertically
                  alignItems: "flex-start",
                  alignItems: "center", // Align items to the start of the column
                  marginBottom: 2,
                  borderRadius: 20,
                  width: "100%",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    flexDirection: "row", // Updated to column to display comments vertically
                    alignItems: "flex-start",
                  }}
                >
                  <CustomAvatar name={comment?.postedBy?.name} size={30} />
                  {comment?.postedBy?.name}
                </Text>
                <Text
                  style={{
                    marginBottom: -15,
                  }}
                >
                  {comment.text}
                </Text>
                {/* <Text> {moment(comment?.createdAt).fromNow()}</Text> */}
              </View>
            </View>
          ))
        )}
      </Animated.View>
    </View>
  );
};

export default CommentModal;
