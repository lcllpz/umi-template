import {
  Button,
  Divider,
  Popover,
  Radio,
  Space,
  Switch,
  Tabs,
  TabsProps,
} from "antd";
import React, { useState } from "react";
const Ant = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <div>
      <Divider>Ant 4.x 组件</Divider>
      <Space>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Space>
      <div>
        <Radio defaultChecked={false} disabled={disabled}>
          Disabled
        </Radio>
        <Radio defaultChecked disabled={disabled}>
          Disabled
        </Radio>
        <Button
          type="primary"
          onClick={toggleDisabled}
          style={{ marginTop: 16 }}
        >
          Toggle disabled
        </Button>
      </div>
      <Divider>ant-design/pro-components组件: "^2.6.50"</Divider>

      <Popover content={content} title="Title">
        <Button type="primary">Hover me</Button>
      </Popover>
    </div>
  );
};

export default Ant;
