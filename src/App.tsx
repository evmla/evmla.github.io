import { Route, Routes, useParams } from "react-router-dom";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Grid,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import Index from "./routes/Index";
import FAQ from "./routes/FAQ";
import Bottom from "./components/Bottom";
import Top from "./components/Top";
import Dots from "./components/Dots";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const theme = useMantineTheme();
  const { slug } = useParams();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Righteous, sans-serif",
          colors: {
            left: [
              "#e0d8ff",
              "#00DBDE",
              "",
              "",
              "",
              "",
              "",
              "",
              "#111249",
              "#1d1a28",
            ],
            right: [
              "#e6fff6",
              "#FC00FF",
              "",
              "",
              "",
              "",
              "",
              "",
              "#3a0737",
              "#1a2823",
            ],
          },
          components: {
            TextInput: {
              styles: () => ({
                input: {
                  color: "#fff",
                  textAlign: "center",
                },
              }),
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          styles={{
            main: {
              background:
                colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={<></>}
          aside={<></>}
          footer={<Bottom />}
          header={<Top />}
        >
          <Dots />
          <Grid>
            <Grid.Col span="auto"></Grid.Col>
            <Grid.Col
              span={6}
              style={{
                marginTop: 100,
                zIndex: 1,
              }}
              xs={12}
              sm={10}
              md={8}
              lg={6}
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path=":slug" element={<Index />}>
                  <Route path=":amount" element={<Index />} />
                </Route>
                <Route path="*" element={<p>There's nothing here!</p>} />
              </Routes>
            </Grid.Col>
            <Grid.Col span="auto"></Grid.Col>
          </Grid>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
