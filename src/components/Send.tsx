import { IconCoin, IconLock } from "@tabler/icons";
import {
  Box,
  Button,
  CopyButton,
  Grid,
  Group,
  Input,
  Loader,
  NumberInput,
  NumberInputHandlers,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
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
import {
  Call,
  useCalls,
  useEtherBalance,
  useEthers,
  useSendTransaction,
} from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import { getMetadataBySoul, getMetadataByOwner } from "../queries";
import Connect from "./Connect";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { Soul } from "../interfaces";

const Send = () => {
  const theme = useMantineTheme();
  const { account, chainId } = useEthers();
  const { sendTransaction, state } = useSendTransaction();
  const etherBalance = useEtherBalance(account);
  const handlers = useRef<NumberInputHandlers>();
  const { slug, amount } = useParams();

  const [value, setValue] = useState(1.0);
  const [emoji, setEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    state.status !== "None" ? state.status : ""
  );

  const [senderLoading, setSenderLoading] = useState(false);
  const [recipientLoading, setRecipientLoading] = useState(false);

  const [sender, setSender] = useState<Soul | undefined>();
  const [recipient, setRecipient] = useState<Soul | undefined>();

  const [senderQuery, setSenderQuery] = useState<Call[]>([]);
  const [recipientQuery, setRecipientQuery] = useState<Call[]>([]);

  const senderRaw: any = useCalls(senderQuery) ?? [];
  const recipientRaw: any = useCalls(recipientQuery) ?? [];

  useEffect(() => {
    if (slug === "send" || slug === "register") return;
    if (slug) {
      setEmoji(slug);
    }
    if (amount) {
      setValue(parseFloat(amount));
    }
  }, [slug, amount]);

  useEffect(() => {
    if (account) {
      setSenderLoading(true);
      setTimeout(() => {
        setSenderQuery(getMetadataByOwner(account));
      }, 1000);
    }
  }, [account]);

  useEffect(() => {
    if (emoji) {
      setRecipientLoading(true);
      setTimeout(() => {
        setRecipientQuery(getMetadataBySoul(emoji));
      }, 1000);
    }
  }, [emoji]);

  useEffect(() => {
    const [owner, soul, name, description, image, link] = senderRaw?.[0]
      ?.value?.[0] ?? [null, null, null, null, null, null];
    if (owner === ethers.constants.AddressZero) {
      setSenderLoading(false);
      setSender(undefined);
    } else if (owner) {
      setSenderLoading(false);
      setSender({ owner, soul, name, description, image, link });
    }
  }, [senderRaw]);

  useEffect(() => {
    const [owner, soul, name, description, image, link] = recipientRaw?.[0]
      ?.value?.[0] ?? [null, null, null, null, null, null];
    if (owner === ethers.constants.AddressZero) {
      setRecipientLoading(false);
      setEmoji("");
      setRecipient(undefined);
    } else if (owner) {
      setRecipientLoading(false);
      setRecipient({ owner, soul, name, description, image, link });
    }
  }, [recipientRaw]);

  useEffect(() => {
    if (state.status === status) return;
    if (state.status !== "None") {
      if (state.status === "Exception") {
        if (!account) {
          setStatus(`Please connect!`);
        } else if (!chainId) {
          setStatus(`Switch network!`);
        } else {
          setStatus(`Send error!`);
        }
        setTimeout(() => {
          setStatus("");
        }, 5000);
      } else if (state.status === "Success") {
        setStatus(`Success :)`);
        setTimeout(() => {
          setStatus("");
        }, 5000);
      } else if (state.status === "PendingSignature") {
        setStatus(`Signing ...`);
      } else {
        setStatus(`${state.status} ...`);
      }
    }
  }, [state]);

  const handleSend = () => {
    if (
      etherBalance &&
      etherBalance.lt(ethers.utils.parseEther(value.toString()))
    ) {
      setStatus("LOW BALANCE");
      setTimeout(() => {
        setStatus("");
      }, 5000);
      return;
    }
    setLoading(true);
    void sendTransaction({
      to: recipient?.owner,
      value: ethers.utils.parseEther(value.toString()),
    });
  };

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
        value={
          !recipientLoading && emoji && value
            ? `https://evm.la/#/${emoji}/${value}`
            : `Select recipient's registered emoji`
        }
        readOnly
        rightSectionWidth={120}
        rightSection={
          !recipientLoading &&
          emoji &&
          value && (
            <CopyButton value={`https://evm.la/#/${emoji}/${value}`}>
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
            maxFrequentRows="0"
            onEmojiSelect={(e: { native: string }) => {
              setEmoji(e.native);
              setShowEmoji(!showEmoji);
            }}
            theme={theme.colorScheme}
          />
        </div>
      )}
      <Paper radius="md" p="md" mt="md" withBorder>
        <Grid justify="center" align="center">
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            {senderLoading ? (
              <Loader size="xs" color="cyan" />
            ) : (
              <Text size="md" color={theme.colors.gray[6]} lineClamp={1}>
                {(sender && sender.name) || "SENDER"}
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={6} style={{ textAlign: "center" }}>
            <Text size="md" color={theme.colors.gray[6]}>
              EVMOS
            </Text>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            {recipientLoading ? (
              <Loader size="xs" color="cyan" />
            ) : (
              <Text size="md" color={theme.colors.gray[6]} lineClamp={1}>
                {(recipient && recipient.name) || "RECIPIENT"}
              </Text>
            )}
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="center">
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            {senderLoading ? (
              <Loader size="xl" color="cyan" />
            ) : (
              <Text size={60}>{(sender && sender.soul) || "❓"}</Text>
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            <Group spacing={1} position="center" grow>
              <NumberInput
                value={value}
                onChange={(val) => val && setValue(val)}
                handlersRef={handlers}
                min={0}
                precision={2}
                styles={{ input: { textAlign: "center", width: "100%" } }}
                size="xl"
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            {recipientLoading ? (
              <Loader size="xl" color="cyan" />
            ) : (
              <Text
                size={60}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowEmoji(!showEmoji);
                }}
              >
                {emoji || "❓"}
              </Text>
            )}
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="center">
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            <Connect />
          </Grid.Col>
          <Grid.Col span={6} style={{ textAlign: "center" }}>
            <Button
              variant="gradient"
              gradient={{
                from: theme.colorScheme === "dark" ? "#043429" : "#3ee3b1",
                to: theme.colorScheme === "dark" ? "#062d3c" : "#4bade3",
                deg: 105,
              }}
              leftIcon={<IconCoin />}
              size="xl"
              uppercase
              fullWidth
              disabled={recipientLoading || !emoji || !value}
              onClick={handleSend}
            >
              {status || `SEND ${value} EVMOS`}
            </Button>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: "center" }}>
            {recipientLoading ? (
              <Loader size="sm" color="cyan" />
            ) : (
              <Box>
                {recipient ? (
                  <Button
                    component="a"
                    target="_blank"
                    href={`https://evm.evmos.dev/address/${recipient.owner}/transactions`}
                    variant="subtle"
                    color="cyan"
                    uppercase
                    fullWidth
                  >
                    {recipient.owner.slice(0, 4) +
                      ".." +
                      recipient.owner.slice(-2)}
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    color="cyan"
                    uppercase
                    fullWidth
                    onClick={() => {
                      setShowEmoji(!showEmoji);
                    }}
                  >
                    SELECT
                  </Button>
                )}
              </Box>
            )}
          </Grid.Col>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Send;
