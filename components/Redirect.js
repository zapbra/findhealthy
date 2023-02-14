import { useEffect } from "react";
import Router from "next/router";
const Redirect = ({ link }) => {
  useEffect(() => {
    Router.push(link);
  }, []);
  return (
    <div>
      <div class="lds-ring-green">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="green">redirecting...</p>
    </div>
  );
};

export default Redirect;
