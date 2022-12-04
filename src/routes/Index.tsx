import { useParams } from "react-router-dom";

import Send from "../components/SendEMJ";
import Mint from "../components/MintEMJ";

export default function Index() {
  const { slug } = useParams();

  return slug && slug !== "mint" ? <Send /> : <Mint />;
}
