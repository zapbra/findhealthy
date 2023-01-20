import { useRef, useEffect } from "react";

const Dropdown = ({
  searchPlaceholder,
  search,
  searchChangeHandler,
  selectedValue,
  selectedIndex,
  changeSelectedHandler,
  regions,
  name,
}) => {
  const searchInputEl = useRef();
  const itemsEl = useRef();

  useEffect(() => {
    searchInputEl.current.focus();

    if (selectedValue) {
      itemsEl.current.scrollTop =
        itemsEl.current.querySelector(`.item-${selectedIndex}`).offsetTop - 42;
    }
  }, []);

  return (
    <div className="dropdown__menu">
      <input
        type="text"
        placeholder={searchPlaceholder ? searchPlaceholder : "Search..."}
        className="dropdown__menu_search"
        value={search}
        onChange={searchChangeHandler}
        ref={searchInputEl}
      />
      <div className="dropdown__menu_items" ref={itemsEl}>
        {regions.map((item, index) => (
          <div
            className={
              selectedValue === item
                ? `dropdown__menu_item item-${regions.indexOf(item)} selected`
                : `dropdown__menu_item item-${regions.indexOf(item)}`
            }
            key={index}
            onClick={() =>
              changeSelectedHandler(item, name, regions.indexOf(item))
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
