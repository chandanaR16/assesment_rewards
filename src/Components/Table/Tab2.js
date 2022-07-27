import { Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import TransactionsData from "./data.json";

function Tab2() {
  const [values, setValues] = useState({
    columns: [],
    data: [],
    customers: [],
  });

  const { Option } = Select;

  useEffect(() => {
    if (TransactionsData) {
      let tempCustomers = [];
      TransactionsData.map((eachTransaction) => {
        if (!tempCustomers.includes(eachTransaction.customerName)) {
          tempCustomers.push(eachTransaction.customerName);
        }
        return;
      });
      setValues({
        ...values,
        customers: [...tempCustomers],
      });
    }
  }, []);

  const getRewardPoints = (amt) => {
    let num = Number(amt);
    let rewards = 0;
    if (num >= 100) {
      rewards = (num - 100) * 2;
      num = num - (num - 100);
    }
    if (num >= 50) {
      rewards = rewards + (num - 50) * 1;
    }
    return rewards;
  };

  const handleChange = (val) => {
    let tempCols = [];
    let filteredTransactions = [];
    let totalRewardPoints = 0;
    if (TransactionsData) {
      const keys = Object.keys(TransactionsData[0]);
      tempCols = keys.map((each) => {
        return {
          title: each.toUpperCase(),
          dataIndex: each,
          key: each,
        };
      });
      tempCols = [
        ...tempCols,
        {
          title: "REWARD POINTS",
          dataIndex: "totalPurchaseAmount",
          key: "totalPurchaseAmount",
          render: (t) => {
            return <p>{getRewardPoints(t)}</p>;
          },
        },
      ];
      filteredTransactions = TransactionsData.filter(
        (each) => each.customerName === val
      );

      filteredTransactions.map((each) => {
        totalRewardPoints =
          totalRewardPoints + getRewardPoints(Number(each.totalPurchaseAmount));
      });
    }
    setValues({
      ...values,
      data: [...filteredTransactions],
      columns: [...tempCols],
      selectedCustomer: val,
      totalRewardPoints: totalRewardPoints,
    });
  };

  const { columns, data, customers, selectedCustomer, totalRewardPoints } =
    values;

  return (
    <div>
      {customers && (
        <Select
          className="cus-sel"
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {customers.map((each) => {
            return <Option value={each}>{each}</Option>;
          })}
        </Select>
      )}
      {totalRewardPoints && (
        <p>
          Total Reward Points for {selectedCustomer} : {totalRewardPoints}
        </p>
      )}
      {selectedCustomer && (
        <Table className="tabl" columns={columns} dataSource={data} />
      )}
    </div>
  );
}

export default Tab2;
