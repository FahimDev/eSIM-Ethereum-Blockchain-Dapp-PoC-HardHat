import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";

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
            <a href="#">
              <i className="bx">
                <FontAwesomeIcon icon={faDashboard} />
              </i>
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </a>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
            <span className="tooltip">Analytics</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
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
