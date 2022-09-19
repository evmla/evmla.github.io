import {
  Box,
  Center,
  Header,
  SegmentedControl,
  Text,
  Image,
  useMantineTheme,
  Group,
  ActionIcon,
  useMantineColorScheme,
  MediaQuery,
} from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconUserPlus,
  IconExchange,
} from "@tabler/icons";
import Connect from "./Connect";

import logoDark from "../assets/soul-dark.svg";
import logoWhite from "../assets/soul-white.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Top = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();
  let navigate = useNavigate();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (
      location &&
      location.pathname !== "/" &&
      location.pathname !== "/faq" &&
      location.pathname !== "/mint"
    ) {
      setValue("send");
    } else if (location.pathname === "/" || location.pathname === "/mint") {
      setValue("mint");
    } else {
      setValue(null);
    }
  }, [location]);

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <Group>
            <Text component={Link} to="/">
              <Image
                width={35}
                height={35}
                fit="contain"
                src={theme.colorScheme === "dark" ? logoWhite : logoDark}
                alt="Logo"
              />
            </Text>
            <Text
              color={theme.colorScheme === "dark" ? "white" : "black"}
              size="xl"
            >
              EVM
            </Text>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
              radius="md"
            >
              {colorScheme === "dark" ? (
                <IconSun size={16} />
              ) : (
                <IconMoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </div>
        <div>
          <SegmentedControl
            onChange={(value) => {
              navigate(`/${value}`);
            }}
            //@ts-ignore
            value={value}
            data={[
              {
                value: "mint",
                label: (
                  <Center>
                    <IconUserPlus size={16} />
                    <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                      <Box ml={10}>Mint SBT</Box>
                    </MediaQuery>
                  </Center>
                ),
              },
              {
                value: "send",
                label: (
                  <Center>
                    <IconExchange size={16} />
                    <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                      <Box ml={10}>Send EVMOS</Box>
                    </MediaQuery>
                  </Center>
                ),
              },
            ]}
            fullWidth
          />
        </div>
        <div>
          <Connect />
        </div>
      </div>
    </Header>
  );
};

export default Top;
