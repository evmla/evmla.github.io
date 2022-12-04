import {
  IconLock,
  IconMoodBoy,
  IconLink,
  IconCurrencyDollar,
  IconGhost,
  IconX,
  IconSearch,
  IconBuildingStore,
  IconWallet,
  IconUserCheck,
} from "@tabler/icons";
import {
  Box,
  Button,
  CopyButton,
  createStyles,
  Divider,
  Drawer,
  Group,
  Input,
  List,
  Loader,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  useMantineTheme,
  MediaQuery,
  Notification,
} from "@mantine/core";
import { Flex } from "@mantine/core";

import data from "@emoji-mart/data";
Object.keys(data.emojis).forEach((key) => {
  // @ts-ignore
  if (data.emojis && data.emojis[key]) {
    // @ts-ignore
    const skins = data.emojis[key].skins || [];
    // @ts-ignore
    skins.forEach((skin, i) => {
      if (
        skin.unified.indexOf("fe0f") + 1 ||
        skin.unified.indexOf("200d") + 1
      ) {
        // @ts-ignore
        delete data.emojis[key];
      }
    });
  }
});

// @ts-ignore
import Picker from "@emoji-mart/react";
import { useEffect, useState } from "react";
import {
  Call,
  useCalls,
  useEtherBalance,
  useEthers,
  useGasPrice,
} from "@usedapp/core";
import {
  tokenByOwner as getMetadataByOwner,
  tokenByEmoji as getMetadataBySoul,
  write,
} from "../queries";
import { ethers } from "ethers";
import { Emoji } from "../interfaces";
import { Dot } from "./Dot";
import Connect from "./Connect";
import DefaultChain from "../utils/chains";
import { Link } from "react-router-dom";

