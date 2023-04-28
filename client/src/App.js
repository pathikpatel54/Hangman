import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, MantineProvider } from "@mantine/core";
import Hangman from "./components/Hangman";
import HeaderResponsive from "./components/Header";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          // Add your color
          deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
          // or replace default theme color
          blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
        },

        shadows: {
          md: "1px 1px 3px rgba(0, 0, 0, .25)",
          xl: "5px 5px 3px rgba(0, 0, 0, .25)",
        },

        headings: {
          fontFamily: "Roboto, sans-serif",
          sizes: {
            h1: { fontSize: "2rem" },
          },
        },
      }}
    >
      <Notifications position="bottom-center" />
      <Container>
        <BrowserRouter>
          <HeaderResponsive />
          <Routes>
            <Route path="/hangman" element={<Hangman />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MantineProvider>
  );
}

export default App;
