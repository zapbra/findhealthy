import styled from "styled-components";
import { useState, useEffect } from "react";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
import {
  createFish,
  createNutrients,
  createFood,
} from "../utils/supabaseFunctions";
const Cont = styled.div``;

const fields = {
  "Vitamin A": "vitamin_a",
  "Vitamin C": "vitamin_c",
  "Vitamin D": "vitamin_d",
  "Vitamin E (Alpha Tocopherol)": "vitamin_e",
  "Vitamin K": "vitamin_k",
  Thiamin: "thiamin",
  Riboflavin: "riboflavin",
  Niacin: "niacin",
  "Vitamin B6": "vitamin_b6",
  Folate: "folate",
  "Vitamin B12": "vitamin_b12",
  "Pantothenic Acid": "pantothenic_acid",
  Choline: "choline",
  Calcium: "calcium",
  Iron: "iron",
  Magnesium: "magnesium",
  Phosphorus: "phosphorus",
  Potassium: "potassium",
  Sodium: "sodium",
  Zinc: "zinc",
  Copper: "copper",
  Manganese: "manganese",
  Selenium: "selenium",
  Cholesterol: "cholesterol",
  "Total Omega-3 fatty acids": "omega3",
  "Total Omega-6 fatty acids": "omega6",
};
const fishName = "Lamb, variety meats and by-products, lungs";
const grams = 113;
const measurement = "4 oz";
const protein = 23;

const food_category_id = 5;
const obj =
  "Vitamin A101IU2% Vitamin C35.0mg58% Vitamin D~ ~ Vitamin E (Alpha Tocopherol)~ ~ Vitamin K~ ~ Thiamin0.1mg4% Riboflavin0.3mg16% Niacin4.7mg23% Vitamin B60.1mg6% Folate13.6mcg3% Vitamin B124.4mcg74% Pantothenic Acid~ ~ Choline~ Calcium11.3mg1% Iron7.2mg40% Magnesium15.8mg4% Phosphorus247mg25% Potassium269mg8% Sodium177mg7% Zinc2.0mg14% Copper0.3mg14% Manganese0.0mg1% Selenium20.0mcg29% Cholesterol~ ~ Total Omega-3 fatty acids~ Total Omega-6 fatty acids~";
let sugarsX =
  "Total Carbohydrate0.0g0% Dietary Fiber0.0g0% Starch0.0g Sugars0.0g";
sugarsX = sugarsX.replace(/(~ ~|~)/g, "0.0g");
const fats =
  "Total Fat2.9g5% Saturated Fat1.0g5% Monounsaturated Fat0.8g Polyunsaturated Fat0.4g";

