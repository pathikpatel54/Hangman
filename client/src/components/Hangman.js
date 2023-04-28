import {
  Button,
  Center,
  Divider,
  Grid,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import Figure from "./Figure";
import { useEffect, useState } from "react";
import Word from "./Word";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const [playable, setPlayable] = useState(true);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [won, setWon] = useState(false);

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

  const resetGame = () => {
    close();
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
    setWon(false);
  };

  useEffect(() => {
    if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
      setWon(true);
      open();
    } else if (
      checkWin(correctLetters, wrongLetters, selectedWord) === "lose"
    ) {
      setWon(false);
      open();
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

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <Grid>
      <Grid.Col span={5}>
        <Figure wrongLetters={wrongLetters} />
      </Grid.Col>

      <Divider span="auto" size="md" orientation="vertical" />
      <Grid.Col span={6}>
        <Modal
          opened={opened}
          onClose={resetGame}
          title={won ? "Congratilations 😃" : "Unfortunately you lost 😌"}
          withCloseButton={false}
        >
          <Center mt={10}>
            <Button onClick={resetGame}>Play Again</Button>
          </Center>
        </Modal>
        <Center>
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </Center>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Center>
          <Text size={"lg"}>Wrong Letters: </Text>
        </Center>
        <Center>
          <Text size={"lg"}>{wrongLetters}</Text>
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default Hangman;
