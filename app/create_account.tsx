import * as ImagePicker from 'expo-image-picker';

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

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Single scale factor for responsive design
const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

export default function Create_account() {
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState('');
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  // Type-safe check
if (!result.canceled) {
  const assets = (result as ImagePicker.ImagePickerSuccessResult).assets;
  if (assets.length > 0) {
    //setPhoto(assets[0].uri); // ✅ now TypeScript is happy
  }
}
};




const handleDone = () => {
  Alert.alert(
    'Info',
    `Phone: ${phone ? phone : 'Not entered'}\nPhoto selected: ${photo ? 'Yes' : 'No'}`
  );
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ImageBackground
      source={require('@/assets/images/CreateAccount.png')}
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
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
});
