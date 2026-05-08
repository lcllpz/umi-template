import React, { useState } from "react";
import { CustomAceEditor } from "./components/index";
const Index = () => {
  const [sql, setSql] = useState("");
  return (
    <div>
      <CustomAceEditor
        value={sql}
        onChange={(value) => {
          setSql(value);
        }}
        readOnly={false}
        height="20vh"
        mode="sql"
        tableColumns={[{ label: "kk", value: "kkk" }]}
      ></CustomAceEditor>
    </div>
  );
};

export default Index;
