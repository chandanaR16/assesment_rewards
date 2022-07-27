import { Table } from "antd";
import React, { useEffect, useState } from "react";
import TransactionsData from "./data.json";

function Tab1() {
  const [values, setValues] = useState({
    columns: [],
    data: [],
  });

  useEffect(() => {
    if (TransactionsData) {
      const keys = Object.keys(TransactionsData[0]);
      let tempCols = keys.map((each) => {
        return {
          title: each.toUpperCase(),
          dataIndex: each,
          key: each,
        };
      });
      tempCols = [...tempCols];
      setValues({
        ...values,
        data: [...TransactionsData],
        columns: [...tempCols],
      });
    }
  }, []);
  const { columns, data } = values;
  return <Table className="tabl" columns={columns} dataSource={data} />;
}

export default Tab1;
