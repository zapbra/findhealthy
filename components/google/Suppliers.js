import styled from "styled-components";
import COLORS from "../../data/colors";
import SupplierBox from "./SupplierBox";
const Cont = styled.div`
    .title-spec{
        background-color: ${props=>props.colors.tan};
        position: relative;
       z-index:5000;
    }
    .slanted-bg{
        background-color: ${props=>props.colors.tan};
        height:200px;
        width:100%;
        position: absolte;
        top: calc(-100px); 
        z-index:-1;

        transform: rotate(5deg);
    }
`;
const Suppliers = () => {
  return (
    <Cont colors = {COLORS}>
        <div className="title-spec center-inline">
        <h2>POPULAR FOOD SUPPLIERS!</h2>
        <div className="slanted-bg">

        </div>
        </div>
    </Cont>
  )
}

export default Suppliers