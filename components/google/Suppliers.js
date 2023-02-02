import styled from "styled-components";
import COLORS from "../../data/colors";
import SupplierBox from "./SupplierBox";
const Cont = styled.div`
 overflow-x: hidden;
 overflow-y: hidden;
  padding-top:120px;
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
        </section>
    </Cont>
  )
}

export default Suppliers