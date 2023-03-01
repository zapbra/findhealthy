import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import colors from "../../data/colors";
const Cont = styled.div``;

const DownloadNutrients = ({ fish, nutrientObject, quantity }) => {
  const createTextNode = () => {
    const nutrientLines = Object.entries(nutrientObject.nutrients).map(
      ([key, val]) => {
        return `${key}: ${val.value}${val.units}, daily value: ${
          val.daily_value || ""
        }% \n`;
      }
    );
    const macroLines = Object.entries(nutrientObject.macros).map(
      ([key, val]) => {
        return `${key} ${val.value}g \n`;
      }
    );
    nutrientLines.unshift(`${quantity} \n`);
    nutrientLines.unshift(`${fish.name} \n`);
    const text = [...nutrientLines, ...macroLines].join("");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const [textFile, setTextFile] = useState(createTextNode);
  console.log(textFile);
  return (
    <Cont>
      <a download={`${fish.name}_nutrients`} href={textFile}>
        <div className="icon-button">
          <p className="bold">Download</p>
          <FontAwesomeIcon icon={faDownload} className="icon-ssm" />
        </div>
      </a>
    </Cont>
  );
};

export default DownloadNutrients;
