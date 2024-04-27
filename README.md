1. yarn add react-native-config

2. // Add this in android/app/build.gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
