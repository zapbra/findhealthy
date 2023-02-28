import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import NutrientLine from "./NutrientLine";
import MacroLine from './MacroLine';
import NutrientTopSection from "./NutrientTopSection";

const Cont = styled.div`
  max-width: 400px;
  margin: 0 auto;
  .nutrient-holder {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 8px;
    padding: 8px;
  }
  .nutrient-title {
    background-color: ${(props) => props.colors.offWhite};
    padding: 2px 4px;
    border-bottom: 1px solid ${(props) => props.colors.black};
  }
`;
const index = ({ fish, allFish }) => {
  const [nutrients, setNutrients] = useState(fish.nutrients_id);

  return (
    <Cont colors={COLORS}>
      <div className="center-inline">
      <h5 className="blue mar-bottom-32">Nutrition Facts</h5>
      </div>
      <NutrientTopSection name = {fish.name} allFish = {allFish} fish = {fish} />
      <div className="nutrient-holder">
        <div className="nutrient-title">
          <p className="bold">Vitamins</p>
          </div>
          <NutrientLine
            name="Vitamin A"
            units={nutrients.vitamin_a_units}
            dv={nutrients.vitamin_a_daily_value}
          />
          <NutrientLine
            name="Vitamin C"
            units={nutrients.vitamin_c_units}
            dv={nutrients.vitamin_c_daily_value}
          />
          <NutrientLine
            name="Vitamin D"
            units={nutrients.vitamin_c_units}
            dv={nutrients.vitamin_c_daily_value}
          />
          <NutrientLine
            name="Vitamin E"
            units={nutrients.vitamin_e_units}
            dv={nutrients.vitamin_e_daily_value}
          />
          <NutrientLine
            name="Vitamin K"
            units={nutrients.vitamin_k_units}
            dv={nutrients.vitamin_k_daily_value}
          />
          <NutrientLine
            name="Thiamin"
            units={nutrients.thiamin_units}
            dv={nutrients.thiamin_daily_value}
          />
          <NutrientLine
            name="Niacin"
            units={nutrients.niacin_units}
            dv={nutrients.niacin_daily_value}
          />
          <NutrientLine
            name="Vitamin B6"
            units={nutrients.vitamin_b6_units}
            dv={nutrients.vitamin_b6_daily_value}
          />
          <NutrientLine
            name="Folate"
            units={nutrients.folate_units}
            dv={nutrients.folate_daily_value}
          />
          <NutrientLine
            name="Vitamin B12"
            units={nutrients.vitamin_b12_units}
            dv={nutrients.vitamin_b12_daily_value}
          />
          <NutrientLine
            name="Pantothenic Acid"
            units={nutrients.pantothenic_acid_units}
            dv={nutrients.pantothenic_acid_daily_value}
          />
          <NutrientLine
            name="Choline"
            units={nutrients.choline_units}
            dv={nutrients.choline_daily_value}
          />
          <NutrientLine
            name="Calcium"
            units={nutrients.calcium_units}
            dv={nutrients.calcium_daily_value}
          />
         <div className="mar-bottom-32"></div>
         <div className="nutrient-title">
          <p className="bold">Minerals</p>
          </div>

          <NutrientLine
            name="Iron"
            units={nutrients.iron_units}
            dv={nutrients.iron_daily_value}
          />
          <NutrientLine
            name="Magnesium"
            units={nutrients.magnesium_units}
            dv={nutrients.magnesium_daily_value}
          />
          <NutrientLine
            name="Phosphorus"
            units={nutrients.phosphorus_units}
            dv={nutrients.phosphorus_daily_value}
          />
          <NutrientLine
            name="Potassium"
            units={nutrients.potassium_units}
            dv={nutrients.potassium_daily_value}
          />
          <NutrientLine
            name="Sodium"
            units={nutrients.sodium_units}
            dv={nutrients.sodium_daily_value}
          />
          <NutrientLine
            name="Zinc"
            units={nutrients.zinc_units}
            dv={nutrients.zinc_daily_value}
          />
          <NutrientLine
            name="Copper"
            units={nutrients.copper_units}
            dv={nutrients.copper_daily_value}
          />
          <NutrientLine
            name="Manganese"
            units={nutrients.manganese_units}
            dv={nutrients.manganese_daily_value}
          />
          <NutrientLine
            name="Selenium"
            units={nutrients.selenium_units}
            dv={nutrients.selenium_daily_value}
          />
          <NutrientLine
            name="Cholesterol"
            units={nutrients.cholesterol_units}
            dv={nutrients.cholesterol_daily_value}
          />
          <div className="mar-bottom-32"></div>
          <div className="nutrient-title">

          <p className="bold">Macronutrients</p>
          </div>
          <MacroLine
          name = 'Protein'
          units = {nutrients.protein} grams = {true} />

          <MacroLine 
          name = 'Carbohydrates'
          units = {nutrients.carbs}
          grams = {true}
          />

<div className="mar-bottom-32"></div>
         <div className="nutrient-title">
          <p className="bold">Fatty Acids</p>
          </div>
        <MacroLine
        name = 'Total Fat'
        units = {nutrients.fat}grams = {true}
        />
        <MacroLine
        name = 'Saturated Fat'
        units = {nutrients.saturated_fat}grams = {true}
        />
        <MacroLine
        name = 'Monounsaturated Fat'
        units = {nutrients.monounsaturated_fat}grams = {true}
        />
         <MacroLine
        name = 'Polyunsaturated_fat Fat'
        units = {nutrients.polyunsaturated_fat}
        grams = {true}
        />
          <MacroLine
            name="Omega 6"
            units={nutrients.omega6_units}
            
          />

<MacroLine
            name="Omega 3"
            units={nutrients.omega3_units}
            
          />
         
        
      </div>
    </Cont>
  );
};

export default index;
