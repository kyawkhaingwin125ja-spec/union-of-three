import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabsLayout(){
  return(
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen
        name="index"
         options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}/>
        <Tabs.Screen
        name="category"
         options={{
          tabBarLabel: "Category",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={28}
              color={color}
            />
          ),
        }}/>
        <Tabs.Screen
        name="cart"
         options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={28}
              color={color}
            />
          ),
        }}/>
        <Tabs.Screen
        name="profile"
         options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={color}
            />
          ),
        }}/>
    </Tabs>

    
    )
}