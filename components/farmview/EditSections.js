import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import {
  faCheck,
  faClose,
  faStar,
  faCircleXmark,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const Cont = styled.form`
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
    @media only screen and (max-width: 460px) {
      padding: 16px;
    }
  }
  .section {
    width: 100%;
    display: flex;
    height: 100%;

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
    @media only screen and (max-width: 460px) {
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
    word-break: break-word;
  }
  .farm-field-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  .product-item {
    .icon-sm {
      &:hover {
        color: ${(props) => props.colors.darkGrey} !important;
      }
    }
  }
  textarea {
    height: 300px;
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
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("description", description);
    setValue("address", address);
    setValue("website", website);
    setValue("email", email);
    setValue("phone", phone);
  }, []);
  const [productElems, setProductElems] = useState(
    products.map((product, index) => {
      return (
        <li key={index} className="product-item">
          <div className="flex-inline product-content align-center">
            <h5 className="black mar-right-8">{product.name}</h5>
            <p className="price mar-right-8">
              ${product.price} {product.dollarType}/{product.measurement}
            </p>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="icon-sm black cursor"
            />
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
      .map((field, index) => {
        return (
          <div key={index} className="farm-field-line">
            <h5>{field.name}</h5>
            <div className="farm-field-icon mar-left-16">
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
    ].map((field, index) => {
      return (
        <div key={index} className="star-field">
          <h4>{field.name}</h4>
          <div className="star-holder">
            {[1, 2, 3, 4, 5].map((index, realIndex) => {
              return (
                <FontAwesomeIcon
                  key={realIndex}
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

  const descriptionRef = useRef(null);
  console.log(descriptionRef);
  useEffect(() => {
    console.log(descriptionRef);
  }, [descriptionRef]);
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
          <textarea
            type="text"
            className="description-text"
            name="description"
            {...register("description", {
              required: false,
            })}
          ></textarea>
          <div className="black-btn flex-inline align-center">
            <h5 className="mar-right-8">EDIT</h5>
            <FontAwesomeIcon icon={faPencil} className="icon-ssm white" />
          </div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="section-line">
            <h5 className="blue">ADDRESS</h5>
            <input
              name="address"
              type="text"
              {...register("address", {
                required: false,
              })}
            />
          </div>

          <div className="section-line">
            <h5 className="blue">WEBSITE</h5>
            <input
              name="website"
              type="text"
              {...register("website", {
                required: false,
              })}
            />
          </div>

          <div className="section-line">
            <h5 className="blue">EMAIL</h5>
            <input
              name="email"
              type="text"
              {...register("email", {
                required: false,
              })}
            />
          </div>

          <div className="section-line">
            <h5 className="blue">PHONE</h5>
            <input
              name="phone"
              type="text"
              {...register("phone", {
                required: false,
              })}
            />
          </div>

          <div className="section-line">
            <h5 className="blue">DELIVERY</h5>
            <p className="bold">{delivery}</p>
          </div>
        </div>
        <div>
          <div className="center-inline">
            <h4 className="blue">HOURS</h4>
            <p className="bold inline-block">{hoursFrom}</p>{" "}
            <p className="bold inline-block">{hoursTo}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ backgroundColor: "#EEE2DC" }}>
        <div className="farm-field-holder">
          <div>{farmFields}</div>
        </div>
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
