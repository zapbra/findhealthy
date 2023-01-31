import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .section-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .section {
    width: 100%;

    padding: 32px;
    background-color: #fff;
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.lightBeige};
    }
  }
  .product-item {
    margin-bottom: 16px;
    h5 {
      margin-right: 8px;
    }
    .product-content {
      border: 1px solid ${(props) => props.colors.grey};
      padding: 4px 8px;
      background-color: ${(props) => props.colors.lightBeige};
    }

    .price {
      background-color: #fff;
      border: 1px solid ${(props) => props.colors.grey};
    }
  }
`;

const Sections = ({
  products,
  description,
  address,
  website,
  email,
  phone,
  delivery,
  hours,
  howToOrder,
  grassFed,
  organic,
  vaccineFree,
  soyFree,
  pastureRaised,
  dewormerFree,
  unfrozen,
  pricing,
  quality,
  friendly,
}) => {
  const [productElems, setProductElems] = useState(
    products.map((product) => {
      return (
        <li className="product-item">
          <div className="flex-inline product-content">
            <h5 className="black mar-right-8">{product.name}</h5>
            <p className="price">
              ${product.price} {product.dollarType}/{product.measurement}
            </p>
          </div>
        </li>
      );
    })
  );
  return (
    <Cont colors={COLORS}>
      <section className="section">
        <div className="center-inline">
          <h3>PRODUCTS</h3>
        </div>
        <ul>{productElems}</ul>
      </section>
      <section className="section"></section>
      <section className="section"></section>
      <section className="section"></section>
    </Cont>
  );
};

export default Sections;
