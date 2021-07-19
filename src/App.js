import "./App.css";
import { Table, Button } from "antd";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    dataSource: [
      {
        transactionId: 1,
        transactionAmt: 60,
        customerName: "Mike",
      },
      {
        transactionId: 2,
        transactionAmt: 100,
        customerName: "Hank",
      },
      {
        transactionId: 3,
        transactionAmt: 120,
        customerName: "Walter",
      },
      {
        transactionId: 4,
        transactionAmt: 140,
        customerName: "Jessy",
      },
    ],
    columns: [
      {
        title: "Transaction Id",
        dataIndex: "transactionId",
        key: "transactionId",
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        key: "customerName",
      },
      {
        title: "Transaction Ammount",
        dataIndex: "transactionAmt",
        key: "transactionAmt",
      },
    ],
    isRewardGenerated: false,
  });

  const { columns, dataSource, isRewardGenerated } = state;

  const generateRewards = () => {
    const updatedTableData = dataSource.map((eds) => {
      let onePointTotal = 0;
      let twoPointTotal = 0;
      if (eds.transactionAmt >= 100) {
        twoPointTotal = (eds.transactionAmt - 100) * 2;
        onePointTotal = 50;
      }
      if (eds.transactionAmt >= 50 && eds.transactionAmt < 100) {
        onePointTotal = (eds.transactionAmt - 50) * 1;
      }
      return { ...eds, rewardPoints: onePointTotal + twoPointTotal };
    });
    setState({
      ...state,
      dataSource: [...updatedTableData],
      columns: [
        ...columns,
        {
          title: "Reward Points",
          dataIndex: "rewardPoints",
          key: "rewardPoints",
        },
      ],
      isRewardGenerated: true,
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> Customer rewards</h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Table dataSource={dataSource} columns={columns} />
        <Button disabled={isRewardGenerated} onClick={generateRewards}>
          Generate Rewards
        </Button>
      </div>
    </div>
  );
}

export default App;
