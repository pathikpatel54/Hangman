import {
  Button,
  Center,
  Container,
  Modal,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import Figure from "./Figure";
import { useEffect, useState } from "react";
import Word from "./Word";
import { notifications } from "@mantine/notifications";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendScore } from "../features/score/scoresSlice";
import axios from "axios";

const Hangman = () => {
  const [playable, setPlayable] = useState(false);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [won, setWon] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallScreen = useMediaQuery("(max-width: 36rem)");
  const dispatch = useDispatch();
  const params = useParams();

  const mapButtons = letters.split("").map((el, i) => (
    <Button
      key={i}
      onClick={() => {
        handleKeydown({ key: el, keyCode: el.charCodeAt(0) });
      }}
      m={12}
      w={60}
      size={"sm"}
    >
      {el}
    </Button>
  ));

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

  const playAgain = async () => {
    resetGame(false);
  };

  const resetGame = async (bool) => {
    close();
    let randomWord = "";
    if (bool) {
      console.log(params.id);
      randomWord = await axios.get(`/api/words/${params.id}`);
    } else {
      randomWord = await axios.get("/api/words");
    }
    setSelectedWord(randomWord.data.value);
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    setWon(false);
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name == null && !params.id) {
      navigate(`/`);
    } else if (name == null && params.id) {
      navigate(`/home/${params.id}`);
    } else {
      setUserName(name);
    }
    if (params.id) {
      resetGame(true);
    } else {
      resetGame(false);
    }
  }, []);

  useEffect(() => {
    if (
      checkWin(correctLetters, wrongLetters, selectedWord) === "win" &&
      selectedWord != ""
    ) {
      setWon(true);
      open();
      if (playable) {
        dispatch(sendScore({ name: userName, result: "win" }));
      }
      setPlayable(false);
    } else if (
      checkWin(correctLetters, wrongLetters, selectedWord) === "lose" &&
      selectedWord != ""
    ) {
      setWon(false);
      open();
      if (playable) {
        dispatch(sendScore({ name: userName, result: "loss" }));
      }
      setPlayable(false);
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  return (
    <>
      <Text mb={40} ta={"center"}>
        Guess the missing letters of a word to complete it before the hangman is
        fully drawn.
      </Text>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: "62rem", cols: 2, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <div
          style={
            smallScreen
              ? {
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  paddingBottom: "50px",
                }
              : { borderRight: "solid 1px", textAlign: "center" }
          }
        >
          <Figure wrongLetters={wrongLetters} />
        </div>

        <div style={{ textAlign: "center" }}>
          <Modal
            size="sm"
            opened={opened}
            onClose={playAgain}
            centered
            title={
              won ? (
                <Text fw={700} fz="lg">
                  Congratilations You have won 😃
                </Text>
              ) : (
                <Text fw={700} fz="lg">
                  You have lost this game 😟
                </Text>
              )
            }
            withCloseButton={false}
          >
            <Space h="md" />
            <Text>Correct word was: {selectedWord}</Text>
            <Space h="xl" />
            <Center mt={10}>
              <Button onClick={playAgain}>Play Again?</Button>
            </Center>
          </Modal>
          <Space h="xl" />
          <Center>
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          </Center>
          <Space h="xl" />
          <Space h="xl" />
          <Space h="xl" />
          <Center>
            <Text size={"lg"}>Wrong Letters: </Text>
          </Center>
          <Center>
            <Text size={"lg"}>{wrongLetters}</Text>
          </Center>
        </div>
      </SimpleGrid>
      <Container mt={80} maw={800} style={{ textAlign: "center" }}>
        {mapButtons}
      </Container>
    </>
  );
};

export default Hangman;
