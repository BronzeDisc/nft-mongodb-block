import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { connectToDatabase } from "./components/mongodb";
import axios from "axios";
import Right from "./components/Right";
// import Left from "./components/Left";
import Middle from "./components/Middle";
// import Header from "./components/Header";
import getBlockchain from "../ethereum.js";

import styled from "styled-components";
import { AuthContext } from "../providers/context";

const sendData = async () => {
  const data = await axios
    .post("http://localhost:3000/api/api", {
      item: "hey",
      price: 9999,
      quantity: 334,
    })
    .then((arg) => {
      console.log("it worked!");
      console.log(arg);
    })
    .catch((err) => {
      console.log(err);
    });
};

export function Home({ data }) {
  const { token, setToken } = useContext(AuthContext);

  console.log(token);

  useEffect(() => {
    const init = async () => {
      const { nft } = await getBlockchain();
      setToken(nft);
    };

    init();

    window.addEventListener("keyup", (key) => {
      if (key.key === "Enter") {
        console.log("ca na marche pas pour l`instante");
        // sendData();
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Header></Header> */}
      {/* <Left></Left> */}
      <Middle></Middle>
      <Right data={data}></Right>
    </>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db.collection("Customers").find().toArray();
  // console.log(data);

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}

export default Home;
