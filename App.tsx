import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Config from "react-native-config";

const App = () => {
    console.log('Hello===',Config.ENVIRONMENT)
    const [buttonText,setButtonText]=useState('Submit')
  return (
    <SafeAreaView>
        <View style={{
        height:200,
        width:200,
        // backgroundColor:'red'
    }}>
      <Text>App {Config.ENVIRONMENT}</Text>
      <Pressable style={{
        height:50,
        width:'100%',
        borderWidth:1,
        borderColor:"black",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
      }}
      onPress={()=>{
        console.log("hello")
        setButtonText("Clicked")
      }}
      >
        <Text>{buttonText}</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
