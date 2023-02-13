import styled from "styled-components";
import COLORS from "../../data/colors";
import Image from "next/image";
const Cont = styled.div`
  background: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  padding: 8px;
  margin-bottom: 16px;
  .image-holder {
    width: 100%;
    height: 200px;
    position: relative;
  }
`;
const Listing = ({
  name,
  address,
  created_at,
  icon,
  tags,
  howToOrder,
  pricing,
  quality,
  friendly,
  image = null,
}) => {
  console.log(image);
  return (
    <Cont colors={COLORS}>
      <div className="image-holder">
        {image !== null && (
          <Image
            src={image}
            style={{ objectFit: "cover" }}
            quality="100"
            fill
          />
        )}
      </div>
      <h3 className="black">{name}</h3>
    </Cont>
  );
};

export default Listing;
