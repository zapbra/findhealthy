import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "../../components/farmview/ImageSection";
import Sections from "../../components/farmview/Sections";
import supabase from "../../utils/supabaseClient";
const Cont = styled.div``;

export const getServerSideProps = async (pageContext) => {
  const title = pageContext.query.title;
  const { data, error } = await supabase
    .from("locations")
    .select("*, address(*), products(*), images(*)")
    .eq("name", title)
    .single();
  return {
    props: {
      location: data,
    },
  };
};

const Preview = ({ location }) => {
  const [origPoster, setOrigPoster] = useState(false);
  const [user, setUser] = useState("null");
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);

        if (session.session.user.id == location.user_id) {
          setOrigPoster(true);
        }
      }
    };
    fetchUser();
  }, []);

  const [images, setImages] = useState(
    location.images.map((image) => {
      return image.url;
    })
  );

  const description =
    "They sell grass fed beef, pasture raised chicken (fresh) and they also sell fresh organs every few months or so. They do deliveries to the Parkdale market every Saturday between 11:00 AM and 1:30 PM";
  return (
    <Cont colors={COLORS} className="default-page">
      <ImageSection images={images} />
      <Sections
        products={location.products}
        description={location.description}
        address={location.address[0].full_address}
        website={location.website}
        email={location.email}
        phone={location.number}
        delivery={location.pickup}
        hoursFrom={location.hoursFrom}
        hoursTo={location.hoursTo}
        grassFed={location.grassFed}
        organic={location.organic}
        vaccineFree={location.vaccineFree}
        soyFree={location.soyFree}
        pastureRaised={location.pastureRaised}
        dewormerFree={location.dewormerFree}
        unfrozen={location.unfrozen}
        pricing={location.pricing}
        quality={location.quality}
        friendly={location.friendly}
        howToOrder={location.howToOrder}
      />
    </Cont>
  );
};

export default Preview;
