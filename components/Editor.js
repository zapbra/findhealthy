import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

import "react-mde/lib/styles/css/react-mde-all.css";
export default function Editor({ section, updateSection }) {
  const [selectedTab, setSelectedTab] = useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={section}
        onChange={updateSection}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={30}
        heightUnits="vh"
      />
    </section>
  );
}