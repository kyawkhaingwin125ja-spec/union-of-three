import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    quantity: 1,
    image: require("@/assets/images/phone1.jpg"),
  },
  {
    id: 2,
    name: "Car Model A",
    price: 45000,
    quantity: 1,
    image: require("@/assets/images/car1.jpg"),
  },
];

const Cart = () => {
  const router=useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: any;
  }
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
            <Ionicons name="remove" size={18} color="#333" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
            <Ionicons name="add" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
  
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
        <Ionicons name="trash" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor="gray" />
      <View style={styles.container}>
        <Text style={styles.header}>My Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
          }
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Total Section */}
        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${total.toLocaleString()}</Text>

            <TouchableOpacity style={styles.checkoutBtn} onPress={()=>{router.push("../payment")}}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    backgroundColor: "#f1f1f1",
    padding: 4,
    borderRadius: 5,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  removeBtn: {
    padding: 5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
    marginVertical: 4,
  },
  checkoutBtn: {
    backgroundColor: "#ff6600",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 8,
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 30,
  },
});

export default Cart;
