import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { ethers } from "ethers";
import styles from "../../styles/RegisterMNO.module.css";
import { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
const ContractAddress = require("../../../json-log/deployedContractAddress.json");
const SignVerify = require("../../../public-blockchain/artifacts/contracts/VerifySignData.sol/VerifySignData.json");

const CreateMNOComponent: NextPage = () => {
  /**
   * In useState first element can be an object and
   * the second elementr is a value setter function of that object
   *  */
  const [signatures, setSignaturesFun] = useState<any>([]);
  const { active, library: provider } = useWeb3React();
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));

  const SIGNING_DOMAIN_NAME = "MNOReg";
  const SIGNING_DOMAIN_VERSION = "1";
  const SIGNING_DOMAIN_CHAIN_ID = 5;

  // EIP-721 Data standard
  const _domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: ContractAddress.genesisContract,
    chainId: SIGNING_DOMAIN_CHAIN_ID,
  };
  // EIP-721 Data standard
  const _domainDataType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "chainId", type: "uint256" },
  ];

  const checkWallet = async () => {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install it.");
      return null;
    }
    if (!active) {
      window.alert("Your wallet is not connected!");
      return null;
    }
    return "Connected";
  };

  const signMessageV4 = async (dto: any) => {
    if ((await checkWallet()) == null) {
      return null;
    }
    try {
      let data = dto.messageDTO;

      const msgPayload = {
        domain: _domain,
        message: data,
        primaryType: "WeightedVector",
        types: {
          EIP712Domain: _domainDataType,
          WeightedVector: dto.types,
        },
      };

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      // Set up variables for message signing
      let msgParams = JSON.stringify(msgPayload);
      console.log(msgPayload);
      var params = [address, msgParams];
      var method = "eth_signTypedData_v4";
      // Mustaqur Bhai's Approach
      let obj = await createWeightedVector(
        data.title,
        data.brand,
        data.network,
        data.prefix,
        data.mcc,
        data.mnc,
        { WeightedVector: dto.types },
        ContractAddress.genesisContract
      );
      const signature: string = obj.signature;
      // This signGeneratorV4() method is strictly following MetaMask's Sign Type V4 process.
      // const signature: string = await signGeneratorV4(method, params, address);
      return {
        msgPayload,
        signature,
        address,
      };
    } catch (err) {
      window.alert(err);
      return null;
    }
  };

  const signGeneratorV4 = async (
    method: string,
    params: any[],
    address: string
  ) => {
    // Send signature request
    let signedMessage: string = "";
    await window.ethereum.sendAsync(
      {
        method,
        params,
        address,
      },
      async function (err: Error, result: any) {
        if (err) {
          window.alert(err.message);
          return console.log(err);
        }
        // Store retrieved signature result
        signedMessage = result.result;
      }
    );
    // await delay(7000);
    return signedMessage;
  };

  // const executeContractMethod = async () => {
  //   let abiData = JSON.stringify(SignVerify.abi);
  //   const signer = provider.getSigner();
  //   const contractAddress = ContractAddress.genesisContract;
  //   const contract = new ethers.Contract(contractAddress, abiData, signer);
  //   try {
  //     window.alert(await contract.verify());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const signMessage = async (dto: any) => {
    try {
      if ((await checkWallet()) == null) {
        return null;
      }
      const signer = provider.getSigner();
      const unsignedJSON = JSON.stringify(dto);
      const signature = await signer.signMessage(unsignedJSON);
      const address = await signer.getAddress();

      return {
        dto,
        signature,
        address,
      };
    } catch (err) {
      window.alert(err);
    }
  };

  const postAPI = async (sig: any) => {
    /***********************************|
   |        API Integration             |
   |__________________________________*/
    let context: any = {
      dto: sig?.msgPayload,
      signature: sig?.signature,
      address: sig?.address,
    };
    const rawResponse = await fetch("/api/create-mno", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context),
    });
    if (rawResponse.status == 200) {
      window.alert(
        "Sign Type V4 Verified by MetaMask Method (js) ! Sign saved as JSON File for R&D."
      );
    } else if (rawResponse.status == 404) {
      window.alert("Sign Type V4 is Invalid!");
    } else {
      window.alert(
        "Something went wrong in Sign Type V4 Verification Error Unknown!"
      );
    }
    // const content = await rawResponse.json();
  };

  const createWeightedVector = async (
    title: string,
    brand: string,
    network: string,
    prefix: number,
    mcc: number,
    mnc: number,
    types: any,
    contractAddress: string
  ) => {
    const weightedVector = { title, brand, network, prefix, mcc, mnc };
    const domain = _signingDomain(contractAddress);
    console.log(weightedVector, domain, types);
    const signature = await getSignature(domain, types, weightedVector);
    return {
      ...weightedVector,
      signature,
    };
  };

  const _signingDomain = (contractAddress: string) => {
    console.log(contractAddress);
    const _domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: contractAddress,
      chainId: SIGNING_DOMAIN_CHAIN_ID,
    };
    return _domain;
  };

  const getSignature = async (domain: any, types: any, voucher: any) => {
    const signer = provider.getSigner();
    const signature = await signer._signTypedData(domain, types, voucher);
    return signature;
  };

  const handleSign = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data.values());
    let mnoDTO: any = {
      title: data.get("title"),
      brand: data.get("brand"),
      network: data.get("network"),
      prefix: data.get("prefix"),
      mcc: data.get("mcc"),
      mnc: data.get("mnc"),
    };
    // EIP-721 Data standard
    let mnoDTO_v4: any = {
      messageDTO: mnoDTO,
      types: [
        { name: "title", type: "string" },
        { name: "brand", type: "string" },
        { name: "network", type: "string" },
        { name: "prefix", type: "uint256" },
        { name: "mcc", type: "uint256" },
        { name: "mnc", type: "uint256" },
      ],
    };

    ///  ------------------------------
    const sig = await signMessageV4(mnoDTO_v4);

    // const sig = await signMessage(mnoDTO);
    if (sig && sig?.signature.length > 0) {
      /**
       * The use of '...' in the array is to prevent the data override issue in any index
       * It keeps the continuity of the index and assign data and a new empty index.
       *   */
      setSignaturesFun([...signatures, sig]);
      /**
       * ##########--> Optional chaining (?.) <--##########
       * The optional chaining (?.) operator accesses an object's property or calls a function.
       * If the object is undefined or null, it returns undefined instead of throwing an error.
       */
      window.alert(
        `*** SIGNING DATA SUCCESSFUL ***\n ===> Signer Address: ${sig?.address} \n ===> Signed Data: ${sig?.signature}`
      );
      // executeContractMethod();
      postAPI(sig);
      console.log(sig);
      //console.log(sig?.signature);
    } else {
      window.alert("Please, check your wallet and try again.");
    }
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex flex-row flex-wrap justify-center">
          <div className="basis-3/6">
            <form
              onSubmit={handleSign}
              className="shadow-xl border-double border-4 border-cyan-600 rounded-lg border-x-cyan-100"
            >
              <div className="p-8">
                <h1 className="capitalize hover:uppercase text-2xl">
                  Register
                </h1>
                <p className="indent-4">
                  Please fill in this form to Register a Mobile Network
                  Operator.{" "}
                  <a
                    href="https://cellidfinder.com/mcc-mnc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </a>
                </p>
                <hr />
                <label>
                  <b>Title</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Company Title"
                  name="title"
                  id="title"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <label>
                  <b>Brand</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Brand Name"
                  name="brand"
                  id="brand"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <label>
                  <b>Network</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Network Name"
                  name="network"
                  id="network"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />

                <label>
                  <b>Prefix</b>
                </label>
                <input
                  type="number"
                  placeholder="Enter Operator Prefix"
                  name="prefix"
                  id="prefix"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <label>
                  <b>
                    Mobile Country Code <sub>(MCC)</sub>
                  </b>
                </label>
                <input
                  type="number"
                  placeholder="Enter Mobile Country Code"
                  name="mcc"
                  id="mcc"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <label>
                  <b>
                    {" "}
                    Mobile Network Code <sub>(MNC)</sub>
                  </b>
                </label>
                <input
                  type="number"
                  placeholder="Enter  Mobile Network Code"
                  name="mnc"
                  id="mnc"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <hr />

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="state"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Username
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="username"
                      name="username"
                      type="text"
                      placeholder="<Brand><MNC><OfficeID>"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@official.com"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Password
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Make it as long and as crazy as you'd like
                    </p>
                  </div>
                </div>
                <hr />
                <p>
                  By creating an account you agree to our{" "}
                  <a
                    className="no-underline hover:underline decoration-4 decoration-lime-800"
                    href="#"
                  >
                    Terms & Privacy
                  </a>
                  .<br></br>
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Verified Smart Contract Address:
                    <span className="inline-flex items-center p-1 mr-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                      <svg
                        aria-hidden="true"
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>{" "}
                      <a
                        href={
                          "https://goerli.etherscan.io/address/" +
                          ContractAddress.genesisContract +
                          "#code"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ContractAddress.genesisContract}{" "}
                      </a>
                      <span className="sr-only">Verified Smart Contract</span>
                    </span>
                  </span>
                </p>
                <div className="flex items-center justify-center p-4">
                  <span className="relative inline-flex">
                    <button
                      type="submit"
                      className={`${styles.registerbtn} inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20`}
                    >
                      Get Register
                    </button>
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </span>
                </div>

                <div className={styles.signin}>
                  <p>
                    Already have an account?{" "}
                    <a
                      className="no-underline hover:underline decoration-4 decoration-sky-500"
                      href="#"
                    >
                      Sign in
                    </a>
                    .
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default CreateMNOComponent;
