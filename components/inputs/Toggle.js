import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-right: 8px;
  .toggle-holder {
    border-radius: 16px;
    background-color: ${(props) => props.colors.grey};
    padding: 2px;
    width: 56px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    position: relative;
    transition: background-color 0.25s ease;
  }

  .circle {
    border-radius: 50%;
    background-color: #fff;
    height: 24px;
    width: 24px;
    position: relative;
    transition: transform 0.25s ease;
    transform: translateX(0);
  }
`;
const Toggle = ({ selected, setSelected }) => {
  return (
    <Cont colors={COLORS}>
      <p className="bold mar-right-4">{selected.name} </p>
      <div
        onClick={() => setSelected(selected.name)}
        style={{
          backgroundColor: selected?.checked ? COLORS.green : COLORS.grey,
        }}
        className="toggle-holder"
      >
        <div
          style={{
            transform: selected?.checked
              ? "translateX(calc(100% + 3px))"
              : "translateX(0px)",
          }}
          className="circle"
        ></div>
      </div>
    </Cont>
  );
};

export default Toggle;
