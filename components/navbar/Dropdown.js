import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowTurnUp,
  faUser,
  faSearch,
  faLocationDot,
  faNewspaper,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  background: rgb(18, 60, 105);
  background: linear-gradient(
    0deg,
    rgba(18, 60, 105, 1) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(18, 60, 105, 1) 100%
  );
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.5s ease, visibility 0.5s ease;
  z-index: 6;
  padding: 8px 16px;
  .line {
    padding: 4px;
    border-bottom: 2px solid ${(props) => props.colors.offWhite};
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
      .white {
        color: ${(props) => props.colors.darkBlue} !important;
        text-shadow: 3px 8px 7px rgba(0, 0, 0, 0.61);
      }
    }
  }
  h4 {
    text-decoration: none !important;
  }
  .white-line {
    width: 100%;
    height: 12px;
    background-color: ${(props) => props.colors.offWhite};
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .icon-holder {
    width: 48px;
    height: 48px;
    border: 2px solid ${(props) => props.colors.offWhite};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background-color: transparent;
    transition: background-color 0.25s ease;
    margin-left: auto;
    &:hover {
      background-color: ${(props) => props.colors.offWhite};
      .white {
        color: ${(props) => props.colors.darkBlue};
      }
    }
  }
`;

const Dropdown = ({ hideMobileActive, mobileActive }) => {
  return (
    <Cont
      colors={COLORS}
      style={{
        transform: mobileActive ? "translateY(0)" : "translateY(-100%)",
        visibility: mobileActive ? "visible" : "hidden",
      }}
    >
      <div
        onClick={hideMobileActive}
        className="icon-holder box-shadow-white cursor"
      >
        <FontAwesomeIcon icon={faArrowTurnUp} className="icon-sm white" />
      </div>
      <Link onClick={hideMobileActive} href="/account">
        <div className="flex line align-center">
          <h4 className="white text-shadow-white light mar-right-8">ACCOUNT</h4>
          <FontAwesomeIcon icon={faUser} className="white icon-sm" />
        </div>
      </Link>
      <Link onClick={hideMobileActive} href="/forum">
        <div className="flex line align-center mar-bottom-32">
          <h4 className="white text-shadow-white light mar-right-8">FORUM</h4>
          <FontAwesomeIcon icon={faComment} className="white icon-sm" />
        </div>
      </Link>
      <section>
        <h3 className="white">FOOD MAP </h3>
        <Link onClick={hideMobileActive} href="/">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className="white text-shadow-white light mar-right-8">MAP</h4>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="white icon-ssm"
              />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
        <Link onClick={hideMobileActive} href="/nutritionsearch">
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className="white text-shadow-white light mar-right-8">
                NUTRITION SEARCH
              </h4>
              <FontAwesomeIcon icon={faSearch} className="white icon-ssm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
      </section>

      <div className="white-line"></div>

      <section>
        <h3 className="white">FISH FINDER </h3>
        <Link href="/fishmap" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className="white text-shadow-white light mar-right-8">MAP</h4>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="white icon-ssm"
              />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>

        <Link href="/articles" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className="white text-shadow-white light mar-right-8">
                ARTICLES
              </h4>
              <FontAwesomeIcon icon={faNewspaper} className="white icon-ssm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>

        <Link href="/datasearch" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <div className="flex-inline align-center">
              <h4 className="white text-shadow-white light mar-right-8">
                DATA SEARCH
              </h4>
              <FontAwesomeIcon icon={faSearch} className="white icon-ssm" />
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
      </section>
    </Cont>
  );
};

export default Dropdown;