const Mint = () => {
  const theme = useMantineTheme();
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  const [owner, setOwner] = useState<Emoji | undefined>();
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [exists, setExists] = useState(false);
  const [randomDeg, setRandomDeg] = useState(45);

  const [query, setQuery] = useState<Call[]>([]);
  const slugRaw: any = useCalls(query) ?? [];

  console.log("slugRaw", slugRaw);

  const { send: _register, state: _stateRegister } = write("mint");

  useEffect(() => {
    console.log("emoji", emoji);
    let q = [...getMetadataBySoul(emoji)];
    if (account) {
      console.log("account", account);
      q = [...q, ...getMetadataByOwner(account)];
    }
    setLoading(true);
    setStatus("Loading ...");
    if (account && chainId === DefaultChain.chainId) {
      setQuery(q);
    } else {
      if (!account) {
        setLoading(false);
        // setStatus("Please, CONNECT!");
      } else if (chainId !== DefaultChain.chainId) {
        setStatus("Please, SWITCH NETWORK!");
      }
    }
    setRandomDeg(Math.floor(Math.random() * (90 - 1 + 1)) + 1);
  }, [emoji, account, chainId]);

  useEffect(() => {
    if (
      _stateRegister.status === "PendingSignature" ||
      _stateRegister.status === "Mining"
    ) {
      return;
    } else {
      setLoading(false);
      setStatus("");
    }
    const slugExists = slugRaw?.[0]?.value?.[0]?.[0] ?? "";
    console.log("slugExists", slugExists);
    if (slugExists === ethers.constants.AddressZero) {
      setLoading(false);
      setExists(false);
    } else if (slugExists) {
      setLoading(false);
      setExists(true);
    }
    const [owner, emoji, name] = slugRaw?.[1]?.value?.[0] ?? [null, null, null];
    console.log("owner, emoji, name", owner, emoji, name);
    if (owner === ethers.constants.AddressZero) {
      setOwner(undefined);
    } else if (owner) {
      setEmoji(emoji);
      setOwner({ owner, emoji, name });
    }
  }, [slugRaw]);

  const useStyles = createStyles((theme) => ({
    title: {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontFamily: theme.fontFamily,
      fontSize: 44,
      lineHeight: 1.5,
      fontWeight: 900,
      margin: 10,
      textAlign: "center",

      [theme.fn.smallerThan("xs")]: {
        fontSize: 28,
      },
    },
    highlight: {
      position: "relative",
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      borderRadius: theme.radius.sm,
      padding: "4px 12px",
    },
    dots: {
      position: "absolute",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[0]
          : theme.colors.gray[0],

      "@media (max-width: 755px)": {
        display: "none",
      },
    },
  }));

  const { classes } = useStyles();
  const gas = useGasPrice({ chainId: DefaultChain.chainId });

  const handleRegister = async () => {
    if (!emoji || !title) return;
    setLoading(true);
    setStatus("Minting ...");
    try {
      let utf8Encode = new TextEncoder();
      const price = 16 - utf8Encode.encode(emoji).length;
      const register: any = await _register(emoji, title, {
        value: ethers.utils.parseUnits(price.toString(), 10),
        gasLimit: 3000000,
        gasPrice: gas,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setStatus("");
    }
  };

  useEffect(() => {
    if (
      _stateRegister.status === "Success" ||
      _stateRegister.status === "Exception"
    ) {
      setEmoji(emoji);
      setLoading(false);
      setStatus("");
    }
  }, [_stateRegister]);

  return (
    <Paper
      shadow="md"
      radius="md"
      p="md"
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
      <Drawer
        transition="scale-x"
        transitionDuration={250}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Mint"
        padding="xl"
        size="xl"
      />
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
      <Input
        icon={
          <IconLock
            color={
              theme.colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[4]
            }
          />
        }
        value={`https://evm.la/#/${emoji || "👻"}`}
        onClick={() => {
          if (!owner) setShowEmoji(!showEmoji);
        }}
        readOnly
        rightSectionWidth={130}
        rightSection={
          loading ? (
            <Loader size="md" color="cyan" />
          ) : exists ? (
            owner ? (
              <CopyButton value={`https://evm.la/#/${emoji}`}>
                {({ copied, copy }) => (
                  <Button
                    color={copied ? "teal" : "cyan"}
                    variant="light"
                    uppercase
                    onClick={copy}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            ) : (
              <Button
                radius="md"
                color="red"
                variant="light"
                uppercase
                onClick={() => {
                  setShowEmoji(!showEmoji);
                }}
              >
                Taken
              </Button>
            )
          ) : emoji && account ? (
            <Button
              radius="md"
              color="cyan"
              variant="light"
              uppercase
              onClick={() => handleRegister()}
            >
              Mint
            </Button>
          ) : !account ? (
            <Connect />
          ) : (
            <Button
              radius="md"
              color="teal"
              variant="light"
              uppercase
              onClick={() => {
                setShowEmoji(!showEmoji);
              }}
            >
              Select
            </Button>
          )
        }
        radius="md"
        size="xl"
      />
      {showEmoji && (
        <div
          style={{
            position: "absolute",
            zIndex: "101",
            margin: "17px 0 0 1px",
            borderRadius: "8px",
          }}
        >
          <Picker
            data={data}
            emojiSize={32}
            emojiButtonSize={42}
            perLine={10}
            previewEmoji="point_up"
            previewPosition="none"
            navPosition="none"
            skinTonePosition="search"
            maxFrequentRows="none"
            onEmojiSelect={(e: { native: string }) => {
              setEmoji(e.native);
              setShowEmoji(!showEmoji);
            }}
            theme={theme.colorScheme}
          />
        </div>
      )}
      <Paper radius="md" p="md" mt="md" withBorder>
        <Title
          className={classes.title}
          variant="gradient"
          gradient={{
            from: theme.colorScheme === "dark" ? "#800031" : "#ff3986",
            to: theme.colorScheme === "dark" ? "#ff5f00" : "#ff8c47",
            deg: 45,
          }}
        >
          EVMOS Emoji 👻 Wallet
        </Title>
        {loading ? (
          <Box
            style={{
              textAlign: "center",
              width: "100%",
              margin: "20px auto",
            }}
          >
            <Loader size="xl" color="cyan" />
            <Box style={{ margin: "20px auto" }}>{status}</Box>
          </Box>
        ) : (
          <Box
            style={{
              width: "100%",
            }}
          >
            {owner ? (
              <Flex
                mih={50}
                gap="lg"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Box
                  style={{
                    textAlign: "center",
                    fontSize: 100,
                    border: "0",
                    borderRadius: "20px",
                    padding: "20px 30px",
                    display: "inline-block",
                    width: "200px",
                    position: "relative",
                    background:
                      theme.colorScheme === "dark"
                        ? theme.fn.linearGradient(
                            randomDeg,
                            theme.colors.left[8],
                            theme.colors.right[8]
                          )
                        : theme.fn.linearGradient(
                            randomDeg,
                            theme.colors.left[1],
                            theme.colors.right[1]
                          ),
                    boxShadow: "4px 8px 8px hsl(0deg 0% 0% / 38%)",
                  }}
                >
                  <Dot
                    className={classes.dots}
                    style={{
                      left: 8,
                      top: 90,
                      height: "140px",
                      opacity: 0.1,
                    }}
                  />
                  <Text
                    component="div"
                    size="lg"
                    color="white"
                    lineClamp={1}
                    style={{ height: 42 }}
                  >
                    {owner.name}
                  </Text>
                  <Divider
                    mb="sm"
                    size="xl"
                    variant="dotted"
                    labelPosition="center"
                    color="white"
                    label={
                      <>
                        <IconGhost color="white" size={20} />
                      </>
                    }
                    style={{ opacity: "0.5" }}
                  />
                  <Text style={{ lineHeight: "1.3", position: "relative" }}>
                    {owner.emoji}
                  </Text>
                </Box>
                <Box>
                  <Notification
                    icon={<IconUserCheck size={18} />}
                    color="cyan"
                    disallowClose
                  >
                    {account}
                  </Notification>
                  <Divider
                    my="xs"
                    variant="dashed"
                    labelPosition="center"
                    label={
                      <>
                        <IconWallet size={12} />
                        <Box ml={5}>Balance</Box>
                      </>
                    }
                  />
                  <Notification
                    icon={<IconWallet size={18} />}
                    color="teal"
                    disallowClose
                  >
                    {etherBalance && ethers.utils.formatEther(etherBalance)}{" "}
                    <span className={classes.highlight}>EVMOS</span>
                  </Notification>
                  <Divider
                    my="xs"
                    variant="dashed"
                    labelPosition="center"
                    label={
                      <>
                        <IconBuildingStore size={12} />
                        <Box ml={5}>Emoji Wallet NFT</Box>
                      </>
                    }
                  />
                  <Notification
                    icon={<IconBuildingStore size={18} />}
                    color="violet"
                    disallowClose
                  >
                    <Button
                      component="a"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="light"
                      fullWidth
                      href={`https://tofunft.com/user/${account}/items/in-wallet`}
                    >
                      Buy / Sell NFT
                    </Button>
                  </Notification>
                </Box>
              </Flex>
            ) : (
              <Box
                style={{
                  width: "100%",
                }}
              >
                {emoji ? (
                  <Box
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      style={{
                        fontSize: 100,
                        border: "0",
                        borderRadius: "20px",
                        padding: "20px 30px",
                        display: "inline-block",
                        width: "200px",
                        position: "relative",
                        background:
                          theme.colorScheme === "dark"
                            ? theme.fn.linearGradient(
                                randomDeg,
                                theme.colors.left[8],
                                theme.colors.right[8]
                              )
                            : theme.fn.linearGradient(
                                randomDeg,
                                theme.colors.left[1],
                                theme.colors.right[1]
                              ),
                        boxShadow: "4px 8px 8px hsl(0deg 0% 0% / 38%)",
                      }}
                    >
                      <Dot
                        className={classes.dots}
                        style={{
                          left: 8,
                          top: 90,
                          height: "140px",
                          opacity: 0.1,
                        }}
                      />
                      <TextInput
                        value={title}
                        placeholder="Enter your name"
                        variant="unstyled"
                        size="md"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTitle(e.target.value)
                        }
                      />
                      <Divider
                        mb="sm"
                        size="xl"
                        variant="dotted"
                        labelPosition="center"
                        color="white"
                        label={
                          <>
                            <IconGhost color="white" size={20} />
                          </>
                        }
                        style={{ opacity: "0.5" }}
                      />
                      <Text style={{ lineHeight: "1.3", position: "relative" }}>
                        {emoji}
                      </Text>
                    </Box>
                  </Box>
                ) : (
                  <List spacing="xs" size="sm" center>
                    <List.Item
                      icon={
                        <ThemeIcon color="pink" size={24} radius="xl">
                          <IconMoodBoy size={16} />
                        </ThemeIcon>
                      }
                    >
                      Your Personal Emoji {emoji || "👻"} Wallet{" "}
                      <Button
                        component={Link}
                        variant="subtle"
                        to="/faq"
                        compact
                      >
                        What is Emoji NFT?
                      </Button>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="teal" size={24} radius="xl">
                          <IconCurrencyDollar size={16} />
                        </ThemeIcon>
                      }
                    >
                      Sending <span className={classes.highlight}>EVMOS</span>{" "}
                      Using Emoji {emoji || "👻"} Wallet
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="indigo" size={24} radius="xl">
                          <IconLink size={16} />
                        </ThemeIcon>
                      }
                    >
                      Your Beautiful And Short Payment URL{" "}
                      <Button
                        component="a"
                        target="_blank"
                        variant="subtle"
                        color="indigo"
                        href="/#/👻/34"
                        compact
                      >
                        evm.la/#/{emoji || "👻"}/34
                      </Button>
                    </List.Item>
                  </List>
                )}
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Paper>
  );
};

export default Mint;
