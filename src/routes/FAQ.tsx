import { useState } from "react";
import {
  useMantineTheme,
  Paper,
  Group,
  Button,
  Box,
  Accordion,
  createStyles,
} from "@mantine/core";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    border: "1px solid transparent",
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

export default function Index() {
  const theme = useMantineTheme();
  const { slug } = useParams();
  const [action, setAction] = useState(slug && "send");
  const { classes } = useStyles();

  return (
    <Paper
      radius="md"
      p="md"
      shadow="md"
      withBorder
      style={{
        background:
          theme.colorScheme === "dark"
            ? theme.fn.linearGradient(
                45,
                theme.colors.left[9],
                theme.colors.right[9]
              )
            : theme.fn.linearGradient(
                45,
                theme.colors.left[0],
                theme.colors.right[0]
              ),
      }}
    >
      <Group style={{ marginBottom: 20 }}>
        <Button
          color="red"
          radius="xl"
          style={{ width: 15, height: 15, padding: 0 }}
        ></Button>
        <Button
          color="yellow"
          radius="xl"
          style={{ width: 15, height: 15, padding: 0 }}
        ></Button>
        <Button
          color="green"
          radius="xl"
          style={{ width: 15, height: 15, padding: 0 }}
        ></Button>
      </Group>
      <Box>
        <Accordion
          mx="auto"
          variant="filled"
          defaultValue="Soulbound"
          classNames={classes}
          className={classes.root}
        >
          <Accordion.Item value="Soulbound">
            <Accordion.Control>What is Soulbound 👻 Token?</Accordion.Control>
            <Accordion.Panel>
              Proposed by Ethereum creator{" "}
              <Button
                component="a"
                target="_blank"
                compact
                variant="subtle"
                color="indigo"
                href="https://vitalik.eth.limo/general/2022/01/26/soulbound.html"
              >
                Vitalik Buterin
              </Button>
              , Soulbound 👻 tokens are non-transferable, non-funded tokens for
              a decentralized society.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Mint">
            <Accordion.Control>
              How to mint a second Soulbound 👻 token?
            </Accordion.Control>
            <Accordion.Panel>
              One address can only have one Soulbound token. If you want to
              issue a second Soulbound token, you need to change the address.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Total">
            <Accordion.Control>
              How many Soulbound 👻 tokens will be minted in total?
            </Accordion.Control>
            <Accordion.Panel>
              About 1411 Soulbound 👻 tokens consisting of one emoji will be
              minted. New emoji appear every year, so the total number will be
              increased.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </Paper>
  );
}
