
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Login = () => {
  const router=useRouter();
  return (
    <ScreenWrapper bg={"black"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require("@/assets/images/login.png")}
      >
        <View style={{position:'absolute',bottom:0,width:'100%',paddingHorizontal:20,marginBottom:'15%'}}>
        <View style={{justifyContent:'center'}}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Login</Text>
          <Text>Good to see you back!♥</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#D2D2D2"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.btn}  onPress={()=>router.push('/password')}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20,alignContent:'center',alignItems:'center' }}>
          <Text style={{ color: "black"}}>
            Cancel
          </Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent:'center'
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btn: {
    height: 50,
    width: "100%",
    backgroundColor: "#007AFF", // Blue color for a modern look
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

