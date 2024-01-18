import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";

const CommentModal = ({ isVisible, onClose, onPostComment, comments }) => {
  const [comment, setComment] = useState([]);

  const handlePostComment = () => {
    // Perform any necessary actions with the comment data
    // (e.g., send it to a server, update state, etc.)
    onPostComment(comment);

    // Clear the input field
    setComment("");

    // Close the modal
    onClose();
  };
  useEffect(() => {
    // setTitle(post?.title);
    // setDescription(post?.description);
    setComment(comments)
  }, [comments]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Post a Comment</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#757575" />
            <Button title="Post Comment" onPress={handlePostComment} />
          </View>
          {console.log(comments)}
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            )}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#757575",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  commentContainer: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    paddingBottom: 10,
  },
  comment: {
    fontSize: 16,
  },
});

export default CommentModal;
