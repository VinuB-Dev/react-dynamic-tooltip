import { useState } from "react";
import "./App.css";
import TooltipAutoCalc from "./components/TooltipAutoCalc";
// import Tooltip from "./components/TooltipRDS";

function App() {
  const [position, setPosition] = useState("left");
  return (
    <>
      <div className="github-link">
        <a
          href="https://github.com/VinuB-Dev/react-dynamic-tooltip"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </div>
      <div>
        <button onClick={() => setPosition("left")}>Left</button>
        <button onClick={() => setPosition("center")}>Center</button>
        <button onClick={() => setPosition("right")}>Right</button>
      </div>
      <div className={`container-${position}`}>
        {/* <div className="tooltip-rds-container">
          <div>RDS Tooltip</div>
          <Tooltip
            content={"Tooltip content"}
            tooltipPosition={{
              top: "-1rem",
              left: "32rem",
            }}
          >
            <button>Hover me</button>
          </Tooltip>
        </div> */}
        <div className="mt-2">
          {/* <div>RDS Tooltip Auto position Custom</div> */}
          <TooltipAutoCalc content={`Updated at  ${new Date().toDateString()}`}>
            <button>Hover me</button>
          </TooltipAutoCalc>
        </div>
      </div>
    </>
  );
}

export default App;
