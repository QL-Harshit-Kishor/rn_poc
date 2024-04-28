import LottieView from 'lottie-react-native';
import React, { Component, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type extractComponentPropsType<Type> = Type extends Component<infer X>
    ? X
    : null;

// See https://github.com/react-native-community/lottie-react-native/issues/426
type LottieProps = extractComponentPropsType<LottieView>;

// Because Lottie has a bug that stops animation when in background (ios)
// See https://github.com/react-native-community/lottie-react-native/issues/412
const Lottie: React.FC<LottieProps> = ({ ...rest }) => {

    const [appState, setAppState] = useState(AppState.currentState);

    const lottieRef = useRef<LottieView>(null);

    useEffect(() => {
        const appStateSubscription = AppState.addEventListener(
            'change',
            handleAppStateChange
        );
        return () => {
            appStateSubscription.remove();
        };
    });

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            if (lottieRef.current) {
                lottieRef.current.play();
            }
        }
        setAppState(nextAppState);
    };

    return <LottieView ref={lottieRef} {...rest} />;
};

export default Lottie;


/* 
<Lottie
    style={{
        height: 250,
        width: 200
    }}
    source={LottieConst.CONGRATS}
    loop
    autoPlay />
 */