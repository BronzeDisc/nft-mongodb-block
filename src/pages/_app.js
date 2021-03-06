import "../../styles/globals.css";
import Header from "./components/Header";
import Right from "./components/Right";
import Left from "./components/Left";
import Middle from "./components/Middle";
import styled from "styled-components";
import Head from "next/head";
import { AuthProvider } from "../providers/context";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: 7vh 93vh;
  grid-template-areas:
    "header header header"
    "left middle right";
  /* background-color: blue; */

  /* @media only screen and (max-width: 720px) {
    grid-template-areas:
      "header header header"
      "middle middle right";
  } */
`;

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
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
      <Container>
        <Header></Header>

        <Component {...pageProps} />
        <Left></Left>
      </Container>
    </AuthProvider>
  );
}

export default MyApp;
