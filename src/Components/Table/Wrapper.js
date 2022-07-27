import { Button } from "antd";
import React, { useState } from "react";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

function Wrapper() {
  const [selectedBtn, setSelectedBtn] = useState(null);
  const handleBtnSelect = (type) => {
    setSelectedBtn(type);
  };

  const renderChild = () => {
    switch (selectedBtn) {
      case "transactions":
        return <Tab1 />;
      case "rewards":
        return <Tab2 />;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <h3>Given Requirement :</h3>
        <p>
          <ul>
            <li>
              A retailer offers a rewards program to its customers, awarding
              points based on each recorded purchase.
            </li>
            <li>
              A customer receives 2 points for every dollar spent over $100 in
              each transaction, plus 1 point for every dollar spent over $50 in
              each transaction.
            </li>
            <li>(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).</li>
            <li>
              Given a record of every transaction during a three month period,
              calculate the reward points earned for each customer per month and
              total.
            </li>
          </ul>
        </p>
        <h3>Solution Provided : </h3>
        <div>
          <Button
            type={selectedBtn === "transactions" ? "primary" : "default"}
            onClick={() => handleBtnSelect("transactions")}
          >
            All Transactions
          </Button>
          <Button
            type={selectedBtn === "rewards" ? "primary" : "default"}
            onClick={() => handleBtnSelect("rewards")}
            className="rew-btn"
          >
            Rewards Calculation
          </Button>
        </div>
        {renderChild()}
      </div>
      <p style={{ fontWeight: "bold", marginTop: "30px" }}>
        Note : As we have no data set provided and heavy operations of filtering
        the data between dates should be handled by BE and provide data thru the
        API's, Only the Total points earned by each customer and Rewards gained
        per transaction are calaculated in the current UI task.
      </p>
    </div>
  );
}
export default Wrapper;
