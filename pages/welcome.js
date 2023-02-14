import Head from "next/head";
import styled from "styled-components";
import supabase from "../utils/supabaseClient";
import { useState, useEffect, useRef } from "react";
import COLORS from "../data/colors";
import { shootFireworks } from "../utils/functions";
import NotLogged from "../components/welcome/notlogged";
import Redirect from "../components/Redirect";
const Cont = styled.div`
  padding: 32px;
`;
const Welcome = () => {
  useEffect(() => {
    shootFireworks();
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
      }
    };
    fetchUser();
  }, []);
  const meta = {
    title: "Login",
    description:
      "Healthyfoodmap account page. Login to your existing account or create a new account to save posts for later and create your own posts.",
    link: "https://healthyfoodmap.com/",
    type: "website",
    date: "2023-02-14 15:00:00.000",
    image: "/seo/welcome.PNG",
    keywords:
      "online farm finder, find farm, find farms near me, grassfed meat near me, healthyfoodmap, healthy farms, find farms, farm finder",
  };
  return (
    <Cont colors={COLORS}>
      <Head>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Healthyfoodmap" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      {user == null ? <NotLogged /> : <Redirect link="/" />}
    </Cont>
  );
};

export default Welcome;
