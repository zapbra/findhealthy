import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
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
  transition: transform 0.5s ease;
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
      }}
    >
      <div
        onClick={hideMobileActive}
        className="icon-holder box-shadow-white cursor"
      >
        <FontAwesomeIcon icon={faArrowTurnUp} className="icon-sm white" />
      </div>
      <section>
        <h3 className="white">FOOD MAP </h3>
        <Link onClick={hideMobileActive} href="/">
          <div className="line flex space-between align-center">
            <h4 className="white text-shadow-white light">MAP</h4>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
        <Link onClick={hideMobileActive} href="/">
          <div className="line flex space-between align-center">
            <h4 className="white text-shadow-white light">FORUM</h4>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
      </section>

      <div className="white-line"></div>

      <section>
        <h3 className="white">FISH FINDER </h3>
        <Link href="/" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <h4 className="white text-shadow-white light">MAP</h4>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>

        <Link href="/" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <h4 className="white text-shadow-white light">ARTICLES</h4>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>

        <Link href="/" onClick={hideMobileActive}>
          <div className="line flex space-between align-center">
            <h4 className="white text-shadow-white light">DATA SEARCH</h4>
            <FontAwesomeIcon icon={faArrowRight} className="white icon-ssm" />
          </div>
        </Link>
      </section>
    </Cont>
  );
};

export default Dropdown;
