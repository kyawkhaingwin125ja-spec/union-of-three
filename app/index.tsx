import {
  Raleway_300Light,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { Ionicons } from "@expo/vector-icons"; // for arrow icon
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

export default function Index() {
  const router=useRouter();
  const [isActive, setIsActive] = useState(false);

  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_300Light,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Ellipse shape (main) */}
      <Pressable
        onPressIn={() => setIsActive(true)}
        onPressOut={() => setIsActive(false)}
        onHoverIn={() => setIsActive(true)}
        onHoverOut={() => setIsActive(false)}
        style={[styles.ellipse, isActive && styles.ellipseActive]}
      />

      {/* Title */}
      <Text style={styles.shoppeText}>Shoppe</Text>

      {/* Subtitle */}
      <Text style={styles.subtitleText}>
        Beautiful eCommerce UI Kit {"\n"}for your online store
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.startButton} onPress={()=>router.push('/create_account')}>
        <Text style={styles.startButtonText}>Let’s get started</Text>
      </TouchableOpacity>

      {/* Bottom section */}
      <View style={styles.bottomContainer}>
        <Text style={styles.accountText}>I already have an account</Text>
        <TouchableOpacity style={styles.arrowButton} >
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Root container
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  // Ellipse (top)
  ellipse: {
    position: "absolute",
    top: verticalScale(100),
    alignSelf: "center",
    width: scale(134),
    height: scale(134),
    borderRadius: scale(67),
    backgroundColor: "#F2F2F2",
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ellipseActive: {
    borderColor: "#004CFF",
  },

  // Title
  shoppeText: {
    marginTop: verticalScale(200),
    fontFamily: "Raleway_700Bold",
    fontSize: moderateScale(48),
    color: "#202020",
  },

  // Subtitle
  subtitleText: {
    marginTop: verticalScale(20),
    textAlign: "center",
    width: "80%",
    lineHeight: verticalScale(28),
    fontSize: moderateScale(17),
    fontFamily: "Raleway_300Light",
    color: "#202020",
  },

  // Start button
  startButton: {
    marginTop: verticalScale(60),
    width: "85%",
    height: verticalScale(55),
    backgroundColor: "#004CFF",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(18),
    fontFamily: "Raleway_700Bold",
  },

  // Bottom section (account + arrow)
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(30),
  },

  accountText: {
    fontFamily: "Raleway_300Light",
    fontSize: moderateScale(15),
    color: "#202020",
  },

  arrowButton: {
    marginLeft: scale(10),
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#004CFF",
    justifyContent: "center",
    alignItems: "center",
  },
});