import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IGuess } from "../Game";
import { useEffect, useState } from "react";

const KeyboardRow = ({
    letters,
    activeWord,
    onKeyPress,
    guessIndex,
    guesses,
}: {
    letters: string[],
    activeWord: string,
    onKeyPress: (letter: string) => void,
    guessIndex: number,
    guesses: IGuess,
}) => {
    const [allLetters, setAllLetters] = useState('');
    useEffect(() => {
        const guessedLetters=Object.values(guesses).join('')
        setAllLetters(guessedLetters);
    }, [guessIndex]);

    const getLetterStyle = (letter: string) => {
        const isCorrectGuess = allLetters.includes(letter) && activeWord.toUpperCase().includes(letter);
        const isIncorrectGuess = allLetters.includes(letter) && !activeWord.toUpperCase().includes(letter);
        const defaultStyle = styles.keyLetter;
        if (isCorrectGuess) return [defaultStyle, styles.keyboardCorrectLetter];
        if (isIncorrectGuess) return [defaultStyle, styles.keyboardIncorrectLetter];
        return [defaultStyle];
    };

    return (
        <View style={styles.keyboardRow}>
            {letters.map(letter => (
                <TouchableOpacity onPress={() => onKeyPress(letter)} key={letter}>
                    <View style={styles.key}>
                        <Text style={getLetterStyle(letter)}>{letter}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export const Keyboard = ({ onKeyPress, activeWord, guesses, guessIndex }: { onKeyPress: (letter: string) => void, activeWord: string, guesses: IGuess, guessIndex: number }) => {
    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"]

    return (
        <View style={styles.keyboard}>
            <KeyboardRow
                letters={row1}
                activeWord={activeWord}
                guesses={guesses}
                onKeyPress={onKeyPress}
                guessIndex={guessIndex}
            />
            <KeyboardRow
                letters={row2}
                activeWord={activeWord}
                guesses={guesses}
                onKeyPress={onKeyPress}
                guessIndex={guessIndex}
            />
            <KeyboardRow
                letters={row3}
                activeWord={activeWord}
                guesses={guesses}
                onKeyPress={onKeyPress}
                guessIndex={guessIndex}
            />
            <View style={styles.keyboardRow}>
                <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
                    <View style={styles.key}>
                        <Text style={styles.keyLetter}>ENTER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    // keyboard
    keyboard: { flexDirection: "column" },
    keyboardRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    key: {
        backgroundColor: "#d3d6da",
        padding: 10,
        margin: 3,
        borderRadius: 5,
    },
    keyLetter: {
        fontWeight: "500",
        fontSize: 15,
    },
    keyboardCorrectLetter: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#6aaa64",
    },
    keyboardIncorrectLetter: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#c9b458",
    },

})
