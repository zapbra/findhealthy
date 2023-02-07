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
  const [renderTags, setRenderTags] = useState([]);
  const pushTagFunctional = (tag) => {
    pushTag(tag);
    setText("");
  };

  useEffect(() => {
    setCopyTags((prev) => {
      return tags.filter((tag) => tag.includes(text));
    });
  }, [tags]);

  useEffect(() => {
    let renderArticleElems = [];
    if (copyTags.length >= 10) {
      for (let i = 0; i < renderRange - selectedTags.length; i++) {
        renderArticleElems.push(
          <Tag key={i} text={copyTags[i]} pushTag={pushTagFunctional} />
        );
      }
    } else {
      for (let i = 0; i < copyTags.length; i++) {
        renderArticleElems.push(
          <Tag key={i} text={copyTags[i]} pushTag={pushTagFunctional} />
        );
      }
    }
    setRenderTags(renderArticleElems);
  }, [copyTags, renderRange]);
  const selectedTagElems = selectedTags.map((tag, index) => {
    return <SelectedTag key={index} text={tag} deleteTag={deleteTag} />;
  });

  const increaseRenderRange = () => {
    setRenderRange((prev) => {
      if (prev + 10 > tags.length) {
        return tags.length;
      }
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
        <div onClick={increaseRenderRange} className=" align-center blue-btn-one flex-inline">
          <p className="bold mar-right-8">SHOW MORE</p>
          <FontAwesomeIcon icon={faEllipsis} className="icon-ssm white" />
        </div>
      )}
    </Cont>
  );
};

export default ProductTypes;
