import { useContractFunction } from "@usedapp/core";
import { Contract, utils } from "ethers";
import { EVM_CONTRACT } from "../constants";
import { EVM } from "../abi";

export default (functionName: string) => {
  const contract = new Contract(EVM_CONTRACT, new utils.Interface(EVM)) as any;

  return useContractFunction(contract, functionName, {
    gasLimitBufferPercentage: 10,
  });
};
