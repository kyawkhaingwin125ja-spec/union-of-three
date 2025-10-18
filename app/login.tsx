import ScreenWrapper from '@/components/ScreenWrapper';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  return (
    <ScreenWrapper bg={"black"}>
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('@/assets/images/login.png')} 
    >
        <View style={{marginRight:215, marginTop:280}}>
            <Text style={{fontSize:30,fontWeight:'bold'}}>Login</Text>
           <Text>Good to see you back!♥</Text>
            </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input} 
          
          placeholder="Phone Number"
          placeholderTextColor="#D2D2D2"
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Next</Text></TouchableOpacity>
      <TouchableOpacity style={{marginTop:20}}><Text style={{color:'black' ,textDecorationLine:'underline'}}>Cancel</Text></TouchableOpacity>
    </ImageBackground>
    
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20, 
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  btn: {
    height: 50,
    width: '100%',
    backgroundColor: '#007AFF', // Blue color for a modern look
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
},
btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
},
});
