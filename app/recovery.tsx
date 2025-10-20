import ScreenWrapper from '@/components/ScreenWrapper'
import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const Recovery = () => {
  return (
    <ScreenWrapper>
        <ImageBackground style={styles.background}
        resizeMode='cover'
        source={require("@/assets/images/passrecovery.png")}>
    <View>
      <Text>recovery</Text>
    </View>
    </ImageBackground>
    </ScreenWrapper>
  )
}

export default Recovery

const styles = StyleSheet.create({
    background:{

    }
})