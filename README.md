### 1. For Readme.md Editor
https://pandao.github.io/editor.md/en.html

### 2. Initiate project
Create project and folder structure then update package.json file with necessory  scripts

### 3. Multiple Environment and flavors in React native
Ref -
1. https://medium.com/@varunkukade999/simplified-react-native-environments-android-ios-2024-a6c9ad013d36 
2. https://dev.to/leon_arantes/react-native-multiple-environments-setup-schemaflavors-3l7p
3. https://github.com/luggit/react-native-config#extra-step-for-android
4. https://www.youtube.com/watch?v=TvBm7UZNyy8&ab_channel=SobanSpeaks 


    yarn add react-native-config
	
Create  3 files on root of project and put then in gitignore->
- .env
- .env.dev
- .env.prod

**TypeScript declaration for your .env file ->**

If you want to get autocompletion and typesafety for your .env files. Create a file named **react-native-config.d.ts** in the same directory where you put your type declarations, and add the following contents:
```javascript
declare module 'react-native-config' {
    export interface NativeConfig {
        // default
        APPLICATION_ID?: string;
        BUILD_TYPE?: string;
        DEBUG?: boolean;
        FLAVOR?: string;
        IS_HERMES_ENABLED?: boolean;
        IS_NEW_ARCHITECTURE_ENABLED?: boolean;
        VERSION_CODE?: number
        VERSION_NAME?: string

        // From env
        API_URL?: string;
        ENVIRONMENT?: string;
    }

    export const Config: NativeConfig
    export default Config
}
```


**Android Setup ->**

Add these code lines to **android/app/build.gradle** to apply plugin

```java
    // For react native dotenv
    project.ext.envConfigFiles = [
       prod: ".env.prod",
       dev: ".env.dev"
    ]
    apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle" 
    
```

Adding Product Flavor inside android section after buildTypes.
```java
 android {    
        // add this block
        flavorDimensions "default"
        productFlavors {
            prod {

            }
            dev {
                applicationIdSuffix ".dev"
            }
        }
       // ---
    ..................
```
	
Also add matchingFallbacks in buildTypes as shown below:

```java
      buildTypes {
            debug {
                signingConfig signingConfigs.debug
                matchingFallbacks = ['debug', 'release'] // <- add this line
            }
        -----
```
```java
defaultConfig {
    ...
    resValue "string", "build_config_package", "YOUR_PACKAGE_NAME_IN_ANDROIDMANIFEST_XML"  // <- add this line
    setProperty("archivesBaseName", "App_Name_" + versionName +"($versionCode)" ) // For changing archive name

}
```
**Android Change App name and App Icon->**

- Just Duplicate the **android/app/main** folder and rename it dev and remove all folders just keep folder contains string.xml.
- To change the app icons, just add it inside the specific mipmap of the build dev or main(prod).

- To change app name, open file and rename-
android/app/src/main/res/values/strings.xml
android/app/src/dev/res/values/strings.xml
android/app/src/stg/res/values/strings.xml


**Update scripts in  package.json ->**

```javascript
    "android:dev": "react-native run-android --mode=devdebug --appIdSuffix 'dev'",
    "android:dev:release": "react-native run-android --mode=devrelease --appIdSuffix 'dev'",
    "android:dev:apk": "cd android && ./gradlew assembleDevRelease && cd ..",
    "android:dev:aab": "cd android && ./gradlew bundleDevRelease && cd ..",
    "android:prod": "react-native run-android --mode=proddebug",
    "android:prod:release": "react-native run-android --mode=prodrelease",
    "android:prod:apk": "cd android && ./gradlew assembleProdRelease && cd ..",
    "android:prod:aab": "cd android && ./gradlew bundleProdRelease && cd ..",
```

**IOS Setup ->**
###### 1st Way
  -  Update pod file and add these lines of code

```swift
pod 'react-native-config', :path => '../node_modules/react-native-config'
# For extensions without React dependencies
pod 'react-native-config/Extension', :path => '../node_modules/react-native-config'
  
#Replace myProject with your project name
project 'myProject',
'Debug' => :debug,
'Release' => :release,
'Dev.Debug' => :debug,
'Dev.Release' => :release,
'Stg.Debug' => :debug,
'Stg.Release' => :release
...
...
flipper_config = ENV['NO_FLIPPER'] == "1" ? FlipperConfiguration.disabled : FlipperConfiguration.enabled(['Debug', 'Dev.Debug','Stg.Debug','Release','Dev.Release','Stg.Release'],{'Flipper' => '0.182.0'}) 

```
- Then create new configuration here with the same name inside pod file mentioned -
Project->Info->Cofigurations- Duplicate Debug/Release configurations
- Then change display name from here - 
Target-> Build Settings-> Packaging-> Product Name and Product Bundle Identifier

