import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faStar } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(300px, 1fr);
  @media only screen and (max-width: 900px) {
    grid-template-rows: repeat(4, minmax(300px, 1fr));
    grid-template-columns: 1fr;
    & > section:nth-of-type(3) {
      background: #fff !important;
    }
    & > section:nth-of-type(4) {
      background: ${(props) => props.colors.lightBeige} !important;
    }
  }
  .reverse {
    grid-column: 1;
    grid-row: 2;
  }
  section {
    padding: 32px;
    @media only screen and (max-width:460px){
      padding: 16px;
    }
  }
  .section {
    width: 100%;
    display: flex;

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
    @media only screen and (max-width:460px) {
      flex-direction: column;
      & > div:nth-of-type(1) {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid ${(props) => props.colors.black};
        padding-bottom: 32px;
    }
    & > div:nth-of-type(2) {
      padding-left: 0;
      padding-top: 32px;
    }
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
      flex-wrap: wrap;
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
  .farm-field-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .farm-field-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    max-width: 240px;
  }

  .farm-field-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: inline-flex;

    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: ${(props) => props.colors.tan};
  }
  .star-field-holder {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
  }
  .star-field {
    display: flex;
    flex-direction: column;

    align-items: center;
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: #fff;
    padding: 8px;
    margin-bottom: 32px;
    .star-holder {
      display: flex;
      padding: 4px;
      border: 1px solid ${(props) => props.colors.darkPink};
      .star {
        margin-right: 2px;
        margin-left: 2px;
      }
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
                icon={field.value == "true" ? faCheck : faClose}
                className={
                  field.value == "true" ? "icon-sm green" : "icon-sm light-red"
                }
              />
            </div>
          </div>
        );
      })
  );

  const [starFields, setStarFields] = useState(
    [
      { name: "Pricing", value: pricing },
      { name: "Quality", value: quality },
      { name: "Friendly", value: friendly },
    ].map((field) => {
      return (
        <div className="star-field">
          <h4>{field.name}</h4>
          <div className="star-holder">
            {[1, 2, 3, 4, 5].map((index) => {
              return (
                <FontAwesomeIcon
                  icon={faStar}
                  className={
                    index <= field.value ? "icon-ssm yellow" : "icon-ssm grey"
                  }
                />
              );
            })}
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
            <h4>PRODUCTS</h4>
          </div>
          <ul>{productElems}</ul>
        </div>
        <div>
          <div className="center-inline mar-bottom-16">
            <h4>DESCRIPTION</h4>
          </div>
          <div className="description-text">{description}</div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="section-line">
            <h5 className="blue">ADDRESS</h5>
            <p className="bold">{address}</p>
          </div>

          <div className="section-line">
            <h5 className="blue">WEBSITE</h5>
            <Link href={website}>
              <p className="bold">{website}</p>
            </Link>
          </div>

          <div className="section-line">
            <h5 className="blue">EMAIL</h5>
            <a href={`mailto:${email}`}>
              <p className="bold">{email}</p>
            </a>
          </div>

          <div className="section-line">
            <h5 className="blue">PHONE</h5>
            <a href={`tel:${phone}`}>
              <p className="bold">{phone}</p>
            </a>
          </div>

          <div className="section-line">
            <h5 className="blue">DELIVERY</h5>
            <p className="bold">{delivery}</p>
          </div>
        </div>
        <div>
          <div className="center-inline">
            <h4 className="blue">HOURS</h4>
            <p className="bold inline-block">{hoursFrom} - </p>{" "}
            <p className="bold inline-block"> {hoursTo}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ backgroundColor: "#EEE2DC" }}>
        <div className="farm-field-holder">{farmFields}</div>
        <div className="star-field-holder">{starFields}</div>
      </section>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="center-inline">
          <h4 className="underline mar-bottom-16">HOW TO ORDER</h4>
        </div>
        <p>{howToOrder}</p>
      </section>
    </Cont>
  );
};

export default Sections;
