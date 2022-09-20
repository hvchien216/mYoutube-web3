import ContractAbi from "../artifacts/contracts/YouTube.sol/YouTube.json";
import { ethers } from "ethers";
import { Ethereum } from '../types/Ethereum';

export default function getContract() {
  // Creating a new provider
  const provider = new ethers.providers.Web3Provider((window as Ethereum).ethereum);
  // Getting the signer
  const signer = provider.getSigner();
  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    "0x10bD437f03fDD2F58E6A8434217be567FE76a8b9",
    ContractAbi.abi,
    signer
  );
  // Returning the contract
  return contract;
}
