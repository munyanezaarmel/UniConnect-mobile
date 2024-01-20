import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import React, { useState, useContext } from "react";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import { usePushNotifications } from '../hooks/usePushNotifications';



const Post = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { expoPushToken,sendPushNotification } = usePushNotifications();

  const [error, setError] = useState(null);
  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // global state
  const [posts, setPosts] = useContext(PostContext);
  // local state
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const[image,setImage]=useState("")
  const [loading, setLoading] = useState(false);

  //handle form data post DATA
  const handlePost = async () => {

    try {
      setLoading(true);
      if (!description) {
        alert("Please add post  description");
      }
      const formData=new FormData()
      if(description) formData.append("description",description)
      if (selectedImage) {
        formData.append("image", {
          uri: selectedImage,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }
      console.log(formData)
      const { data } = await axios.post("/post/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
    
      setPosts((prevPosts) => [data?.post, ...prevPosts]);
        await sendPushNotification(expoPushToken,(data?.message))
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          {/* <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          /> */}
          <TextInput
            style={styles.inputBox}
            placeholder="what's on your mind"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDecription(text)}
          />
          {selectedImage && (
            <View style={styles.imageContainer}>
                  {console.log("Selected Image URI:", selectedImage)}
              <Image
                source={{ uri: selectedImage }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              {/* <FontAwesome5 name="plus-square" size={18} /> {"  "} */}
              Create post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop:10
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  upload: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 16,
  },
});

export default Post;
