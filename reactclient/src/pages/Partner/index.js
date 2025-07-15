import React from "react";
import { Button, Form, Input, message, Radio } from "antd";
import TheatreList from "./TheatreList";

function Partner() {
  const items = [
    {
      key: "1",
      label: "Theatre",
      children: <TheatreList />,
    },
  ];
  return (
    <div>
      <main className="App-header">
        <h1>Partner Dashboard</h1>
        <Tabs items={items} />
      </main>
    </div>
  );
}

export default Partner;
