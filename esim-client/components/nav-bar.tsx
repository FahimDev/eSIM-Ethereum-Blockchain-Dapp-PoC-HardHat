import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAssistiveListeningSystems,
  faDashboard,
  faSimCard,
  faTowerCell,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const NavBar: NextPage = () => {
  const sideBarEl: any = useRef();
  const sideBarCloseBtnEl: any = useRef();
  const searchBtnEl: any = useRef();

  function sidebarClickHandler() {
    sideBarEl.current.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  }
  // Sidebar open when you click on the search iocn
  function searchIconClickHandler() {
    sideBarEl.current.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  }

  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
    if (sideBarEl.current.classList.contains("open")) {
      sideBarCloseBtnEl.current.classList.replace(
        "bx-menu",
        "bx-menu-alt-right"
      ); //replacing the iocns class
    } else {
      sideBarCloseBtnEl.current.classList.replace(
        "bx-menu-alt-right",
        "bx-menu"
      ); //replacing the iocns class
    }
  }

  return (
    <div>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/Brainstation23.ico" />
      </Head>
      <div className="sidebar" ref={sideBarEl}>
        <div className="logo-details">
          <img
            className="bx icon p-3 hover:invert"
            width="50"
            src="/Brainstation23.ico"
            alt="profileImg"
          />
          <div className="logo_name pr-4">Brain Station 23</div>
          <i
            className="bx bx-menu"
            ref={sideBarCloseBtnEl}
            onClick={sidebarClickHandler}
            id="btn"
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <i onClick={searchIconClickHandler} className="bx bx-search"></i>
            <input
              className="customInput"
              type="text"
              placeholder="Search..."
            />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="/">
              <i className="bx">
                <FontAwesomeIcon icon={faDashboard} />
              </i>
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="bx">
                <FontAwesomeIcon icon={faWallet} />
              </i>
              <span className="links_name">Wallet</span>
            </a>
            <span className="tooltip">Wallet</span>
          </li>
          <li>
            <a href="/create-mno">
              <i className="bx">
                <FontAwesomeIcon icon={faTowerCell} />
              </i>
              <span className="links_name">MNO</span>
            </a>
            <span className="tooltip">Mobile Network Operator</span>
          </li>
          <li>
            <a href="#">
              <i className="bx">
                <FontAwesomeIcon icon={faSimCard} />
              </i>
              <span className="links_name">eSIM</span>
            </a>
            <span className="tooltip">Embedded-SIM</span>
          </li>
          <li>
            <a href="https://www.gsma.com/">
              <i className="bx"> &#128385; </i>
              <span className="links_name">GSMA</span>
            </a>
            <span className="tooltip">
              Global System for Mobile Communications Association
            </span>
          </li>
          <li>
            <a href="#">
              <i className="bx">
                <img
                  className="bx icon p-3 invert hover:invert-0"
                  width="50"
                  src="/nft-boxFree.svg"
                  alt="profileImg"
                />
              </i>
              <span className="links_name">NFT</span>
            </a>
            <span className="tooltip">Non-fungible Token</span>
          </li>
          <li></li>

          <li>
            <a href="#">
              <i className="bx"> &#128390; </i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">Signer</span>
          </li>
          <li>
            <a href="/api-doc">
              <i className="bx">
                <img
                  className="bx icon p-3 hover:invert"
                  width="50"
                  src="/swagger.svg"
                  alt="profileImg"
                />
              </i>
              <span className="links_name">Swagger API Suit</span>
            </a>
            <span className="tooltip">Swagger API Suit</span>
          </li>

          <li className="profile">
            <div className="profile-details">
              <img src="./BlockchainDev.jfif" alt="profileImg" />
              <div className="name_job">
                <div className="name">Md. Ariful Islam</div>
                <div className="job">Software Engineer</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
