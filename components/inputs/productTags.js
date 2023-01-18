import styled from "styled-components";
import { useEffect, useState } from "react";
import COLORS from "../../data/colors";
import Tag from "./Tag";
import SelectedTag from "./SelectedTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div``;
const ProductTypes = ({ tags, selectedTags, pushTag, deleteTag }) => {
  const [text, setText] = useState("");
  const [copyTags, setCopyTags] = useState(tags);
  const [renderRange, setRenderRange] = useState(10);

  const pushTagFunctional = (tag) => {
    pushTag(tag);
    setText("");
  };

  const renderTags = copyTags.map((tag, index) => {
    return <Tag key={index} text={tag} pushTag={pushTagFunctional} />;
  });

  useEffect(() => {
    setCopyTags((prev) => {
      return tags.filter((tag) => tag.includes(text));
    });
  }, [tags]);
  const selectedTagElems = selectedTags.map((tag, index) => {
    return <SelectedTag key={index} text={tag} deleteTag={deleteTag} />;
  });

  const increaseRenderRange = () => {
    setRenderRange((prev) => {
      return prev + 10;
    });
  };

  const updateText = (e) => {
    setText(e.target.value);

    if (e.target.value === "") {
      setCopyTags(tags);
    } else {
      setCopyTags((prev) => {
        return tags.filter((tag) => tag.includes(e.target.value));
      });
    }
  };

  const enterTag = (e) => {
    e.preventDefault();
    if (copyTags.length > 0) {
      pushTag(copyTags[0]);
      setText("");
    }
  };
  return (
    <Cont colors={COLORS}>
      <div className="tags-input-box mar-bottom-8">
        <form onSubmit={enterTag} className="inline-block">
          <input
            type="text"
            value={text}
            onChange={updateText}
            placeholder="milk... eggs..."
            name="products"
          />
        </form>
        {selectedTagElems}
      </div>
      <div className="tag-holder">{renderTags}</div>
      <div className="mar-bottom-8"></div>
      {renderRange < tags.length && (
        <div className="more-btn">
          <p className="bold">SHOW MORE</p>
          <FontAwesomeIcon icon={faEllipsis} className="icon-ssm" />
        </div>
      )}
    </Cont>
  );
};

export default ProductTypes;
