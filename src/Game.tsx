import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Alert,
} from "react-native"
import { Keyboard } from "./components/Keyborad";
import {WordRow } from "./components/WordRow";
import words from '../english-words-small.json'

export interface IGuess {
  [key: number]: string;
}

const defaultGuess: IGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
}

export default function Game() {
  const [activeWord, setActiveWord] = React.useState(words[0])
  const [guessIndex, setGuessIndex] = React.useState(0)
  const [guesses, setGuesses] = React.useState<IGuess>(defaultGuess)
  const [gameComplete, setGameComplete] = React.useState(false)

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex]

    if (letter === "ENTER") {
      if (guess.length !== 5) {
        Alert.alert("Word too short.")
        return
      }

      if (!words.includes(guess.toLowerCase())) {
        Alert.alert("Not a valid word.")
        return
      }

      if (guess.toLowerCase() === activeWord) {
        setGuessIndex(guessIndex + 1)
        setGameComplete(true)
        Alert.alert("You win!")
        return
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1)
      } else {
        setGuessIndex(guessIndex + 1)
        setGameComplete(true)
        Alert.alert("You lose!")
        return
      }
    }

    if (letter === "⌫") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) })
      return
    }

    // don't add if guess is full
    if (guess.length >= 5) {
      return
    }

    setGuesses({ ...guesses, [guessIndex]: guess + letter })
  }

  // Function to pick a random word of length 5 from the array
const getRandomWordOfLength5 = () => {
    // Filter words with length 5
    const wordsOfLength5 = words.filter(word => word.length === 5);
    
    // If there are words with length 5, pick a random one
    if (wordsOfLength5.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordsOfLength5.length);
      return wordsOfLength5[randomIndex];
    } else {
      return "No word with length 5 found";
    }
  };
  React.useEffect(() => {
    if (!gameComplete) {
      setActiveWord(getRandomWordOfLength5())
      setGuesses(defaultGuess)
      setGuessIndex(0)
    }
  }, [gameComplete])

  console.log('active word===',activeWord)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <WordRow
          guess={guesses[0]}
          word={activeWord}
          guessed={guessIndex > 0}
        />
        <WordRow
          guess={guesses[1]}
          word={activeWord}
          guessed={guessIndex > 1}
        />
        <WordRow
          guess={guesses[2]}
          word={activeWord}
          guessed={guessIndex > 2}
        />
        <WordRow
          guess={guesses[3]}
          word={activeWord}
          guessed={guessIndex > 3}
        />
        <WordRow
          guess={guesses[4]}
          word={activeWord}
          guessed={guessIndex > 4}
        />
        <WordRow
          guess={guesses[5]}
          word={activeWord}
          guessed={guessIndex > 5}
        />
      </View>
      <View>
        {gameComplete ? (
          <View style={styles.gameCompleteWrapper}>
            <Text>
              <Text style={styles.bold}>Correct Word:</Text> {activeWord}
            </Text>
            <View>
              <Button
                title="Reset"
                onPress={() => {
                  setGameComplete(false)
                }}
              />
            </View>
          </View>
        ) : null}
        <Keyboard onKeyPress={gameComplete?()=>{}:handleKeyPress} activeWord={activeWord} guesses={guesses} guessIndex={guessIndex} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  // Game complete
  gameCompleteWrapper: {
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
})




