import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, MantineProvider } from "@mantine/core";
import Hangman from "./components/Hangman";
import HeaderResponsive from "./components/Header";
import { Notifications } from "@mantine/notifications";
import Home from "./components/Home";
import Generate from "./components/Generate";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        breakpoints: {
          xs: "30em",
          sm: "48em",
          md: "64em",
          lg: "74em",
          xl: "90em",
        },
      }}
    >
      <Notifications position="bottom-center" />
      <Container>
        <BrowserRouter>
          <HeaderResponsive />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/hangman/:id" element={<Hangman />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MantineProvider>
  );
}

export default App;
