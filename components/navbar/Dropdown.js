import Link from "next/link";
import styled from "styled-components"
import COLORS from "../../data/colors";
const Cont = styled.div`
background: rgb(18,60,105);
background: linear-gradient(0deg, rgba(18,60,105,1) 0%, rgba(0,0,0,1) 50%, rgba(18,60,105,1) 100%);
height: 100vh;
width:100%;
position: absolute;
top:0;
z-index:2;
    padding: 8px 16px;
    .line{
        padding: 4px;
        border-bottom: 2px solid ${props=> props.colors.offWhite};
        &:hover{
            background-color: ${props=> props.colors.offWhite};
            h4{
                color: ${props=> props.colors.darkBlue};
                text-shadow: 3px 8px 7px rgba(0, 0, 0, 0.61);
            }
        }
    }
    h4{
        text-decoration:none !important;
    }
    .white-line{
        width:100%;
        height:12px;
        background-color: ${props=> props.colors.offWhite};
        margin-top: 32px;
        margin-bottom: 32px;
    }
`;

const Dropdown = () => {
  return (
    <Cont colors = {COLORS}>
        <section>
        <h3 className="white">FOOD MAP </h3>
        <Link href = '/'>
        <div className="line">
        <h4 className="white text-shadow-white light">MAP</h4>
        </div>
        </Link>
        <Link href = '/'>
        <div className="line">
        <h4 className="white text-shadow-white light">FORUM</h4>
        </div>
        </Link>
        
        </section>

        <div className="white-line">
        </div>

        <section>
        <h3 className="white">FISH FINDER </h3>
        <Link href = '/'>
        <div className="line">
        <h4 className="white text-shadow-white light">MAP</h4>
        </div>
        </Link>

        <Link href = '/'>
        <div className="line">
        <h4 className="white text-shadow-white light">ARTICLES</h4>
        </div>
        </Link>

        <Link href = '/'>
        <div className="line">
        <h4 className="white text-shadow-white light">DATA SEARCH</h4>
        </div>
        </Link>
        
        </section>

    </Cont>
  )
}

export default Dropdown