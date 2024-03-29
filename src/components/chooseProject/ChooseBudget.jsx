import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const formatValue = (value) => {
  if (value >= 100000) {
    // Convert to lakh
    return (value / 100000).toFixed(1) + "L";
  } else if (value >= 1000) {
    // Convert to thousand
    return (value / 1000).toFixed(1) + "K";
  } else {
    // Display as is
    return value.toString();
  }
};

export default function ChooseBudget({
  onNext,
  setUserProjectData,
  onBack,
  minRange,
  maxRange,
  setMinRange,
  setMaxRange,
  checkIfBudgetIsSelected,
  setCheckIfBudgetIsSelected,
}) {
  // const [checkIfBudgetIsSelected, setCheckIfBudgetIsSelected] = useState(false);
  const handleContinue = () => {
    if (checkIfBudgetIsSelected === true) {
      let budget = `₹${formatValue(minRange)} - ₹${formatValue(maxRange)}`;
      setUserProjectData((prevData) => ({
        ...prevData,
        Budget: budget,
      }));

      // alert(
      //   `Selected Budget: ₹${formatValue(minRange)} - ₹${formatValue(maxRange)}`
      // );
      onNext();
    } else {
      alert("Please Select Budgect");
    }
    // Display alert with selected budget values

    // Call the callback to trigger navigation to the next component
  };

  // const [minRange, setMinRange] = useState(1000);
  // const [maxRange, setMaxRange] = useState(500000);

  const minRangeValueGap = 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newMinRange = minRange;
    let newMaxRange = maxRange;

    if (name === "min") {
      newMinRange = parseInt(value);
    } else if (name === "max") {
      newMaxRange = parseInt(value);
    }

    // Ensure that minRange does not go beyond maxRange
    if (newMinRange > newMaxRange - minRangeValueGap) {
      newMinRange = newMaxRange - minRangeValueGap;
    }

    setMinRange(newMinRange);
    setMaxRange(newMaxRange);
  };
  const handelBack = () => {
    onBack();
  };
  return (
    <>
      <div className="project-div2">
        <div>
          <h2>Choose Budget</h2>
        </div>
        <div className="range-slider">
          <div></div> {/* contain image for mobile view */}
          <div className="double_range_slider_box">
            <div className="double_range_slider">
              <span
                className="range_track"
                id="range_track"
                style={{
                  left: `${((minRange - 1000) / 490000) * 100}%`,
                  right: `${(1 - (maxRange - 1000) / 490000) * 100}%`,
                }}
              ></span>

              <input
                type="range"
                name="min"
                min="1000"
                max="500000"
                value={minRange}
                step="1000"
                onChange={handleInputChange}
                onClick={() => setCheckIfBudgetIsSelected(true)}
                onTouchStart={() => setCheckIfBudgetIsSelected(true)}
              />
              <input
                type="range"
                name="max"
                min="1000"
                max="500000"
                value={maxRange}
                step="1000"
                onChange={handleInputChange}
                onClick={() => setCheckIfBudgetIsSelected(true)}
                onTouchStart={() => setCheckIfBudgetIsSelected(true)}
              />

              <div
                className="minvalue"
                style={{ left: `${((minRange - 1000) / 490000) * 100}%` }}
              >
                {`₹${formatValue(minRange)}`}
              </div>
              <div
                className="maxvalue"
                style={{ right: `${(1 - (maxRange - 1000) / 490000) * 100}%` }}
              >
                {`₹${formatValue(maxRange)}`}
              </div>
            </div>
          </div>
        </div>

        <div className="project-div2-btn">
          <button onClick={handelBack}>
            <FaAngleLeft /> Back
          </button>
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