const testing = () => {
  const splitAndInsert = async () => {
    let sugarSplit = sugarsX.split(/g[\d+%]?/);
    let carbs = sugarSplit[0].match(/\d+?\.?\d+?/)[0];
    let fiber = sugarSplit[1].match(/\d+?\.?\d+?/)[0];
    let starch = sugarSplit[2].match(/\d+?\.?\d+?/)[0];
    let sugars = sugarSplit[4].match(/\d+?\.?\d+?/)[0];
    sugarSplit = sugarSplit.map((item) => item.replace("%", ""));
    let split = fats.split(/g[\d+%]?/);
    split = split.map((item) => item.replace("%", ""));

    let totalFat = split[0].match(/\d+?\.?\d+?/)[0];
    let saturatedFat = split[1].match(/\d+?\.?\d+?/)[0];
    let monounsaturatedFat = split[2].match(/\d+?\.?\d+?/)[0];
    let polyunsaturatedFat = split[3].match(/\d+?\.?\d+?/)[0];
    polyunsaturatedFat = Number(polyunsaturatedFat);
    monounsaturatedFat = Number(monounsaturatedFat);
    saturatedFat = Number(saturatedFat);
    totalFat = Number(totalFat);

    const objectHolder = {};
    // split based on these symbols
    let items = obj.split(/(%|~ ~|~)/);

    // this deals with last the lines, omega 3s because they are different
    let spliceItems = items.splice(items.length - 1, 1);
    spliceItems = spliceItems[0].split("mg ");
    spliceItems[0] += "mg";
    items = [...items, ...spliceItems];

    // the split keeps these symbols as arrays, so remove them
    items = items.filter((item) => {
      return item !== "%" && item !== "~ ~" && item !== "~";
    });
    let spliceCalcium = items.splice(12, 1)[0];
    spliceCalcium = spliceCalcium.trim().split(" ");

    items.splice(12, 0, ...spliceCalcium);
    console.log(items);
    // for every field because it's the same length as the array we just made

    const objects = Object.entries(fields).map(([key, val], index) => {
      const field = val;

      // remove the key. Ex. Selenium

      let values = items[index].replace(key, "");

      let mg, dv;
      // if the nutrient field is empty, set the values to null
      if (values == " " || values == "") {
        mg = null;
        dv = null;
      } else {
        console.log(values);
        console.log(key);
        mg = values.match(/\d*\.?\d*(mg|mcg|IU)/)[0];
        dv = values.replace(mg, "");
        dv = dv.replace(" ", "");
        if (dv == "") {
          dv = null;
        }
      }
      // create return object
      const returnObject = { name: val, units: mg, daily_value: dv };
      // set return object as main object property
      objectHolder[val] = returnObject;
      return returnObject;
    });
    console.log(objectHolder);

    const nutrients = await createNutrients(
      objectHolder.vitamin_a.daily_value,
      objectHolder.vitamin_a.units,
      objectHolder.vitamin_c.daily_value,
      objectHolder.vitamin_c.units,
      objectHolder.vitamin_d.daily_value,
      objectHolder.vitamin_d.units,
      objectHolder.vitamin_e.daily_value,
      objectHolder.vitamin_e.units,
      objectHolder.vitamin_k.daily_value,
      objectHolder.vitamin_k.units,
      objectHolder.thiamin.daily_value,
      objectHolder.thiamin.units,
      objectHolder.niacin.daily_value,
      objectHolder.niacin.units,
      objectHolder.vitamin_b6.daily_value,
      objectHolder.vitamin_b6.units,
      objectHolder.folate.daily_value,
      objectHolder.folate.units,
      objectHolder.vitamin_b12.daily_value,
      objectHolder.vitamin_b12.units,
      objectHolder.pantothenic_acid.daily_value,
      objectHolder.pantothenic_acid.units,
      objectHolder.choline.daily_value,
      objectHolder.choline.units,
      objectHolder.calcium.daily_value,
      objectHolder.calcium.units,
      objectHolder.iron.daily_value,
      objectHolder.iron.units,
      objectHolder.magnesium.daily_value,
      objectHolder.magnesium.units,
      objectHolder.phosphorus.daily_value,
      objectHolder.phosphorus.units,
      objectHolder.potassium.daily_value,
      objectHolder.potassium.units,
      objectHolder.sodium.daily_value,
      objectHolder.sodium.units,
      objectHolder.zinc.daily_value,
      objectHolder.zinc.units,
      objectHolder.copper.daily_value,
      objectHolder.copper.units,
      objectHolder.manganese.daily_value,
      objectHolder.manganese.units,
      objectHolder.selenium.daily_value,
      objectHolder.selenium.units,
      objectHolder.cholesterol.daily_value,
      objectHolder.cholesterol.units,
      objectHolder.omega3.units,
      objectHolder.omega6.units,
      protein,
      carbs,
      totalFat,
      polyunsaturatedFat,
      saturatedFat,
      monounsaturatedFat,
      grams,
      fiber,
      starch,
      sugars
    );
    console.log(nutrients);
    //const fish = await createFish(fishName, nutrients[0].id);
    const food = await createFood(
      fishName,
      nutrients[0].id,
      food_category_id,
      measurement
    );
    console.log(food);
  };

  return (
    <Cont colors={COLORS}>
      <div onClick={splitAndInsert} style={{ border: "1px solid black" }}>
        <h2>Run me</h2>
      </div>
    </Cont>
  );
};

export default testing;
