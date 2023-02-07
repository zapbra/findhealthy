import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "../../components/farmview/ImageSection";
import Sections from "../../components/farmview/Sections";
import supabase from "../../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import EditSections from "../../components/farmview/EditSections";
import { Toaster } from "react-hot-toast";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background-color: #fff !important;
  .header {
    padding: 16px;
    background-color: ${(props) => props.colors.tan};
  }
`;

export const getServerSideProps = async (pageContext) => {
  const title = pageContext.query.title;
  const { data, error } = await supabase
    .from("locations")
    .select("*, address(*), products(*), images(*), user_id(id, username)")
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

        if (session.session.user.id == location.user_id.id) {
          setOrigPoster(true);
        }
      }
    };
    fetchUser();
  }, []);

  console.log("location");
  console.log(location);
  console.log("location");
  const [images, setImages] = useState(
    location.images.map((image) => {
      return image.url;
    })
  );

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => {
      return !prev;
    });
  };
  console.log("origPoster");
  console.log(origPoster);
  console.log("origPoster");
  const description =
    "They sell grass fed beef, pasture raised chicken (fresh) and they also sell fresh organs every few months or so. They do deliveries to the Parkdale market every Saturday between 11:00 AM and 1:30 PM";
  return (
    <Cont colors={COLORS} className="default-page box-shadow-2">
      <div className="header flex flex-wrap space-between align-center">
        <div className="flex align-center mar-bottom-16">
          <h3 className="text-shadow-red mar-right-16">{location.name}</h3>
          <div className="flex flex-column ">
            <p className="mar-right-4 contrast">
              Posted- {new Date(location.created_at).toDateString()}
            </p>
            <p className="bold">u/{location?.user_id?.username || "anon"} </p>
          </div>
        </div>
        <div className="flex align-center flex-wrap mar-bottom-16">
          <p
            className="inline-block mar-right-8 bold box-shadow-2 white-bg"
            style={{ border: "1px solid #192430", padding: "4px 8px" }}
          >
            Tags
          </p>
          {location.tags.map((tag, index) => (
            <p key={index} className="mar-right-4">
              {tag},
            </p>
          ))}
        </div>
        {origPoster && (
          <div
            onClick={toggleEditMode}
            className="black-btn flex-inline cursor align-center"
          >
            <h4 className="mar-right-16">
              {editMode ? "CANCEL EDIT" : "EDIT"}
            </h4>
            <FontAwesomeIcon icon={faPencil} className=" icon-sm white" />
          </div>
        )}
      </div>

      <ImageSection
        images={images}
        location_id={location.id}
        user_id={user.id}
        post_user_id={location.user?.id || null}
      />
      {editMode ? (
        <EditSections
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
          location_id={location.id}
        />
      ) : (
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
      )}
    </Cont>
  );
};

export default Preview;
