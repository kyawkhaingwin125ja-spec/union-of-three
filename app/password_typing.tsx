// app/password_typing.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PasswordTyping() {
  const navigation = useNavigation<any>();
  const [isActive, setIsActive] = useState(false);
  const [shift, setShift] = useState(false);
  const [numbersMode, setNumbersMode] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"default" | "success" | "error">("default");

  const ellipses = Array(8).fill(0);
  const correctPassword = "1234kyaw";

  const letters = {
    lower: ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"],
    upper: ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]
  };
  const numbers = ["1","2","3","4","5","6","7","8","9","0"];
  const symbols = ["!","@","#","$","%","&","*","(",")"];

  const handleKeyPress = (key: string) => {
    if (key === "⌫") {
      setPassword(password.slice(0, -1));
      setStatus("default");
    } else if (key === "shift") {
      setShift(!shift);
    } else if (key === "123") {
      setNumbersMode(!numbersMode);
      setShift(false);
    } else if (key === "space") {
      setPassword(password + " ");
    } else if (key === "Go") {
      if (password === correctPassword) {
        setStatus("success");
        navigation.navigate("hello_card");
      } else {
        setStatus("error");
      }
    } else {
      if (password.length < 8) {
        setPassword(password + key);
        setStatus("default");
      }
    }
  };

  const getRows = () => {
    if (numbersMode) {
      return [
        numbers.slice(0,5),
        numbers.slice(5).concat(symbols.slice(0,4)),
        symbols.slice(4).concat(["⌫"])
      ];
    } else {
      const row1 = shift ? letters.upper.slice(0,10) : letters.lower.slice(0,10);
      const row2 = shift ? letters.upper.slice(10,19) : letters.lower.slice(10,19);
      const row3 = shift ? letters.upper.slice(19) : letters.lower.slice(19);
      return [
        row1,
        row2,
        row3.concat(["⌫"])
      ];
    }
  };

  const getEllipseColor = (index: number) => {
    if (status === "default") return index < password.length ? "#004BFE" : "#E5EBFC";
    if (status === "success") return "#004BFE";
    if (status === "error") return "#EC4E4E";
  };

  return (
    <Pressable style={styles.screen}>
      <ImageBackground
        source={require("../assets/images/password.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <View style={styles.container}>
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

        <View style={styles.ellipsesContainer}>
          {ellipses.map((_, index) => (
            <View
              key={index}
              style={[styles.smallEllipse, { backgroundColor: getEllipseColor(index) }]}
            />
          ))}
        </View>

        {status === "error" && (
          <Pressable
            onPress={() => navigation.navigate("password_recovery")}
          >
            <Text style={styles.forgetText}>Forget your password?</Text>
          </Pressable>
        )}

        <View style={styles.keyboardContainer}>
          {getRows().map((row, i) => (
            <View key={i} style={styles.keyRow}>
              {i === 2 && !numbersMode && (
                <TouchableOpacity
                  style={[styles.key, { width: SCREEN_WIDTH / 10 }]}
                  onPress={() => handleKeyPress("shift")}
                >
                  <Ionicons 
                    name="arrow-up" 
                    size={moderateScale(20)} 
                    color={shift ? "#004BFE" : "#000"} 
                  />
                </TouchableOpacity>
              )}
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.key}
                  onPress={() => handleKeyPress(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={styles.bottomKeyRow}>
            <TouchableOpacity
              style={styles.bottomKey}
              onPress={() => handleKeyPress("123")}
            >
              <Text style={styles.keyText}>123</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomKey, styles.spaceKey]}
              onPress={() => handleKeyPress("space")}
            >
              <Text style={styles.keyText}>space</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomKey, styles.goKey]}
              onPress={() => handleKeyPress("Go")}
            >
              <Text style={[styles.keyText, { color: "#fff", fontWeight: "bold" }]}>
                Go
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  background: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  container: { flex: 1, backgroundColor: "transparent" },

  ellipse: {
    position: "absolute",
    top: verticalScale(85),
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

  helloText: { position: "absolute", top: verticalScale(240), alignSelf: "center", fontFamily: "Raleway_700Bold", fontSize: moderateScale(48), color: "#202020" },
  passwordText: { position: "absolute", top: verticalScale(330), alignSelf: "center", fontFamily: "NunitoSans_400Regular", fontSize: moderateScale(19), color: "#202020" },
  ellipsesContainer: { position: "absolute", top: verticalScale(370), flexDirection: "row", justifyContent: "space-between", width: scale(250), alignSelf: "center" },
  smallEllipse: { width: scale(17), height: scale(17), borderRadius: scale(8.5), backgroundColor: "#E5EBFC" },
  forgetText: { position: "absolute", top: verticalScale(400), alignSelf: "center", fontFamily: "NunitoSans_400Regular", fontSize: moderateScale(16), color: "#EC4E4E", textDecorationLine: "underline" },

  keyboardContainer: { position: "absolute", bottom: verticalScale(20), width: "100%", backgroundColor: "#E5EBFC", paddingVertical: verticalScale(5), borderTopLeftRadius: scale(20), borderTopRightRadius: scale(20), alignItems: "center" },
  keyRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: verticalScale(4) },
  key: { width: SCREEN_WIDTH / 11.5, height: verticalScale(45), marginHorizontal: scale(2), backgroundColor: "#FFFFFF", borderRadius: scale(8), justifyContent: "center", alignItems: "center", elevation: 2 },
  keyText: { fontSize: moderateScale(17), color: "#000", fontFamily: "NunitoSans_400Regular" },
  bottomKeyRow: { flexDirection: "row", justifyContent: "space-between", width: "88%", marginTop: verticalScale(8) },
  bottomKey: { height: verticalScale(45), borderRadius: scale(8), backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", elevation: 2, paddingHorizontal: scale(15) },
  spaceKey: { flex: 1, marginHorizontal: scale(8) },
  goKey: { backgroundColor: "#004CFF", width: scale(65) },

  bottomBar: { position: "absolute", bottom: verticalScale(10), alignSelf: "center", width: scale(134), height: verticalScale(5), backgroundColor: "#000000", borderRadius: scale(34) },
});
