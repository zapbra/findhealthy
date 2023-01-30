import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  background: ${(props) => props.colors.lightBeige};
  cursor: pointer;
  &:hover {
    background: #fff;
  }
  &:active {
    box-shadow: none;
  }
`;
const ImageUpload = ({selectedImage}) => {
  return (
    <Cont colors={COLORS} className="box-shadow-2">
      <FontAwesomeIcon icon={faImage} className="icon-med blue" />
      <p className="bold blue">Upload</p>
    </Cont>
  );
};

export default ImageUpload;
