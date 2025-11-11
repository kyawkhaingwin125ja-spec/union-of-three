import ScreenWrapper from '@/components/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ShippingAddressForm() {
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const STORAGE_KEY = 'shipping_address_v1';

  useEffect(() => {
    // Optionally auto-load saved address on mount
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Only set fields that exist in parsed object
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.street) setStreet(parsed.street);
          if (parsed.apartment) setApartment(parsed.apartment);
          if (parsed.city) setCity(parsed.city);
          if (parsed.stateProvince) setStateProvince(parsed.stateProvince);
          if (parsed.postalCode) setPostalCode(parsed.postalCode);
          if (parsed.country) setCountry(parsed.country);
          if (parsed.phone) setPhone(parsed.phone);
        }
      } catch (err) {
        console.error('Load address error', err);
      }
    })();
  }, []);

  const validate = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Please enter your full name.');
      return false;
    }
    if (!street.trim()) {
      Alert.alert('Validation', 'Please enter street address.');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Validation', 'Please enter city.');
      return false;
    }
    if (!postalCode.trim()) {
      Alert.alert('Validation', 'Please enter postal / ZIP code.');
      return false;
    }
    if (!country.trim()) {
      Alert.alert('Validation', 'Please enter country.');
      return false;
    }
    return true;
  };

  const saveAddress = async () => {
    if (!validate()) return;
    const payload = {
      fullName: fullName.trim(),
      street: street.trim(),
      apartment: apartment.trim(),
      city: city.trim(),
      stateProvince: stateProvince.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
      phone: phone.trim(),
    };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      Alert.alert('Success', 'Shipping address saved.');
    } catch (err) {
      console.error('Save error', err);
      Alert.alert('Error', 'Could not save address.');
    }
  };

  const loadAddress = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (!saved) {
        Alert.alert('Info', 'No saved address found.');
        return;
      }
      const parsed = JSON.parse(saved);
      setFullName(parsed.fullName ?? '');
      setStreet(parsed.street ?? '');
      setApartment(parsed.apartment ?? '');
      setCity(parsed.city ?? '');
      setStateProvince(parsed.stateProvince ?? '');
      setPostalCode(parsed.postalCode ?? '');
      setCountry(parsed.country ?? '');
      setPhone(parsed.phone ?? '');
      Alert.alert('Loaded', 'Saved address loaded into form.');
    } catch (err) {
      console.error('Load error', err);
      Alert.alert('Error', 'Could not load address.');
    }
  };

  const clearAddress = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setFullName('');
      setStreet('');
      setApartment('');
      setCity('');
      setStateProvince('');
      setPostalCode('');
      setCountry('');
      setPhone('');
      Alert.alert('Cleared', 'Saved address removed and form cleared.');
    } catch (err) {
      console.error('Clear error', err);
      Alert.alert('Error', 'Could not clear address.');
    }
  };

  const showPreview = () => {
    const preview = `
${fullName || '(Full name)'}
${street || '(Street)'} ${apartment ? `, ${apartment}` : ''}
${city || '(City)'} ${stateProvince ? `, ${stateProvince}` : ''}
${postalCode || '(Postal)'} - ${country || '(Country)'}
Phone: ${phone || '(Phone)'}
`.trim();
    Alert.alert('Shipping Address Preview', preview);
  };

  return (
    <ScreenWrapper>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
        
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
     
        <Text style={styles.title}>📦 Shipping Address</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Full name" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Street Address</Text>
        <TextInput style={styles.input} placeholder="123 Main St" value={street} onChangeText={setStreet} />

        

        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />




        <Text style={styles.label}>Country</Text>
        <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="+1 555 123 4567" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="💾 Save" onPress={saveAddress} />
          </View>
          <View style={styles.button}>
            <Button title="📥 Load" onPress={loadAddress} />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="👁 Preview" onPress={showPreview} />
          </View>
          <View style={styles.button}>
            <Button title="🗑 Clear" color="#d9534f" onPress={clearAddress} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827',
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: '#374151',
    fontSize: 13,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});
