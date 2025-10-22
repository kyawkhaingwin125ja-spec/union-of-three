import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const [imageUri, setImageUri] = useState(
    require("@/assets/images/profile.jpg")
  );

  // Pick image from gallery
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access gallery is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to use camera is required!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      {/* Top Row: Profile, Activity Button, Settings */}
      <View style={styles.topRow}>
        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={pickImage}
        >
          <Image source={imageUri} style={styles.profileImage} />
        </TouchableOpacity>

        {/* Activity Button */}
        <TouchableOpacity style={styles.btnActivity}>
          <Text style={styles.btnText}>My Activity</Text>
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <MaterialIcons name="settings" size={33} color="#004BFE" />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <Text style={styles.greetingText}>Hello, Username!</Text>

      {/* Orders Section */}
      <Text style={styles.ordersText}>My Orders</Text>
      <View style={styles.btnOrder}>
        <TouchableOpacity style={styles.btnToPay}>
          <Text style={styles.btnOrderText}>To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnToReceive}>
          <Text style={styles.btnOrderText}>To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnToReview}>
          <Text style={styles.btnOrderText}>To Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  // Top row layout
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "15%",
    marginHorizontal: "5%",
  },

  profileCard: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },

  btnActivity: {
    marginLeft: 10,
    height: 45,
    width: "40%",
    backgroundColor: "#004CFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontSize: 16, color: "white", fontWeight: "600" },

  // Greeting Text
  greetingText: { fontWeight: "bold", fontSize: 22, marginTop: 20, marginLeft: 20 },
  ordersText: { fontWeight: "bold", fontSize: 21, marginTop: 20, marginLeft: 20 },

  // Orders Buttons
  btnOrder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  btnToPay: {
    height: 40,
    width: "27%",
    backgroundColor: "#E5EBFC",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnToReceive: {
    height: 40,
    width: "33%",
    backgroundColor: "#E5EBFC",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  btnToReview: {
    height: 40,
    width: "33%",
    backgroundColor: "#E5EBFC",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  btnOrderText: { color: "#0042E0" },
});
