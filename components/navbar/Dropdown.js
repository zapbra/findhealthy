import styled from "styled-components"
import COLORS from "../../data/colors";
const Cont = styled.div`
background: rgb(0,0,0);
background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(18,60,105,1) 49%, rgba(0,0,0,1) 100%);
height: 100vh;
width:100%;
position: absolute;
top:0;
z-index:2;

`;

const Dropdown = () => {
  return (
    <Cont colors = {COLORS}>
        <h4 className="white">Food Map</h4>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
        <p className="white">hello</p>
    </Cont>
  )
}

export default Dropdown