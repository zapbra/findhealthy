import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import TagNotification from "../popups/TagNotification";
const Cont = styled.div`
  position: relative;
  .title {
    background-color: #fff;
    padding: 8px;
    text-align: center;
    border: 1px solid ${(props) => props.colors.darkPink};
    border-bottom: 4px solid ${(props) => props.colors.darkPink};
  }
  form {
    width: 100%;
  }
  input {
    width: 100%;
    font-weight: 600;
    &:focus {
      outline: none;
    }
  }
  .tags-input-box {
    display: flex;
    align-items: center;
    padding: 0px 8px 0px 8px;

    margin-bottom: 8px;
    &:focus-within {
      background: #fff;
      outline: 3px solid ${(props) => props.colors.darkPink};
    }
  }

  .delete-input {
    width: 24px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: ${(props) => props.colors.tan};
    }
  }
  .tag-display {
    border: 1px solid black;
    background-color: ${(props) => props.colors.grey};
    padding: 8px;
  }
  .title-spec {
    .red {
      top: 0;
      transform: scale(1);
      position: relative;
      transition: top 0.5s ease, transform 0.5s ease;
    }
    &:hover {
      background: rgb(238, 226, 220);
      background: linear-gradient(
        90deg,
        rgba(238, 226, 220, 1) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(238, 226, 220, 1) 100%
      );
      .red {
        top: 6px;
        transform: scale(1.1);
      }
    }
  }
`;
const CreateTag = ({ addTag, tags }) => {
  const [text, setText] = useState("");
  const [renderTags, setRenderTags] = useState([]);
  const updateText = (e) => {
    setText(e.target.value.toLowerCase());

    setRenderTags((prev) => {
      return tags.filter((tag) => tag.includes(e.target.value));
    });
  };
  useEffect(() => {
    setRenderTags(tags);
  }, [tags]);

  const findClosestMatch = () => {
    const currentMatch = { variable: "", words: 0 };
    tags.forEach((tag) => {
      if (tag[0] === text[0]) {
        let tagSplit = tag.split("");
        let textSplit = text.split("");
        const matches = [];
        textSplit.forEach((letter) => {
          let index = tagSplit.findIndex((tagLetter) => {
            return tagLetter === letter;
          });
          if (index !== -1) {
            console.log(tagSplit[index]);
            matches.push(tagSplit.slice(index, 1));
          }
        });

        if (matches.length > currentMatch.words) {
          currentMatch.variable = tag;
          currentMatch.words = matches.length;
          console.log(matches);
        }
      }
    });
    console.log(currentMatch);
    setShowNotification(true);
    setTagText(currentMatch.variable);
  };
  const addTagFunctional = async () => {
    // check if tag exists
    if (renderTags.some((tag) => tag === text)) {
      toast.error("Tag already exists");
      const preTag = document.getElementById(text);
      preTag.classList.add("red-anim");
      setTimeout(() => {
        preTag.classList.remove("red-anim");
      }, 1000);
    }
    // check if word is valid in dictionary

    //create tag
    if (renderTags.length === 0) {
      addTag(text);
      setText("");
      toast.success("Tag created!");
      setRenderTags((prev) => {
        return tags.filter((tag) => tag.includes(""));
      });
    } else {
      findClosestMatch();
    }

    //addTag(text);
    //setText("");
    //toast.success("Tag created!");
  };
  const tagElems = renderTags.map((tag, index) => (
    <p key={index} id={tag} className="tag-two">
      {tag}
    </p>
  ));
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState("0px");
  const content = useRef(null);
  const toggleVisibility = () => {
    setHeight(visible ? "0px" : `${content.current.scrollHeight}px`);
    setVisible((prev) => {
      return !prev;
    });
  };

  const inputRef = useRef(null);
  const enterTag = (e) => {
    e.preventDefault();
    addTagFunctional();
  };

  const [showNotification, setShowNotification] = useState(false);

  const hideNotificaton = () => {
    setShowNotification((prev) => {
      return !prev;
    });
    addTag(text);
    setText("");
    toast.success("Tag created!");
  };

  const runFunction = () => {
    setShowNotification((prev) => {
      return !prev;
    });
    toast.error("Tag already exists!");
    setText("");
    setRenderTags((prev) => {
      return tags.filter((tag) => tag.includes(""));
    });
  };

  const [tagText, setTagText] = useState("");
  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      <Toaster />
      <div
        onClick={toggleVisibility}
        className="title-spec cursor title mar-bottom-16"
      >
        <h5>CREATE NEW TAG</h5>
        <FontAwesomeIcon
          style={{ transform: visible ? "rotate(180deg)" : "rotate(0deg)" }}
          icon={faChevronDown}
          className="icon-sm red"
        />
      </div>
      {showNotification && (
        <TagNotification
          tagText={tagText}
          hideNotification={hideNotificaton}
          runFunction={runFunction}
        />
      )}

      <div
        style={{ height: height }}
        className="accordion-content"
        ref={content}
      >
        <div className="tags-input-box">
          <form onSubmit={enterTag}>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={updateText}
            />
          </form>
          {text !== "" && (
            <div className="delete-input cursor" onClick={() => setText("")}>
              <FontAwesomeIcon icon={faClose} className="icon-ssm " />
            </div>
          )}
        </div>
        <div className="flex align-start ">
          <div onClick={addTagFunctional} className=" mar-right-8 blue-btn-one">
            <h5>CREATE</h5>
          </div>
          <div className="tag-display">{tagElems}</div>
        </div>
      </div>
    </Cont>
  );
};

export default CreateTag;
