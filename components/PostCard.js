import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Modal } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePushNotifications } from "../hooks/usePushNotifications";
import CustomAvatar from '../components/CustomAvatar';

import EditModal from "./EditModal";
import CommentModal from "./CommentModal";
import { PostContext } from "../context/postContext";
// Use the state from context

const PostCard = ({ posts, myPostScreen }) => {
  const { expoPushToken, sendPushNotification } = usePushNotifications();
  const [loading, setLoading] = useState(false);
  const [modalComment, setmodalComment] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [likes, setLikes] = useState([]);
  const [data, setData] = useState([]);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [commentStorage, setCommentStorage] = useContext(PostContext);
  const [postState, setPostState] = useContext(PostContext);

  const [post, setPost] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const navigation = useNavigation();
  //handle delete prompt
  const handleDeletePropmt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };
  //handle likes
  const likePost = async (id) => {
    try {
      const response = await axios.put(
        "/post/like",
        { postId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      setPostState((prevPosts) =>
        prevPosts.map((item) => (item._id === result._id ? result : item))
      );

      // Toggle like status for the specific post
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [id]: !prevLikedPosts[id],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Determine if the post is liked based on the likedPosts state
  const isPostLiked = (postId) => {
    return likedPosts[postId] || false;
  };
 
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      await sendPushNotification(expoPushToken, data?.message);
      navigation.navigate("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //handle comment
  const handleComment = async (text, postId) => {
    try {
      const response = await axios.put(
        "/post/comment",
        { postId, text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      // Update your state with the new comments
      setPostState((prevPosts) =>
        prevPosts.map((item) =>
          item._id === postId ? { ...item, comments: result.comments } : item
        )
      );
      await sendPushNotification(expoPushToken, "comment added successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {loading && <ActivityIndicator />}
      {/* <Text style={styles.heading}>Total Posts {posts?.length}</Text> */}
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"#8200D6"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"gray"}
                  onPress={() => handleDeletePropmt(post?._id)}
                />
              </Text>
            </View>
          )}
          {/* <Text style={styles.title}>Title : {post?.title}</Text> */}
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                <CustomAvatar name={post?.postedBy?.name} size={30} />
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              {" "}
              <FontAwesome5 name="clock" color={"#8200D6"} />{" "}
              {moment(post?.createdAt).fromNow()}
            </Text>
          </View>
          <Text style={styles.desc}> {post?.description}</Text>
          {post?.image && (
            <Image source={{ uri: post?.image }} style={styles.image} />
          )}
          <View>
            {!myPostScreen && (
              <View style={styles.likes}>
                <TouchableOpacity onPress={() => likePost(post?._id)}>
                <View style={styles.likeButton}>
                  <AntDesign
                    name="like1"
                    color={isPostLiked(post?._id) ? "#8200D6" : "#6b7280"}
                    size={20}
                  />
                  <Text>{post?.likes?.length}</Text>
                </View>
                </TouchableOpacity>
              
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <View>
                    <Text>
                      {post?.comments?.length}{" "}
                      {post?.comments?.length > 1 ? "Comments" : "Comment"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 
                <Modal
                  visible={visible}
                  backdropStyle={styles.backdrop}
                  onBackdropPress={() => setVisible(false)}
                >
                  <Card disabled={true}>
                    <Text style={styles.topComment}>Comment down below😻</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your comment"
                      value={comment}
                      onChangeText={(text) => setComment(text)}
                    />
                    <View style={styles.commentButtons}>
                      <Button onPress={() => handleComment(post?._id)}>
                        Post Comment{" "}
                      </Button>
                      <Button onPress={() => setVisible(false)}>Cancel</Button>
                    </View>
                  </Card>
                </Modal> */}
                {/* <CommentModal
                  isVisible={modalComment}
                  onClose={() => setmodalComment(false)}
                  onPostComment={handlePostComment}
                  comments={post?.comments}
                /> */}
              </View>
            )}
          </View>
          {visible && (
            <CommentModal
              postId={post._id}
              onPostComment={handleComment}
              comments={post.comments}
              cancel={() => setVisible(false)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:5, 
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#757575",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  likes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: 200,
    margin: 16,
  },
  likeButton: {
    borderColor: "#2563eb",
    width: 60,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 2,
  },
  comment: {
    borderColor: "#2563eb",
    width: 100,
    height: 45,
    borderRadius: 100,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  commentText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  topComment: {
    fontSize: 18,
    fontWeight: 500,
    padding: 30,
  },
  commentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
  commentSection: {
    flexDirection: "column",
  },
});

export default PostCard;
