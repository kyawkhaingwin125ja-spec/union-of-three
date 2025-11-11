import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  { id: "1", name: "Phones", image: require("@/assets/images/phone1.jpg") },
  { id: "2", name: "Cars", image: require("@/assets/images/car1.jpg") },
  { id: "3", name: "Laptops", image: require("@/assets/images/phone2.jpg") },
  { id: "4", name: "Accessories", image: require("@/assets/images/phone1.jpg") },
  { id: "5", name: "Cameras", image: require("@/assets/images/car1.jpg") },
  { id: "6", name: "Home Appliances", image: require("@/assets/images/phone2.jpg") },
];

const Category = () => {

  // ✅ define function here, outside JSX
  const renderCategoryItem = ({ item }: { item: { id: string; name: string; image: any } }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor="gray" />
      <View style={styles.container}>
        <Text style={styles.header}>Categories</Text>

        <FlatList
          data={categories}
          numColumns={2}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  image: {
    width: width / 3,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
});

export default Category;
