import { Center, Grid } from "@mantine/core";
import Figure from "./Figure";
import { useEffect, useState } from "react";
import Word from "./Word";
import { notifications } from "@mantine/notifications";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const [playable, setPlayable] = useState(true);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);

  const checkWin = (correct, wrong, word) => {
    let status = "win";

    // Check for win
    word.split("").forEach((letter) => {
      if (!correct.includes(letter)) {
        status = "";
      }
    });

    // Check for lose
    if (wrong.length === 6) status = "lose";

    return status;
  };

  useEffect(() => {
    if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
      console.log("Won");
    } else if (
      checkWin(correctLetters, wrongLetters, selectedWord) === "lose"
    ) {
      console.log("Lose");
    }

    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            notifications.clean();
            notifications.show({
              message: "You have already entered this letter!",
              withBorder: true,
            });
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            notifications.clean();
            notifications.show({
              message: "You have already entered this letter!",
              withBorder: true,
            });
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  return (
    <Grid>
      <Grid.Col span={6}>
        <Figure wrongLetters={wrongLetters} />
      </Grid.Col>

      <Grid.Col span={6}>
        <Center>
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default Hangman;
