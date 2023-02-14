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

  return (
    <Cont colors={COLORS}>
      {user == null ? <NotLogged /> : <Redirect link="/" />}
    </Cont>
  );
};

export default Welcome;
