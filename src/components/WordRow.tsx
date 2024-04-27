import { StyleSheet, Text, View } from "react-native"

const WordSquare = ({
    index,
    guess,
    word,
    guessed,
  }: {
    index: number,
    guess: string,
    word: string,
    guessed: boolean,
  }) => {
    const letter = guess[index]?.toLowerCase()
    const wordLetter = word[index]
  
    const blockStyles: any[] = [styles.guessSquare]
    const textStyles: any[] = [styles.guessLetter]
  
    if (letter === wordLetter && guessed) {
      blockStyles.push(styles.guessCorrect)
      textStyles.push(styles.guessedLetter)
    } else if (word.includes(letter) && guessed) {
      blockStyles.push(styles.guessInWord)
      textStyles.push(styles.guessedLetter)
    } else if (guessed) {
      blockStyles.push(styles.guessNotInWord)
      textStyles.push(styles.guessedLetter)
    }
  
    return (
      <View style={blockStyles}>
        <Text style={textStyles}>{letter?.toUpperCase()}</Text>
      </View>
    )
  }
  
 export const WordRow = ({
    guess,
    word,
    guessed,
  }: {
    guess: string,
    word: string,
    guessed: boolean,
  }) => {
    return (
      <View style={styles.guessRow}>
        <WordSquare index={0} guess={guess} word={word} guessed={guessed} />
        <WordSquare index={1} guess={guess} word={word} guessed={guessed} />
        <WordSquare index={2} guess={guess} word={word} guessed={guessed} />
        <WordSquare index={3} guess={guess} word={word} guessed={guessed} />
        <WordSquare index={4} guess={guess} word={word} guessed={guessed} />
      </View>
    )
  }


const styles = StyleSheet.create({
    guessRow: {
      flexDirection: "row",
      justifyContent: "center",
    },
    guessSquare: {
      borderColor: "#d3d6da",
      borderWidth: 2,
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
    },
    guessLetter: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#878a8c",
    },
    guessedLetter: {
      color: "#fff",
    },
    guessCorrect: {
      backgroundColor: "#6aaa64",
      borderColor: "#6aaa64",
    },
    guessInWord: {
      backgroundColor: "#c9b458",
      borderColor: "#c9b458",
    },
    guessNotInWord: {
      backgroundColor: "#787c7e",
      borderColor: "#787c7e",
    },

  })
  
  
  