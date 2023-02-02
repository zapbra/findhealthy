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
    .lg-spacer
        <section className="food-section">
        <div className="food-title">
          <h2>WORLDWIDE</h2>
        </div>
        </section>
    </Cont>
  )
}

export default Suppliers