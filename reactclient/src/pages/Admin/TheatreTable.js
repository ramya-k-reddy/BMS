import React from "react";
import { Table } from "antd";

function TheatreTable() {
  return (
    <div>
      <h2>Table</h2>
      <Table dataSource={movies} columns={columns} rowKey="id" />
    </div>
  );
}

export default TheatreTable;
