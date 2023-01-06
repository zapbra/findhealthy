import styled from "styled-components";
import { useState } from "react";
import COLORS from "../../data/colors";
import Tag from "./Tag";
import SelectedTag from "./SelectedTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div``;
const ProductTypes = ({ tags, selectedTags, pushTag, deleteTag }) => {
  const [text, setText] = useState("");

  const [renderRange, setRenderRange] = useState(10);

  const renderTags = tags.map((tag) => {
    return <Tag text={tag} pushTag={pushTag} />;
  });

  const selectedTagElems = selectedTags.map((tag) => {
    return <SelectedTag text={tag} deleteTag={deleteTag} />;
  });

  const increaseRenderRange = () => {
    setRenderRange((prev) => {
      return prev + 10;
    });
  };

  const updateText = (e) => {
    setText(e.target.value);
    if (e.target.value === "") {
    } else {
      setRenderTags((prev) => {
        return tags.filter((tag) => tag.includes(text));
      });
    }
  };
  return (
    <Cont colors={COLORS}>
      <div className="tags-input-box mar-bottom-8">
        <input
          type="text"
          value={text}
          onChange={updateText}
          placeholder="milk... eggs..."
          name="products"
        />
        {selectedTagElems}
      </div>
      <div className="tag-holder">{renderTags}</div>
      <div className="mar-bottom-8"></div>
      {renderRange <= tags.length && (
        <div className="more-btn">
          <p className="bold">SHOW MORE</p>
          <FontAwesomeIcon icon={faEllipsis} className="icon-ssm" />
        </div>
      )}
    </Cont>
  );
};

export default ProductTypes;
