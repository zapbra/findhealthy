import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import styled from "styled-components";
import COLORS from "../../data/colors";
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
const NotLogged = () => {
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
      <div className="default-page box-shadow-2">
        <div className="center-inline title-spec">
          <h3>You are not currently a user</h3>
        </div>
        <div className="text-content mar-bottom-16">
          <p>
            Signing up allows you to have your own posts, which you can edit in
            the future
          </p>
          <p>Non users can still create posts, but you can't edit them</p>
          <p>
            Also, you can save posts for later, and share your page with your
            posts and create forum posts (in the future){" "}
          </p>
        </div>
        <div className="padding-16">
          <div className="black-btn inline-block">
            <h5>Sign up</h5>
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default NotLogged;
