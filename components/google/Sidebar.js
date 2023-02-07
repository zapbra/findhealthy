import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.form`
  background-color: ${(props) => props.colors.tan};
  width: 300px;
  height: 100%;
  padding: 8px;
  .radius-content {
    & > div {
      background-color: ${(props) => props.colors.tan};
      border: 1px solid ${(props) => props.colors.darkPink};
      padding: 4px 8px;
    }
  }
  .radius-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Sidebar = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const submitForm = handleSubmit(async (formData) => {});
  return (
    <Cont colors={COLORS} onSubmit={submitForm}>
      <div className="center-inline">
        <h4>FILTERS</h4>
      </div>
      <div className="input-line">
        <h4 className="text-shadow-red">Location</h4>

        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          placeholder="900 Bank St..."
          name="name"
        />
        {errors.name?.type === "required" && (
          <p className="error">*Name is required</p>
        )}
      </div>
      <div className="input-line">
        <div className="radius-content">
          <div className="radius-header flex">
            <h4 className="text-shadow-red">Radius</h4>
            <FontAwesomeIcon icon={faChevronDown} className="red icon-ssm" />
          </div>
          <div className="input-line flex flex-wrap">
            <label htmlFor="5km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  value="5"
                  id="5km"
                  defaultChecked
                />
                <p className="mar-left-4">5km</p>
              </div>
            </label>

            <label htmlFor="10km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  id="10km"
                  value="10"
                />
                <p className="mar-left-4">10km</p>
              </div>
            </label>

            <label htmlFor="25km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  id="25km"
                  value="25"
                />
                <p className="mar-left-4">25km</p>
              </div>
            </label>

            <label htmlFor="50km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  id="50km"
                  value="50"
                />
                <p className="mar-left-4">50km</p>
              </div>
            </label>

            <label htmlFor="100km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  id="100km"
                  value="100"
                />
                <p className="mar-left-4">100km</p>
              </div>
            </label>

            <label htmlFor="200km">
              <div className="flex align-center mar-right-8">
                <input
                  {...register("radius", {
                    required: true,
                  })}
                  type="radio"
                  id="200km"
                  value="200"
                />
                <p className="mar-left-4">200km</p>
              </div>
            </label>
            <label htmlFor="radiusText">
              <p className="red bold inline-block">Other</p>
              <div className="flex align-center">
                <input
                  {...register("radiusText", {
                    required: true,
                  })}
                  type="text"
                  placeholder="40..."
                  name="radiusText"
                  id="radiusText"
                  className="mar-right-4"
                />
                <p className="bold red inline-block">km</p>
              </div>
            </label>
          </div>
        </div>

        <div className="input-line">
          <h4 className="text-shadow-red">Location</h4>

          <input
            {...register("name", {
              required: true,
            })}
            type="text"
            placeholder="900 Bank St..."
            name="name"
          />
          {errors.name?.type === "required" && (
            <p className="error">*Name is required</p>
          )}
        </div>
      </div>
    </Cont>
  );
};

export default Sidebar;
