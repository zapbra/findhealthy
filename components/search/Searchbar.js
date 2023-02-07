import { useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import COLORS from "../../data/colors";
import SearchTag from "./SearchTag";
import { useState, useCallback, useRef } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TagBoxElem = styled.div`
  border-radius: 0.5rem;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  
  @media only screen and (max-width: 426px) {
    width: 100%;
  }
`;

const Content = styled.div`
  .extend {
    max-height: 500px !important;
  }
`;
const TagsCont = styled.div`
  margin-top: 8px;
  
  position: relative;
  display:flex;
  flex-wrap: wrap;
`;

const FormDropdown = styled.form`
  display: flex;
  justify-content: flex-end;
  position: relative;
  
`;

const InputLine = styled.input`
  height: 2.5rem;
  width: 100%;
  margin-top: 5px;
  font-weight: bold;
  border-radius: 0.5rem !important;
  font-size: 1.25rem;
  margin-left: auto;
  outline:none;
  &:focus {
    border-radius: 0.5rem 0.5rem 0 0 !important;
    outline:none !important;
    border: 2px solid #AC3B61;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
  }
`;

const DropdownHolder = styled.div`
  position: absolute;
  width: 100%;
  top: 45px;
  @media only screen and (min-width: 600px) {
    width: calc(100% - 18px);
  }
  @media only screen and (min-width: 1201px) {
    top: 57.5px;
  }
`;

const Dropdown = styled.div`
z-index:5;
  position: relative;
  width: 100%;
  border: 1px solid black;
  max-height: 210px;
  overflow-y: scroll;
  cursor: pointer;
  .item {
    padding-left: 4px;
    background-color: #fff;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    &:hover {
      background: ${(props) => props.colors.green};
    }
  }
`;
const DropdownIcon = styled.div`
  position: relative;
  padding: 4px;
  border: 1px solid black;
  cursor: pointer;
  width: 100%;
  background: ${(props) => props.colors.darkBlue};
  transition: background-color 0.25s ease;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${(props) => props.colors.green};
    .icon-green {
      color: ${(props) => props.colors.darkBlue};
    }
  }
  .rotate {
    transform: rotate(180deg);
  }
`;
const Searchbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [extendDropdown, setExtendDropdown] = useState(false);
  const dropdownEl = useRef(null);

  const tagsText = props.tags.map((tag) => {
    return tag.name;
  });

  const lines = props.filterTags.map((tag) => {
    if (tagsText.includes(tag.name)) {
    } else {
      return (
        <div
          key={tag.id}
          onClick={() => props.removeTag(tag.id)}
          id={tag.id}
          className="item"
        >
          <p className = 'bold'>{tag.name}</p>
        </div>
      );
    }
  });
  const tags = props.tags.map((tag, index) => {
    return (
      <SearchTag
        removeSearchTag={props.removeSearchTag}
        key={nanoid()}
        id={tag.id}
        title={tag.name}
        
      />
    );
  });

  const handleClickOutside = useCallback(
    (e) => {
      if (
        showDropdown &&
        e.target.closest(".form-dropdown") !== dropdownEl.current
      ) {
        setShowDropdown(false);
      }
    },
    [showDropdown, setShowDropdown, dropdownEl, props.filterTags]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  function Focus() {
    setShowDropdown(true);
  }

  function toggleExtendDropdown() {
    setExtendDropdown((prev) => !prev);
  }

  return (
    <Content>
      <TagBoxElem colors={props.colors}>
        <TagsCont>{tags}</TagsCont>
      </TagBoxElem>
      <FormDropdown
        className="form-dropdown"
        onSubmit={props.submitSearch}
        ref={dropdownEl}
      >
        <InputLine
          onFocus={Focus}
          type="text"
          value={props.text}
          onChange={props.updateText}
          placeholder="coconut cream..."
        />
        {showDropdown && (
          <DropdownHolder>
            <Dropdown
              className={extendDropdown ? "extend" : ""}
              colors={COLORS}
            >
              {lines}
            </Dropdown>
            <DropdownIcon
              className={extendDropdown ? "extend-icon" : ""}
              onClick={toggleExtendDropdown}
              colors={props.colors}
            >
              <FontAwesomeIcon
              icon = {faChevronDown}
                className={extendDropdown ? "icon-green rotate" : "icon-green"}
              />
            </DropdownIcon>
          </DropdownHolder>
        )}
      </FormDropdown>
    </Content>
  );
};

export default Searchbar;