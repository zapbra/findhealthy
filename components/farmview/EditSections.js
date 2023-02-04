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
  .radio-line {
    border-bottom: 1px solid ${(props) => props.colors.darkPink};
    margin-bottom: 16px;
    padding-bottom: 8px;
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
    setValue("pickup", delivery);
    setValue("grassFed", grassFed);
    setValue("organic", organic);
    setValue("vaccineFree", vaccineFree);
    setValue("pastureRaised", pastureRaised);
    setValue("soyFree", soyFree);
    setValue("dewormerFree", dewormerFree);
    setValue("unfrozen", unfrozen);
    setValue("howToOrder", howToOrder);
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

  const howToOrderRef = useRef(null);

  const focusField = (id) => {
    const elem = document.getElementById(id);
    elem.focus();
  };
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
            id="description"
            {...register("description", {
              required: false,
            })}
          ></textarea>
          <div
            onClick={() => focusField("description")}
            className="black-btn flex-inline align-center"
          >
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
            <label htmlFor="pickupAndDelivery">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  value="pickup & delivery"
                  id="pickupAndDelivery"
                />
                <p className="mar-left-4">Pickup & Delivery</p>
              </div>
            </label>

            <label htmlFor="pickupOnly">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="pickupOnly"
                  value="pickup"
                />
                <p className="mar-left-4">
                  {" "}
                  <strong>Pickup</strong> Only
                </p>
              </div>
            </label>

            <label htmlFor="deliveryOnly">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="deliveryOnly"
                  value="delivery"
                />
                <p className="mar-left-4">
                  {" "}
                  <strong>Delivery</strong> Only
                </p>
              </div>
            </label>

            <label htmlFor="unspecified">
              <div className="flex align-center">
                <input
                  {...register("pickup", {
                    required: true,
                  })}
                  type="radio"
                  id="unspecified"
                  value="unspecified"
                  defaultChecked
                />
                <p className="mar-left-4">Unspecified</p>
              </div>
            </label>
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
          <div className="selects">
            <div className="radio-line">
              <h4 className="mar-bottom-8">GRASS FED?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="grassfed-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("grassFed", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="grassfed-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="grassfed-false">
                  <div className="flex align-center">
                    <input
                      {...register("grassFed", {
                        required: false,
                      })}
                      type="radio"
                      id="grassfed-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="grassfed-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("grassFed", {
                      required: false,
                    })}
                    type="radio"
                    id="grassfed-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">ORGANIC?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="organic-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("organic", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="organic-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="pickupOnly">
                  <div className="flex align-center">
                    <input
                      {...register("organic", {
                        required: false,
                      })}
                      type="radio"
                      id="organic-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="organic-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("organic", {
                      required: false,
                    })}
                    type="radio"
                    id="organic-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">
                    {" "}
                    <p>Unspecified</p>
                  </p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">VACCINE FREE?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="vaccines-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("vaccineFree", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="vaccines-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="pickupOnly">
                  <div className="flex align-center">
                    <input
                      {...register("vaccineFree", {
                        required: false,
                      })}
                      type="radio"
                      id="vaccines-false"
                      value="false"
                    />
                    <p className="mar-left-4">
                      {" "}
                      <p>No</p>
                    </p>
                  </div>
                </label>
              </div>
              <label htmlFor="vaccines-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("vaccineFree", {
                      required: false,
                    })}
                    type="radio"
                    id="vaccines-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">PASTURE RAISED?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="pasture-raised-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("pastureRaised", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="pasture-raised-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="pickupOnly">
                  <div className="flex align-center">
                    <input
                      {...register("pastureRaised", {
                        required: false,
                      })}
                      type="radio"
                      id="pasture-raised-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="pasture-raised-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("pastureRaised", {
                      required: false,
                    })}
                    type="radio"
                    id="pasture-raised-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">SOY FREE?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="soy-free-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("soyFree", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="soy-free-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="soy-free-false">
                  <div className="flex align-center">
                    <input
                      {...register("soyFree", {
                        required: false,
                      })}
                      type="radio"
                      id="soy-free-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="soy-free-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("soyFree", {
                      required: false,
                    })}
                    type="radio"
                    id="soy-free-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">DEWORMER FREE?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="dewormers-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("dewormerFree", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="dewormers-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="dewormers-false">
                  <div className="flex align-center">
                    <input
                      {...register("dewormerFree", {
                        required: false,
                      })}
                      type="radio"
                      id="dewormers-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="dewormers-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("dewormerFree", {
                      required: false,
                    })}
                    type="radio"
                    id="dewormers-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>

            <div className="radio-line">
              <h4 className="mar-bottom-8">UNFROZEN?</h4>
              <div className="flex mar-bottom-8">
                <label htmlFor="unfrozen-true">
                  <div className="flex align-center mar-right-8">
                    <input
                      {...register("unfrozen", {
                        required: false,
                      })}
                      type="radio"
                      value="true"
                      id="unfrozen-true"
                    />
                    <p className="mar-left-4">Yes</p>
                  </div>
                </label>

                <label htmlFor="pickupOnly">
                  <div className="flex align-center">
                    <input
                      {...register("unfrozen", {
                        required: false,
                      })}
                      type="radio"
                      id="unfrozen-false"
                      value="false"
                    />
                    <p className="mar-left-4">No</p>
                  </div>
                </label>
              </div>
              <label htmlFor="unfrozen-unspecified">
                <div className="flex align-center">
                  <input
                    {...register("unfrozen", {
                      required: false,
                    })}
                    type="radio"
                    id="unfrozen-unspecified"
                    value="unspecified"
                    defaultChecked
                  />
                  <p className="mar-left-4">Unspecified</p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="star-field-holder">{starFields}</div>
      </section>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="center-inline">
          <h4 className="underline mar-bottom-16">HOW TO ORDER</h4>
        </div>
        <textarea
          type="text"
          className="description-text"
          id="howToOrder"
          name="howToOrder"
          {...register("howToOrder", {
            required: false,
          })}
        ></textarea>
        <div
          onClick={() => focusField("howToOrder")}
          className="black-btn flex-inline align-center"
        >
          <h5 className="mar-right-8">EDIT</h5>
          <FontAwesomeIcon icon={faPencil} className="icon-ssm white" />
        </div>
      </section>
    </Cont>
  );
};

export default Sections;
