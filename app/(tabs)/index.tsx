import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("@/assets/images/car1.jpg"),
  require("@/assets/images/phone2.jpg"),
  require("@/assets/images/phone1.jpg"),
  require("@/assets/images/phone2.jpg"),
  require("@/assets/images/phone1.jpg"),
];

const goods = [
  { id: 1, name: "iPhone 15", price: "$999", image: require("@/assets/images/phone1.jpg") },
  { id: 2, name: "Car Model A", price: "$45,000", image: require("@/assets/images/car1.jpg") },
  { id: 3, name: "Samsung Galaxy", price: "$899", image: require("@/assets/images/phone2.jpg") },
  { id: 4, name: "Electric Scooter", price: "$499", image: require("@/assets/images/car1.jpg") },
  { id: 5, name: "Headphones", price: "$149", image: require("@/assets/images/phone1.jpg") },
  { id: 6, name: "Gaming Laptop", price: "$1,499", image: require("@/assets/images/phone2.jpg") },
  { id: 7, name: "Smartwatch", price: "$199", image: require("@/assets/images/phone1.jpg") },
  { id: 8, name: "Wireless Mouse", price: "$29", image: require("@/assets/images/phone2.jpg") },
  { id: 9, name: "DSLR Camera", price: "$799", image: require("@/assets/images/car1.jpg") },
  { id: 10, name: "Power Bank", price: "$49", image: require("@/assets/images/phone1.jpg") },
  { id: 11, name: "Smart Speaker", price: "$99", image: require("@/assets/images/phone2.jpg") },
  { id: 12, name: "Bluetooth Keyboard", price: "$59", image: require("@/assets/images/phone1.jpg") },
  { id: 13, name: "Drone", price: "$699", image: require("@/assets/images/car1.jpg") },
  { id: 14, name: "VR Headset", price: "$399", image: require("@/assets/images/phone2.jpg") },
];

const SLIDE_INTERVAL = 5000; // 5 seconds

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto image slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Product card
  interface GoodsItem {
    id: number;
    name: string;
    price: string;
    image: any;
  }
  
  const renderGoodsItem = ({ item }: { item: GoodsItem }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.goodsImage} resizeMode="contain" />
      <Text style={styles.goodsName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.divider} />
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
  


  return (
    <ScreenWrapper>
      <StatusBar backgroundColor="gray" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔹 Image Slider */}
        <View style={styles.sliderContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <Image source={item} style={styles.image} resizeMode="contain" />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        {/* 🔹 Goods Grid */}
        <View style={styles.goodsContainer}>
          <FlatList
            data={goods}
            numColumns={2}
            renderItem={renderGoodsItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false} // scrolls with parent ScrollView
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 180,
    marginTop: 10,
  },
  imageWrapper: {
    width: width,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  goodsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 12,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  goodsImage: {
    width: width / 2.5,
    height: 100,
  },
  goodsName: {
    fontSize: 14,
    marginTop: 6,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    width: "60%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 2,
  },
});

export default Index;
