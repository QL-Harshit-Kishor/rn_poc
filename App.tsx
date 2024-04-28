import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Config from "react-native-config";

const App = () => {
    console.log('Hello===',Config.ENVIRONMENT)
  return (
    <View style={{
        height:200,
        width:200,
        backgroundColor:'red'
    }}>
      <Text>App {Config.ENVIRONMENT}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
