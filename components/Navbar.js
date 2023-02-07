import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./navbar/Dropdown.js";
import supabase from "../utils/supabaseClient";
const Cont = styled.div`
  .nav-desktop {
    background-color: ${(props) => props.colors.tan};
    padding: 16px 32px 8px 32px;
    position: relative;
    overflow: hidden;
    @media only screen and (max-width: 780px) {
      display: none;
    }
  }

  .grid-cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .splitter {
    width: 24px;
    height: 260%;
    background: ${(props) => props.colors.darkPink};
    margin-right: 8px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
  }
  .splitter-blue {
    width: 24px;
    height: 260%;
    background: ${(props) => props.colors.darkBlue};
    margin-right: 16px;
    position: relative;
    top: 40px;
    transform: rotate(30deg);
  }
  .nav-section {
    display: flex;
    align-items: flex-end;
    height: 80px;
  }
  .food-section {
    padding-right: 40px;
  }
  .nav-mobile {
    @media only screen and (min-width: 780px) {
      display: none;
    }
    .nav-mobile-content {
      display: flex;
      background-color: ${(props) => props.colors.tan};
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
    }
  }
  .menu-bars {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: 1px solid ${(props) => props.colors.darkPink};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: ${(props) => props.colors.black};
      .red {
        color: ${(props) => props.colors.black};
      }
    }
  }
`;
const Navbar = () => {
  const [mobileActive, setMobileActive] = useState(false);

  const hideMobileActive = () => {
    setMobileActive(false);
  };

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
    <Cont colors={COLORS} id="navbar">
      <div className="nav-desktop">
        <Link href="/" className = 'no-color-link text-shadow-red'>
          <h5 className="inline-block mar-right-32 ">FINDHEALTHY</h5>
        </Link>
        {user !== null ? (
          <Link href="/account">
            <div className="inline-block blue-btn-two">
              <h5>{user.user_metadata.username}</h5>
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <div className="inline-block black-btn">
              <h5>Login</h5>
            </div>
          </Link>
        )}

        <div className="grid-cont">
          <div className="nav-section food-section">
            <Link href="/" className = 'no-color-link text-shadow-red'>
              <h4 className=" mar-right-32 ">FOOD MAP</h4>
            </Link>
            <Link href = '/' className = 'no-color-link text-shadow-red'>
            <h5 className="mar-right-16">MAP</h5>
            </Link>
            <Link href = '/' className = 'no-color-link text-shadow-red'>
            <h5>FORUM</h5>

            </Link>
            
          </div>

          <div className="nav-section">
            <div className="splitter"></div>
            <div className="splitter-blue"></div>
            <h4 className="blue mar-right-32"> FISH FINDER</h4>
            <h5 className="blue mar-right-16">MAP</h5>
            <h5 className="blue mar-right-16">ARTICLES</h5>
            <h5 className="blue mar-right-16">DATA SEARCH</h5>
          </div>
        </div>
      </div>

      <div className="nav-mobile">
        <div className="nav-mobile-content">
          <div className="flex align-center flex-wrap">
            <Link href="/" className="mar-right-16">
              <h4>FIND HEALTHY</h4>
            </Link>
            {user !== null ? (
              <Link href="/account">
                <h5 className="black text-shadow">
                  {user.user_metadata.username}
                </h5>
              </Link>
            ) : (
              <Link href="/login">
                <h5 className="black text-shadow">Sign Up</h5>
              </Link>
            )}
          </div>
          <div
            onClick={() => setMobileActive(true)}
            className="menu-bars cursor"
          >
            <FontAwesomeIcon icon={faBars} className="icon-sm red" />
          </div>
        </div>
        <Dropdown
          mobileActive={mobileActive}
          hideMobileActive={hideMobileActive}
        />
      </div>
    </Cont>
  );
};

export default Navbar;
