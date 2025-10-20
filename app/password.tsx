import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PasswordScreen() {
  const [isActive, setIsActive] = useState(false);
  const [password, setPassword] = useState(["", "", "", ""]);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputsRef = useRef<TextInput[]>([]);

  const keyboardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(keyboardAnim, {
      toValue: showKeyboard ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [showKeyboard]);

  const handleChange = (index: number, value: string) => {
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    if (value) {
      setVisibleIndex(index);
      setTimeout(() => setVisibleIndex(null), 500);
    }
  };

  const handleKeyPress = (num: string) => {
    const nextIndex = password.findIndex((p) => p === "");
    if (nextIndex !== -1) {
      handleChange(nextIndex, num);
    }
  };

  const handleBackspace = () => {
    const lastIndex = password
      .map((p, i) => (p ? i : -1))
      .filter((i) => i !== -1)
      .pop();
    if (lastIndex !== undefined) handleChange(lastIndex, "");
  };

  const handleArrowPress = () => {
    console.log("Arrow pressed!");
  };

  // Animate keyboard and move password frame up
  const keyboardTranslateY = keyboardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, 0],
  });

  const passwordTranslateY = keyboardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -verticalScale(120)],
  });

  return (
    <Pressable style={styles.screen} onPress={() => setShowKeyboard(false)}>
      <ImageBackground
        source={require("../assets/images/password.png")}
        style={styles.background}
        resizeMode="cover"
      />

      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Animated.View
        style={[styles.container, { transform: [{ translateY: passwordTranslateY }] }]}
      >
        <Pressable
          onPressIn={() => setIsActive(true)}
          onPressOut={() => setIsActive(false)}
          style={[styles.ellipse, isActive && styles.ellipseActive]}
        >
          <Image
            source={require("../assets/images/artist.png")}
            resizeMode="cover"
            style={styles.insideEllipseImage}
          />
        </Pressable>

        <Text style={styles.helloText}>Hello, Kyaw!</Text>
        <Text style={styles.passwordText}>Type your password</Text>

        
 <TouchableOpacity
 activeOpacity={1}
 hitSlop={20}
 onPress={() => setShowKeyboard(true)}
 style={styles.passwordFrame}
>

  {password.map((value, index) => (
    <TextInput
      key={index}
      ref={(ref) => {
        if (ref) inputsRef.current[index] = ref;
      }}
      value={visibleIndex === index ? value : value ? "•" : ""}
      style={styles.input}
      editable={false}
      textAlign="center"
    />
  ))}
</TouchableOpacity>

      </Animated.View>

      <View style={styles.bottomBar} />

      <View style={styles.notMeContainer}>
        <Text style={styles.notMeText}>Not me?</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleArrowPress}>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Custom Keyboard */}
      <Animated.View
        style={[styles.keyboard, { transform: [{ translateY: keyboardTranslateY }] }]}
      >
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleKeyPress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleBackspace}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  background: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: "transparent" },
  ellipse: {
    position: "absolute",
    top: verticalScale(100),
    alignSelf: "center",
    width: scale(134),
    height: scale(134),
    borderRadius: scale(67),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ellipseActive: { borderColor: "#004CFF" },
  insideEllipseImage: { width: "100%", height: "100%", borderRadius: scale(67) },
  helloText: {
    position: "absolute",
    top: verticalScale(280),
    alignSelf: "center",
    fontFamily: "Raleway_700Bold",
    fontSize: moderateScale(48),
    color: "#202020",
  },
  passwordText: {
    position: "absolute",
    top: verticalScale(380),
    alignSelf: "center",
    fontFamily: "NunitoSans_400Regular",
    fontSize: moderateScale(19),
    color: "#202020",
  },
  passwordFrame: {
    position: "absolute",
    top: verticalScale(420),
    alignSelf: "center",
    width: scale(213),
    height: verticalScale(50.56),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(12.64),
    paddingVertical: verticalScale(6.74),
    borderRadius: moderateScale(8),
    
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    marginHorizontal: scale(6.32 / 2),
    height: "100%",
    fontSize: moderateScale(20),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderRadius: scale(10.11),
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  bottomBar: {
    position: "absolute",
    bottom: verticalScale(20),
    alignSelf: "center",
    width: scale(134),
    height: verticalScale(5),
    backgroundColor: "#000000",
    borderRadius: scale(34),
  },
  notMeContainer: {
    position: "absolute",
    bottom: verticalScale(50),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  notMeText: {
    fontSize: moderateScale(16),
    color: "#000",
    fontFamily: "NunitoSans_400Regular",
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
  keyboard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  key: {
    width: scale(60),
    height: scale(60),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004CFF",
    borderRadius: scale(10),
  },
  keyText: { color: "#fff", fontSize: moderateScale(20), fontWeight: "bold" },
});
