import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Recovery: React.FC = () => {
  const router=useRouter();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  // Auto focus first input
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <ScreenWrapper style={{ backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require("@/assets/images/passrecovery.png")}
        >
          <StatusBar barStyle="dark-content" backgroundColor="white" />

          <View>
            <Image
              source={require("@/assets/images/image.png")}
              style={{ alignSelf: "center", marginTop: "38%" }}
            />

            <Text style={styles.title}>Password Recovery</Text>
            <Text style={styles.subtitle}>Enter 4-digit code we sent you</Text>
            <Text style={styles.subtitle}>on your phone number</Text>
            <Text style={styles.phone}>+959*********</Text>

            <View style={styles.textInput}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    inputs.current[index] = el;
                  }}
                  style={styles.input}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  textAlign="center"
                  caretHidden={true} // hide cursor
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>router.push('/newpassword')}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Send Again</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "10%",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default Recovery;

const styles = StyleSheet.create({
  background: { flex: 1 },
  title: { textAlign: "center", marginTop: "3%", fontWeight: "bold", fontSize: 21 },
  subtitle: { textAlign: "center", fontSize: 19 },
  phone: { textAlign: "center", fontSize: 16, fontWeight: "bold" },
  textInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
    alignSelf: "center",
    marginTop: 30,
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 27.5,
    borderWidth: 1.5,
    borderColor: "#cdd3d8ff",
    backgroundColor: "#cdd3d8ff",
    fontSize: 15,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#FF5790",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
