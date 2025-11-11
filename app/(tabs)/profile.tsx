import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const [imageUri, setImageUri] = useState(require("@/assets/images/profile.jpg"));
  const router=useRouter();
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow gallery access!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImageUri({ uri: result.assets[0].uri });
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow camera access!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImageUri({ uri: result.assets[0].uri });
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="inverted" backgroundColor="gray" />

      {/* 🔹 Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={imageUri} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.username}>Kyaw Khaing Win</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <MaterialIcons name="settings" size={30} color="#004BFE" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Orders Section */}
      <Text style={styles.sectionTitle}>My Orders</Text>
      <View style={styles.orderRow}>
        <TouchableOpacity style={styles.orderBtn}>
          <Ionicons name="card-outline" size={26} color="#004BFE" />
          <Text style={styles.orderLabel}>To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderBtn}>
          <Ionicons name="cube-outline" size={26} color="#004BFE" />
          <Text style={styles.orderLabel}>To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderBtn}>
          <Ionicons name="chatbox-ellipses-outline" size={26} color="#004BFE" />
          <Text style={styles.orderLabel}>To Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderBtn}>
          <Ionicons name="checkmark-done-outline" size={26} color="#004BFE" />
          <Text style={styles.orderLabel}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => router.push("../shipping_address")}
>
  <Ionicons name="location-outline" size={22} color="#333" />
  <Text style={styles.listText}>Shipping Address</Text>
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#999"
    style={{ marginLeft: "auto" }}
  />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => router.push("../payment_methods")}
>
  <Ionicons name="card-outline" size={22} color="#333" />
  <Text style={styles.listText}>Payment Methods</Text>
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#999"
    style={{ marginLeft: "auto" }}
  />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => router.push("../wishlist")}
>
  <Ionicons name="heart-outline" size={22} color="#333" />
  <Text style={styles.listText}>Wishlist</Text>
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#999"
    style={{ marginLeft: "auto" }}
  />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => router.push("../notifications")}
>
  <Ionicons name="notifications-outline" size={22} color="#333" />
  <Text style={styles.listText}>Notifications</Text>
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#999"
    style={{ marginLeft: "auto" }}
  />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => router.push("../help_center")}
>
  <Ionicons name="help-circle-outline" size={22} color="#333" />
  <Text style={styles.listText}>Help Center</Text>
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#999"
    style={{ marginLeft: "auto" }}
  />
</TouchableOpacity>

</View>


      {/* 🔹 Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: { fontSize: 20, fontWeight: "700", color: "#222" },
  editProfile: { color: "#004BFE", marginTop: 5, fontWeight: "500" },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginLeft: 20, marginTop: 25, color: "#333" },

  orderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  orderBtn: { alignItems: "center" },
  orderLabel: { fontSize: 13, color: "#444", marginTop: 5 },

  listContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listText: { fontSize: 16, color: "#333", marginLeft: 10 },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: 60,
    paddingVertical: 12,
    backgroundColor: "#ff4d4f",
    borderRadius: 25,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
