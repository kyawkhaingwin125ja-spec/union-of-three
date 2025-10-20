
import ScreenWrapper from '@/components/ScreenWrapper'
import React from 'react'
import { Image, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

const NewPass = () => {
  return (
    <ScreenWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
        style={{flex:1}}
        source={require('@/assets/images/passrecovery.png')}
        resizeMode='cover'
        >
            <Image source={require("@/assets/images/image.png")}
            style={{ alignSelf: "center", marginTop: "38%" }}/>
            <Text style={{textAlign: "center", marginTop: "3%", fontWeight: "bold", fontSize: 19,fontFamily:'NunitoSans_400Regular'}}>Setup New Password</Text>
            <Text style={{textAlign: "center", marginTop: "3%", fontSize: 19,fontFamily:'NunitoSans_400Regular'}}>Please, setup a new password for</Text>
            <Text style={{textAlign: "center", marginTop: "2%", fontSize: 19,fontFamily:'NunitoSans_400Regular'}}> your account</Text>

            <TextInput placeholder='New Password' 
             placeholderTextColor="#b0ababff"
             
             style={styles.input1}></TextInput>
            <TextInput placeholder='Repeat Password'  
            placeholderTextColor="#b0ababff"
             style={styles.input2}></TextInput>
            
            <TouchableOpacity style={styles.btnSave}><Text style={{fontSize:19,color:'white'}}>Save</Text></TouchableOpacity>
           <TouchableOpacity>
                         <Text
                           style={{
                             color: "black",
                             textAlign: "center",
                             marginTop: "10%",
                           }}
                         >
                           Cancel
                         </Text>
                       </TouchableOpacity>
        </ImageBackground>
        </TouchableWithoutFeedback>
    </ScreenWrapper>
  )
}

export default NewPass

const styles = StyleSheet.create({
    input1: {
    marginTop:'3%',
    alignSelf:'center',
    width:335,
    height: 50,
    backgroundColor:"#ede6e6ff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
  },
  input2: {
    marginTop:'2.5%',
    alignSelf:'center',
    width:335,
    height: 50,
    backgroundColor:"#ede6e6ff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
  },
  btnSave:{
    height: 50,
    width: "80%",
    backgroundColor: "#004CFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "45%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});