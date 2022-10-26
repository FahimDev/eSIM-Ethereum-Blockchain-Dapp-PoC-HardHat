import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/RegisterMNO.module.css";
import CreateMNOComponent from "../../components/mno/create-mno"; // https://github.com/vercel/next.js/tree/canary/examples
import TabHeaderComponent from "../../components/layouts/tab-header"; 

const CreateMNO: NextPage = () => {

  return (
    <div className={styles.container}>
      <TabHeaderComponent title="MNO Registration" />
      <CreateMNOComponent />
    </div>
  );
};
export default CreateMNO;
