import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, MantineProvider } from "@mantine/core";
import Hangman from "./components/Hangman";
import HeaderResponsive from "./components/Header";
import { Notifications } from "@mantine/notifications";
import Home from "./components/Home";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <Notifications position="bottom-center" />
      <Container>
        <BrowserRouter>
          <HeaderResponsive />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hangman" element={<Hangman />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MantineProvider>
  );
}

export default App;