- Then Update info.plist as->

```swift
<key>CFBundleDisplayName</key>
<string>$(PRODUCT_NAME)</string>
```
- Then, In Xcode, select Product>Scheme>New Scheme. Select the project in dropdown and enter scheme name. And click ok to create the same. Make sure shared option is checked.
- In Xcode, select Product>Scheme>Edit Scheme.
- Create 2 Pre-actions inside Build and Run. To create env file inside ios folder and use the same. Select project in provide build settings drop down.Add below scripts and close.

```swift
# Type a script or drag a script file from your workspace to insert its path.
cp "${PROJECT_DIR}/../.env.staging" "${PROJECT_DIR}/../.env"
echo ".env.staging" > /tmp/envfile
touch "${PROJECT_DIR}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildDotenvConfig.rb"

```

**Update scripts in  package.json ->**

```javascript
    "ios:dev": "react-native run-ios --mode=Dev.Debug --scheme \"myProject(Dev)\"",
    "ios:stg": "react-native run-ios --mode=Stg.Debug --scheme \"myProject(Stg)\"",
    "ios:prod": "react-native run-ios --mode=Debug --scheme \"myProject\"",
```

###### 2nd Way-

  -  Update pod file and add these lines of code

```swift
pod 'react-native-config/Extension', :path => '../node_modules/react-native-config'
```
Now open XCode and select the main project from the left sidebar. You would see targets. Now duplicate the target.
Name these new targets as

> reactnativeproject-dev
reactnativeproject-stg

Now as you create new targets, new info.plist files would be created automatically for each target. Rename them as follows: select target and click again after a while to rename.

> reactnativeprojectDev-Info.plist
reactnativeprojectStg-Info.plist

Now follow the following steps for each target.

- Then change values here - 
> Target-> Build Settings-> Packaging-> 
**Info.plist file**, - rename the file again with the above-mentioned names.
**Product Name** - Rename product name you want
**Product Bundle Identifier** - Rename bundle id you want

- Then Update all info.plist as->

```swift
<key>CFBundleDisplayName</key>
<string>$(PRODUCT_NAME)</string>
```
Now let's create new schemes. In case, 3 new schemes are already created skip creating new schemes. (If already created rename then).You can rename them from the“Manage Schemes”section.
- In Xcode, select Product>Scheme>New Scheme. Select the project in dropdown and enter scheme name. And click ok to create the same. Make sure shared option is checked.
- In Xcode, select Product>Scheme>Edit Scheme.
- Create 2 Pre-actions inside Build and Run. Also don't forget to select“Provide build settings from”and select the appropriate item from the dropdown.

```swift
# Type a script or drag a script file from your workspace to insert its path.
rm "${CONFIGURATION_BUILD_DIR}/${INFOPLIST_PATH}"
echo ".env.dev" > /tmp/envfile

```
**App Icon**
Now to have different app icons for each target, first go to ios -> project_name -> images.xcassets file. Here you will see AppIcon.appiconset folder which would hold all the images like app icons, iPhone notification, etc.

Now create new folders named DevAppIcon.appiconset and StageAppIcon.appIconset.
Now copy the contents.json file from AppIcon.appiconset to these 2 new folders. The contents.json file holds the structure and format of icon set that we want.

Now copy all the icons you want to these newly created folders. Now we have 3 icon sets. Let’s attach it to respective target.

Follow this for dev and stage target -> Select the target name, go to general find a section for the APP icon. Now here in “App Icon” input field, add the file name of icon set. In case of dev target it would be DevAppIcon and for stage it would be StageAppIcon.


**Update scripts in  package.json ->**

```javascript
    "ios:dev": "react-native run-ios --mode=Dev.Debug --scheme \"myProject(Dev)\"",
    "ios:stg": "react-native run-ios --mode=Stg.Debug --scheme \"myProject(Stg)\"",
    "ios:prod": "react-native run-ios --mode=Debug --scheme \"myProject\"",
```




### 4. Generating Signed APK

- Generating a signing key
You can generate a private signing key using keytool.

```javascript
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

// For SHA Key
keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android

```
This command prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called my-release-key.keystore. Replace 'my-release-key' with your key name and 'my-key-alias' with your key alias.
- Place the my-release-key.keystore file under the android/app directory in your project folder

- Inside gradle.properties add these lines-
```java
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

- Edit the file android/app/build.gradle in your project folder and add the signing config,
```java
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```
