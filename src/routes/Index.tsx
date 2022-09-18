import { useParams } from "react-router-dom";

import Send from "../components/Send";
import Mint from "../components/Mint";

export default function Index() {
  const { slug } = useParams();

  return slug && slug !== "mint" ? <Send /> : <Mint />;
}
