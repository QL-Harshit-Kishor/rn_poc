declare module 'react-native-config' {
    export interface NativeConfig {
        // default for android
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