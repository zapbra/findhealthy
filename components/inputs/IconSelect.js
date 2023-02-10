import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  .main-img-cont {
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    border: 4px solid ${(props) => props.colors.black};
  }
  .icon {
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    border: 4px solid ${(props) => props.colors.green};
    cursor: pointer;
  }
  .icons-holder {
    display: flex;
    padding: 16px;
    background-color: ${(props) => props.colors.offWhite};
    border-radius: 16px;
    border: 4px solid ${(props) => props.colors.black};
    position: relative;
  }
  .icon-active {
    position: absolute;
  }
`;
const IconSelect = () => {
  const [selectedIcon, setSelectIcon] = useState("/icons/meat.png");
  const [icons, setIcons] = useState([
    "/icons/milk.png",
    "/icons/egg.png",
    "/icons/fish.png",
    "/icons/fruit.png",
  ]);
  const [draggingElem, setDraggingElem] = useState({ element: null });
  const startDrag = (e, icon) => {
    const iconElem = document.getElementById(icon);
    iconElem.classList.add("icon-active");
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
  const elementDrag = (e) => {
    console.log(e);
  };
  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  })
  const endDrag = () => {
    draggingElem.element.classList.remove("icon-active");
  };
  const updateDraggingElem = (e) => {
    console.log(e);
  };
  const iconElems = icons.map((icon) => {
    return (
      <div
        className="icon mar-right-8"
        id={icon}
        onMouseDown={(e) => startDrag(e, icon)}
      >
        <Image
          style={{ display: "block" }}
          src={icon}
          width="32"
          height="32"
          quality="100"
        />
      </div>
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="main-img-cont box-shadow-2 cursor mar-right-32">
        <Image
          style={{ display: "block" }}
          src={selectedIcon}
          width="32"
          height="32"
          quality="100"
        />
      </div>
      <div className="icons-holder">{iconElems}</div>
    </Cont>
  );
};

export default IconSelect;
