import Head from "next/head";
import Google from "../components/google/index";
import styled from "styled-components";
const Cont = styled.div`
  min-height: 100vh;
`;
export default function Home() {
  return (
    <Cont>
      <Google />
    </Cont>
  );
}
