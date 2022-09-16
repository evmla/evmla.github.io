import { useState } from "react";
import { AppShell, useMantineTheme, Grid } from "@mantine/core";
import { Route, Routes, useParams } from "react-router-dom";

import Dots from "../components/Dots";
import Bottom from "../components/Bottom";
import Top from "../components/Top";
import Send from "../components/Send";
import Register from "../components/Register";

export default function Index() {
  const theme = useMantineTheme();
  const { slug } = useParams();
  const [action, setAction] = useState(slug && "send");

  return slug && slug !== "register" ? <Send /> : <Register />;
}
