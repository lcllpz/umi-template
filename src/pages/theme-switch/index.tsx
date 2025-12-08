import { ConfigProvider, Switch } from "antd";
import React, { useEffect } from "react";
import Ant from "./ant";
import AntPro from "./antPro";
import Customize from "./Customize";

const Index = () => {
  const [checked, setChecked] = React.useState(true);
  const changeTheme = (checked: boolean) => {
    setChecked(checked);
    if (checked) {
      ConfigProvider.config({
        theme: {
          primaryColor: "#1FA979",
          errorColor: "#f5222d",
          warningColor: "#faad14",
          successColor: "#52c41a",
          infoColor: "#1FA979",
        },
      });
    } else {
      ConfigProvider.config({ theme: {} });
    }
  };
  useEffect(() => {
    changeTheme(true);
  }, []);
  return (
    <div
      style={{
        height: "calc(100vh - 16px)",
        overflow: "auto",
        background: " #fff",
      }}
    >
      <Switch
        checkedChildren="自定义主题"
        unCheckedChildren="默认主题"
        checked={checked}
        onChange={changeTheme}
      />
      <p></p>
      <Customize></Customize>
      <Ant></Ant>
      <AntPro></AntPro>
    </div>
  );
};

export default Index;
