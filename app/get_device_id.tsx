import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [statusText, setStatusText] = useState('Checking device...');

  // Generate or retrieve device UUID
  const getDeviceUUID = async () => {
    try {
      let id = await AsyncStorage.getItem('device_uuid');
      if (!id) {
        id = uuid.v4();
        await AsyncStorage.setItem('device_uuid', id);
      }
      return id;
    } catch (err) {
      Alert.alert('Error', 'Failed to get device UUID');
      return null;
    }
  };

  // Register for push notifications
  const registerForPushNotificationsAsync = async () => {
    let token = null;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Push notifications not granted!');
        return null;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert('Push notifications require a physical device.');
    }
    return token;
  };

  useEffect(() => {
    const loadDeviceInfo = async () => {
      const deviceUUID = await getDeviceUUID();
      const pushToken = await registerForPushNotificationsAsync();

      // Safely get app version for new Expo SDK
      const appVersion =
        Constants.expoConfig?.version ??
        (Constants.manifest && Constants.manifest.version) ??
        '1.0.0';

      const info = {
        DeviceUUID: deviceUUID ?? 'N/A',
        DeviceType: Device.osName ?? 'Unknown',
        ModelName: Device.modelName ?? 'Unknown',
        OSVersion: Device.osVersion ?? 'Unknown',
        AppVersion: appVersion,
        PushToken: pushToken ?? 'N/A',
      };

      setDeviceInfo(info);

      // Determine old vs new device
      if (deviceUUID) {
        setStatusText('Old Device Detected ✅');
      } else {
        setStatusText('New Device Detected 🆕');
      }
    };

    loadDeviceInfo();
  }, []);

  const showDeviceInfo = () => {
    Alert.alert('Device Info', JSON.stringify(deviceInfo, null, 2));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📱 Device Info & Verification</Text>
      <Text style={styles.status}>{statusText}</Text>

      {Object.entries(deviceInfo).map(([key, value]) => (
        <View key={key} style={styles.item}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>{String(value)}</Text>
        </View>
      ))}

      <View style={styles.button}>
        <Button title="Show Device Info" onPress={showDeviceInfo} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1e293b',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0f172a',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
  },
});
