import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export type RootStackParamList = {
  create_account: undefined;
  otp_confirm: undefined;
};

type CreateAccountScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'create_account'
>;

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

export default function Create_account() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [pickedUri, setPickedUri] = useState<string | null>(null);
  const [phone, setPhone] = useState('');

  const navigation = useNavigation<CreateAccountScreenProp>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const assets = (result as ImagePicker.ImagePickerSuccessResult).assets;
      if (assets.length > 0) {
        setPickedUri(assets[0].uri);
        setPhoto(assets[0].uri); // directly use selected photo
      }
    }
  };

  const handleDone = () => {
    // remove all spaces
    const trimmedPhone = phone.replace(/\s/g, '');
    // allow only digits
    const isNumeric = /^\d+$/.test(trimmedPhone);

    if (photo && trimmedPhone.length === 10 && isNumeric) {
      // ✅ all info filled correctly
      router.push('./password')
    } else {
      // ❌ missing info
      Alert.alert(
        'Incomplete Info',
        'Please enter your phone number and select a photo.'
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('@/assets/images/create_account.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Top-left section: Title + Photo */}
          <View style={styles.topLeftSection}>
            <Text style={styles.titleText}>Create Account</Text>

            <TouchableOpacity style={styles.photoFrame} onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <Text style={styles.photoPlaceholder}>Upload Photo</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom-center section: Phone + Done Button */}
          <View style={styles.centerSection}>
            <View style={styles.phoneContainer}>
              <TouchableOpacity style={styles.flag}>
                <Image
                  source={{ uri: 'https://flagcdn.com/w40/mm.png' }}
                  style={styles.flagImage}
                />
                <Text style={styles.code}>+95   |</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                placeholder="9 888 777 111"
                value={phone}
                onChangeText={(text) => {
                  // keep only digits, max 10 digits
                  let numericText = text.replace(/\D/g, '').slice(0, 10);
                  // format sample style
                  let formatted = '';
                  if (numericText.length > 0)
                    formatted += numericText.slice(0, 1);
                  if (numericText.length >= 2)
                    formatted += ' ' + numericText.slice(1, 4);
                  if (numericText.length >= 5)
                    formatted += ' ' + numericText.slice(4, 7);
                  if (numericText.length >= 8)
                    formatted += ' ' + numericText.slice(7, 10);
                  setPhone(formatted);
                }}
                keyboardType="number-pad"
              />
            </View>

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setPickedUri(null);
                setPhoto(null);
                setPhone('');
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingVertical: 20 * scale,
    paddingHorizontal: 15 * scale,
  },
  topLeftSection: {
    alignItems: 'flex-start',
    marginTop: 60 * scale,
    width: 300 * scale,
  },
  titleText: {
    color: 'black',
    fontSize: 45 * scale,
    fontWeight: 'bold',
    marginBottom: 20 * scale,
  },
  photoFrame: {
    width: 150 * scale,
    height: 150 * scale,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 75 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 75 * scale,
  },
  photoPlaceholder: {
    color: '#555',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
  centerSection: {
    marginTop: 50 * scale,
    alignItems: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8 * scale,
    backgroundColor: '#fff',
    width: '90%',
    paddingHorizontal: 10 * scale,
    paddingVertical: 5 * scale,
    marginBottom: 20 * scale,
    marginTop: 20 * scale,
  },
  flag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10 * scale,
  },
  flagImage: {
    width: 24 * scale,
    height: 16 * scale,
    marginRight: 6 * scale,
  },
  code: {
    fontSize: 16 * scale,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16 * scale,
    paddingVertical: 5 * scale,
  },
  doneButton: {
    width: '90%',
    backgroundColor: '#007bff',
    paddingVertical: 12 * scale,
    borderRadius: 8 * scale,
    alignItems: 'center',
    marginTop: 120 * scale,
  },
  doneText: {
    color: '#fff',
    fontSize: 18 * scale,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '90%',
    backgroundColor: '#c5c7caff',
    paddingVertical: 12 * scale,
    borderRadius: 8 * scale,
    alignItems: 'center',
    marginTop: 10 * scale,
  },
  cancelText: {
    color: '#fff',
    fontSize: 18 * scale,
    fontWeight: 'bold',
  },
});