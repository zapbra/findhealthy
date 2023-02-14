import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../data/colors";
import NotLogged from "../components/account/notlogged";
import UserPage from "../components/account/UserPage";
import { Toaster } from "react-hot-toast";
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
  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session.session != null) {
      setUser(session.session.user);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Cont colors={COLORS}>
      <Toaster />
      {isLogged ? (
        <UserPage user={user} fetchUser={fetchUser} />
      ) : (
        <NotLogged />
      )}
    </Cont>
  );
};

export default Account;
