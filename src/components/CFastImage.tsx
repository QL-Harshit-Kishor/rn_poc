import React from "react";
import { StyleProp, StyleSheet } from "react-native";
import FastImage, { FastImageProps, ImageStyle } from "react-native-fast-image";
import { ImageConst } from "../assets";


interface CFastImageProps extends FastImageProps {
    source: FastImageProps['source'];
    style?: StyleProp<ImageStyle>;
    size?: number
    height?: number
    width?: number,
    loading?: boolean
    isAvatar?: boolean
}
const CFastImage = ({
    source,
    style,
    size=50,
    height,
    width,
    loading=false,
    isAvatar=false,
    ...rest
}: CFastImageProps) => {

    // Use loader or skeleton if loading true
    // if (loading) {
    //     return <Skeleton
    //         height={height ?? size}
    //         width={width ?? size}
    //         borderRadius={size ? size / 2 : 10}
    //     />
    // }


    return (
        <FastImage
            defaultSource={ImageConst.DEFAULT}
            source={source}
            style={
                StyleSheet.flatten([{
                    height: height ?? size,
                    width: width ?? size,
                    borderRadius: (size && isAvatar) ? size / 2 : 0,
                }, style
                ])
            }
            {...rest}
        />
    );
};

export default CFastImage;

{/* 

Use-

<CFastImage
source={{ uri: 'http://example.com/my_image.jpg' }}
size={150}
resizeMode={FastImage.resizeMode.cover}
/>

*/}