import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../data/colors";
import NotLogged from "../components/account/notlogged";
import UserPage from "../components/account/UserPage";
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
  }
  .title-spec {
    padding: 16px;
  }
  .text-content {
    background-color: ${(props) => props.colors.lightBeige};
    padding: 16px;
  }
`;
const Account = () => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);
        setIsLogged(true);
      }
    };
    fetchUser();
  }, []);
  return <Cont colors={COLORS}>{isLogged ? <UserPage /> : <NotLogged />}</Cont>;
};

export default Account;
