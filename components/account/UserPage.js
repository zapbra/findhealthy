import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  .default-page {
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
  }
`;

const UserPage = () => {
  return (
    <Cont colors={COLORS}>
      <div className="default-page"></div>
    </Cont>
  );
};

export default UserPage;
