import { Contract, utils } from "ethers";
import { EVM_CONTRACT } from "../constants";
import { EVM } from "../abi";
import { Call } from "@usedapp/core";

const contract = new Contract(EVM_CONTRACT, new utils.Interface(EVM));

const slugs = (first: number = 1, skip: number = 0): Call[] => {
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

const getMetadataBySlug = (slug: string): Call[] => {
  const calls = [];

  calls.push({
    contract,
    method: "getMetadataBySlug",
    args: [slug],
  });

  return calls;
};

const getMetadataByAddress = (address: string): Call[] => {
  const calls = [];

  calls.push({
    contract,
    method: "getMetadataByAddress",
    args: [address],
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

export { getMetadataBySlug, getMetadataById, getMetadataByAddress, slugs };
