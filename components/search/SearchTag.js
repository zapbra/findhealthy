import styled from "styled-components";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TagElem = styled.div`
  float: left;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 2px 5px;
  min-width: 70px;
  margin: 5px;
  text-align: center;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 32px;

  .x-icon {
    width: 24px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.colors.white};
    }
  }
`;
const SearchTag = (props) => {
  return (
    <TagElem id={props.id} colors={COLORS} color={props.color}>
      <p>{props.title}</p>
      <FontAwesomeIcon
        icon={faClose}
        onClick={() => props.removeSearchTag(props.id)}
        className="x-icon"
      />
    </TagElem>
  );
};

export default SearchTag;
