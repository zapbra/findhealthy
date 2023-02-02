import styled from "styled-components";
import COLORS from "../../data/colors";
import SupplierBox from "./SupplierBox";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Cont = styled.div`
 overflow-x: hidden;
 overflow-y: hidden;
  padding-top:120px;
 
  @media only screen and (min-width:900px){
    .supplier-box:nth-of-type(3n){
    flex-direction: row-reverse;
  }
  
  }
  @media only screen and (min-width:1200px){
    padding-top:200px;
  }
    .title-spec{
        background-color: ${props=>props.colors.tan};
        position: relative;
       z-index:5000;
       
    }
    .slanted-bg{
      
        background-color: ${props=>props.colors.tan};
        height:200px;
        width:100%;
        position: absolute;
        top: calc(-100px + 50%); 
        z-index:-1;
      width:120%;
      left:-10%;
      
        transform: rotate(5deg);
        @media only screen and (min-width:1200px){
          height: 320px;
          top: calc(-160px + 50%); 
        }
    }
    section{
      .food-title{
        text-align: center;
        border-bottom: 2px solid ${props=>props.colors.darkPink};
        padding: 16px;
        margin-bottom: 80px;
        box-shadow: rgba(38, 57, 77,.5) 0px 30px 30px -10px;
      }
    }
`;
const Suppliers = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Cont colors = {COLORS}>
        <div className="title-spec center-inline">
        <h2 className>POPULAR FOOD SUPPLIERS!</h2>
        <div className="slanted-bg box-shadow">

        </div>
        </div>
    <div className="lg-spacer"></div>
        <section className="food-section">
        <div className="food-title">
          <h2>WORLDWIDE</h2>
        </div>
        <SupplierBox 
        links = {['https://www.healthfully.shop/', 'https://www.instagram.com/healthfully.shop/?hl=en' ]}
        pros = {['Multiple kinds of raw unsalted cheese shipping worldwide', 'Unsalted raw butter, only ships inside Eurozone', 'Very high quality (never tried it myself)', 'Good reputation in primal community (not a scammer like @primalproductsstore on instagram' ]}
        cons = {["Rather expensive: shipping costs are somewhat high (depending where you live, and it's not their fault) and long weight (2 months approx)"]}
        image = {'/images/healthfully.PNG'}
        country = 'EUROPE'
        name = 'HEALTHFULLY.SHOP'
        />

<SupplierBox 
        links = {['https://turcamart.com/products/raw-milk-unsalted-butter-3-5-lbs-suitable-for-primal-diet-by-vonderplanitz/', 'https://www.ebay.com/itm/303826459654' ]}
        pros = {['3.5 lbs butter for $79.90 USD', 'Raw butter, raw cream, raw cheese', 'Worldwide shipping (free)',  ]}
        cons = {["I have ordered this, it used to be better. They recently changed suppliers and the butter is now white (used to be yellow) and I don’t notice a benefit, so I stopped ordering. Let me know if you have a different experience","Not too expensive if it’s your only option, but if you get hit with duties it’s expensive"]}
        image = {'/images/turcamart.PNG'}
        country = 'TURKEY'
        name = 'TURCAMART'
        />
        </section>

        <section className="food-section">
        <div className="food-title">
          <h2>UNITED STATES</h2>
        </div>
        <SupplierBox 
        links = {['https://grasslandbeef.com/', 'https://www.instagram.com/uswellnessmeats/?hl=en' ]}
        pros = {['Grass fed meats, bone marrow, raw cheese', 'Shipping across US', 'Very high quality (never tried it myself)', 'Reasonable Prices' ]}
        cons = {["They used to deliver to Canada, but no longer do"]}
        image = {'/images/uswellness.PNG'}
        country = 'MISSOURI'
        name = 'US WELLNESS MEATS'
        />

<SupplierBox 
        links = {['https://amosmillerorganicfarm.com/', null ]}
        pros = {['Raw milk, raw butter, raw unsalted cheese', 'Glands: brain, testicles, etc', 'Dairy seems to be pretty cheap',  ]}
        cons = {["Can be expensive depending on where you live", "Expensive shipping", "Meats frozen"]}
        image = {'/images/amosMillers.PNG'}
        country = 'PENNSYLVANIA'
        name = 'AMOS MILLERS'
        />
        <SupplierBox 
        links = {['https://www.swissvillallc.com/', null ]}
        pros = {['Raw unsalted cheese that tastes very good and fatty', 'Shipping across US', 'Reasonable prices and bulk prices', 'Raw milk'  ]}
        cons = {["Milk only ships to Pennsylvania", "Expensive shipping", "Their butter and some of their dairy is pastuerized"]}
        image = {'/images/swissVilla.PNG'}
        country = 'PENNSYLVANIA'
        name = 'SWISS VILLA'
        />
        </section>
    
        <section className="food-section">
        <div className="food-title">
          <h2>CANADA</h2>
        </div>
        <SupplierBox 
        links = {['https://wildmeadowsfarm.ca/', 'https://www.instagram.com/wildmeadowsfarm_ontario/' ]}
        pros = {['All grass fed/finished high quality', 'Soy free chicken and pork', 'Soy free eggs', 'Bison, lamb', 'Bone marrow','Organs', 'Free shipping with $250+ order','Trustworthy and active on social media']}
        cons = {["Sourced from multiple farms, but I think they have strict practices", "Certain products are only available in Toronto", "Meat is frozen"]}
        image = {'/images/wildMeadowsFarm.PNG'}
        country = 'ONTARIO'
        name = 'WILD MEADOWS FARM'
        />

<SupplierBox 
        links = {['https://blossompure.com/', 'https://www.instagram.com/blossompureorg/?hl=en' ]}
        pros = {['All grass fed/finished/organic and high quality', 'Bone marrow', 'Organs', 'Trustworthy and active on social media'  ]}
        cons = {["Meat is frozen", "Certain products Expensive",]}
        image = {'/images/blossompure.PNG'}
        country = 'ONTARIO'
        name = 'BLOSSOMPURE ORGANIC'
        />
        </section>
    </Cont>
  )
}

export default Suppliers