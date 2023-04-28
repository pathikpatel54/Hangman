import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  TextInput,
  Space,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles1 = createStyles((theme) => ({
  root: {
    position: "relative",
    width: "100",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function HeroText() {
  const { classes } = useStyles();
  const { classes: classes1 } = useStyles1();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onPlayClick = () => {
    if (name == "") {
      setError(true);
    } else {
      localStorage.setItem("name", name);
      navigate("/hangman");
    }
  };

  const onGenerateClick = () => {
    if (name == "") {
      setError(true);
    } else {
      localStorage.setItem("name", name);
      navigate("/generate");
    }
  };

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to{" "}
          <Text component="span" className={classes.highlight} inherit>
            The Hangman
          </Text>{" "}
        </Title>
        <Space h="xl" />
        <Container p={0} size={500}>
          <TextInput
            label="Please enter your name"
            placeholder="Your Name"
            classNames={classes1}
            onChange={(e) => {
              setError(false);
              return setName(e.target.value);
            }}
            value={name}
            error={error ? "Name is required" : ""}
          />
        </Container>
        <Space h="xl" />
        <div className={classes.controls}>
          <Button className={classes.control} size="lg" onClick={onPlayClick}>
            Play Now{" "}
          </Button>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            onClick={onGenerateClick}
          >
            Generate Custom Game
          </Button>
        </div>
      </div>
    </Container>
  );
}
