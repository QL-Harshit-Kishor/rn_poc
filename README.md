## Update Yarn 3 

1. yarn set version 3 
2. Verify yarn version with yarn -v
2. Update `.yarnrc.yml` file

```yaml
nodeLinker: node-modules
```


## Enable the New Architecture for Apps


### Enable New Architecture for iOS

#### For new apps created from React Native CLI

Navigate to the `ios` directory and run the following:

```shell
# from `ios` directory
bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

Then build and run the app as usual:

```shell
yarn ios
```

#### For existing apps

You'll need to reinstall your pods by running `pod install` with the right flag:

```shell
# Run pod install with the flag:
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```


#### Troubleshooting

##### Run `pod install` when a dependency with native code changes

You will need to run `pod install` each time a dependency with native code changes. Make this command easier to run by adding it to `scripts` to your project's `package.json` file:

```
  "scripts": {
    "pod-install": "cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install"
  }
```

and run it with `yarn pod-install`. Note that `bundle install` does not need to run a second time, as long as the Gemfile has not changed.


##### Use Xcode to rename files in the `ios` folder

Whenever you have to rename some files in the `ios` folder, please **use Xcode to rename them**. This ensure that the file references are updated in the Xcode project as well. You might need to clean the build folder (**Project** → **Clean Build Folder** or <kbd>Cmd ⌘</kbd> + <kbd>Shift ⇪</kbd> + <kbd>K</kbd>) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

##### `react-native run-ios` fails

If you see a build failure from `react-native run-ios`, there may be cached files from a previous build with the old architecture. Clean the build cache and try again:

1. Open the project `ios/project.xcworkspace` in Xcode
2. In XCode, choose Product > Clean Build Folder
3. In the project directory, remove the `ios/Podfile.lock` file and `ios/Pods` directory: `rm -rf ios/Podfile.lock ios/Pods`
4. Re-run `yarn pod-install` and `yarn ios`


### Enable the New Architecture on Android

> [!NOTE]
> You may notice longer build times with the New Architecture due to additional step of C++ compilation with the Android NDK. To improve your build time, see [Speeding Up Your Build Phase](https://reactnative.dev/docs/build-speed).

#### For new apps created from React Native CLI

Set the `newArchEnabled` property to `true` by **either**:

- Changing the corresponding line in `android/gradle.properties`
- Setting the environment variable `ORG_GRADLE_PROJECT_newArchEnabled=true`

Then build and run the app as usual:

```shell
yarn android
```

#### For existing apps

You will only need to update your `android/gradle.properties` file as follows:

```diff
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=false
+newArchEnabled=true
```

### Verify the New Architecture is in Use

After you build and run the app when Metro serves the JavaScript bundle, you should see `"fabric": true` in the Metro logs.
