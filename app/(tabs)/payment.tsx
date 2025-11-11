import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Pay() {
  const [shipping, setShipping] = useState("standard");
  const [baseTotal, setBaseTotal] = useState(999);
  const shippingCost = shipping === "express" ? 25 : 10;
  const finalTotal = baseTotal + shippingCost;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='gray' />

      <Text style={styles.title}>Choose Shipping Option</Text>

      {/* Standard Delivery */}
      <TouchableOpacity
        style={[styles.option, shipping === "standard" && styles.selectedOption]}
        onPress={() => setShipping("standard")}
      >
        <View style={styles.optionRow}>
          <Ionicons
            name={shipping === "standard" ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color={shipping === "standard" ? "#ff6600" : "#ccc"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.optionText}>Standard Delivery - $10 (5-7 days)</Text>
        </View>
      </TouchableOpacity>

      {/* Express Delivery */}
      <TouchableOpacity
        style={[styles.option, shipping === "express" && styles.selectedOption]}
        onPress={() => setShipping("express")}
      >
        <View style={styles.optionRow}>
          <Ionicons
            name={shipping === "express" ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color={shipping === "express" ? "#ff6600" : "#ccc"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.optionText}>Express Delivery - $25 (1-2 days)</Text>
        </View>
      </TouchableOpacity>

      {/* Total */}
      <Text style={styles.total}>Total: ${finalTotal}</Text>

      {/* Pay Now Button */}
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => alert(`Paid $${finalTotal}`)}
      >
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 40,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  selectedOption: {
    borderColor: "#ff6600",
    backgroundColor: "#fff5ee",
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
  },
  payBtn: {
    backgroundColor: "#ff6600",
    borderRadius: 10,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  payText: {
    color: "#fff",
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});
