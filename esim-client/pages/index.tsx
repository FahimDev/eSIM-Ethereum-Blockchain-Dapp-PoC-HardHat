import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
const ContractAddress = require("../../deployedContractAddress.json");
const SIMTokenizationJSON = require("../../artifacts/contracts/SIMTokenization.sol/SIMTokenization.json");
import TechCardsComponent from "../components/dashboard/tech-cards";
import BannerComponent from "../components/dashboard/banner";

export const injected = new InjectedConnector({});

const Home: NextPage = () => {
  // To check are we actively connected with the web3 React provider or not.
  const { activate, active, library: provider } = useWeb3React();
  // https://github.com/PatrickAlphaC/nextjs-web3-react-metamask-connect/blob/main/pages/index.js
  // https://github.com/Uniswap/web3-react/blob/v6/docs/connectors/injected.md
  // https://www.utf8icons.com/
  // https://www.w3schools.com/charsets/ref_utf_punctuation.asp
  const connectMetaMask = async () => {
    try {
      if (!active) {
        await activate(injected);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const execute = async () => {
    let abiData = JSON.stringify(SIMTokenizationJSON.abi);
    const signer = provider.getSigner();
    const contractAddress = ContractAddress.genesisContract;
    const contract = new ethers.Contract(contractAddress, abiData, signer);
    try {
      window.alert(`Contract Address: ${contractAddress}`);
      window.alert(
        `Total Contract's Token Supply: ${await contract.totalSupply()}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Head>
        <title>eSIM Blockchain Tokenization</title>
        <meta name="description" content="A PoC project of Brain Station 23" />
        <link rel="icon" href="/Brainstation23.ico" />
      </Head>
      <BannerComponent />
      <TechCardsComponent />
      <main className={styles.main}>
        <div className={styles.grid}>
          {active ? (
            <button onClick={execute} className={styles.card}>
              <h2>Wallet Connected &#8383;</h2>
              <p>
                Your client application has been connected with your MetaMask
                Wallet
              </p>
            </button>
          ) : (
            <button onClick={connectMetaMask} className={styles.card}>
              <h2>Connect Wallet &#128423;</h2>
              <p>Get Connected with your MetaMask Wallet.</p>
            </button>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://brainstation-23.com/?bc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/bs23.svg"
              alt="Brain Station 23 Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
