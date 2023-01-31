import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .section-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .section {
    width: 100%;
    display: flex;
    padding: 32px;
    background-color: #fff;
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.lightBeige};
    }
    & > div {
      flex: 1;
    }
    & > div:nth-of-type(1) {
      border-right: 1px solid ${(props) => props.colors.black};
      padding-right: 16px;
    }
    & > div:nth-of-type(2) {
      padding-left: 16px;
    }
  }
  .product-item {
    margin-bottom: 16px;
    h5 {
      margin-right: 8px;
    }
    word-break: break-word;
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
  .description-text {
    border-top: 1px solid ${(props) => props.colors.darkRed};
    border-bottom: 1px solid ${(props) => props.colors.darkRed};
    padding: 8px;
  }
  .section-line {
    border-bottom: 1px solid ${(props) => props.colors.darkGrey};
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
  .form-field-icon {
    width: 40px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.colors.darkRed};
    background-color: ${(props) => props.colors.tan};
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
  hoursFrom,
  hoursTo,
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

  const [farmFields, setFarmFields] = useState(
    [
      { name: "Grassfed", value: grassFed },
      { name: "Organic", value: organic },
      { name: "Vaccine Free", value: vaccineFree },
      { name: "Soy Free", value: soyFree },
      { name: "Pasture Raised", value: pastureRaised },
      { name: "Dewormer Free", value: dewormerFree },
      { name: "Unfrozen", value: unfrozen },
    ]
      .filter((field) => field.value != "unspecified")
      .map((field) => {
        return (
          <div className="farm-field-line">
            <h5>{field.name}</h5>
            <div className="farm-field-icon">
              <FontAwesomeIcon
                icon={field.value ? faCheck : faClose}
                className={field.value ? "icon-sm green" : "icon-sm red"}
              />
            </div>
          </div>
        );
      })
  );
  return (
    <Cont colors={COLORS} className="section-holder">
      <section className="section">
        <div>
          <div className="center-inline mar-bottom-16">
            <h3>PRODUCTS</h3>
          </div>
          <ul>{productElems}</ul>
        </div>
        <div>
          <div className="center-inline mar-bottom-16">
            <h3>DESCRIPTION</h3>
          </div>
          <div className="description-text">{description}</div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="section-line">
            <h4 className="blue">ADDRESS</h4>
            <p className="bold">{address}</p>
          </div>

          <div className="section-line">
            <h4 className="blue">WEBSITE</h4>
            <Link href={website}>
              <p className="bold">{website}</p>
            </Link>
          </div>

          <div className="section-line">
            <h4 className="blue">EMAIL</h4>
            <a href={`mailto:${email}`}>
              <p className="bold">{email}</p>
            </a>
          </div>

          <div className="section-line">
            <h4 className="blue">PHONE</h4>
            <a href={`tel:${phone}`}>
              <p className="bold">{phone}</p>
            </a>
          </div>

          <div className="section-line">
            <h4 className="blue">DELIVERY</h4>
            <p className="bold">{delivery}</p>
          </div>
        </div>
        <div>
          <div className="center-inline">
            <h3 className="blue">HOURS</h3>
            <p className="bold inline-block">{hoursFrom} - </p>{" "}
            <p className="bold inline-block"> {hoursTo}</p>
          </div>
        </div>
      </section>
      <section className="section">
        {farmFields} <p>hello s</p>
      </section>
      <section className="section"></section>
    </Cont>
  );
};

export default Sections;
