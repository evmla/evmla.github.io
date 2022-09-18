import { Contract, utils } from "ethers";
import { EVM_CONTRACT } from "../constants";
import { SBT } from "../abi";
import { Call } from "@usedapp/core";

const contract = new Contract(EVM_CONTRACT, new utils.Interface(SBT));

const souls = (first: number = 1, skip: number = 0): Call[] => {
  const calls = [];

  let i = skip <= 0 ? 1 : skip;
  for (; i <= first + skip; i++) {
    calls.push({
      contract,
      method: "getMetadataByIdDesc",
      args: [i.toString()],
    });
  }

  return calls;
};

const getMetadataBySoul = (soul: string): Call[] => {
  const calls = [];

  calls.push({
    contract,
    method: "getMetadataBySoul",
    args: [soul],
  });

  return calls;
};

const getMetadataByOwner = (owner: string): Call[] => {
  const calls = [];

  calls.push({
    contract,
    method: "getMetadataByOwner",
    args: [owner],
  });

  return calls;
};

const getMetadataById = (id: string): Call[] => {
  const calls = [];

  calls.push({
    contract,
    method: "getMetadataById",
    args: [id],
  });

  return calls;
};

export { getMetadataBySoul, getMetadataById, getMetadataByOwner, souls };
