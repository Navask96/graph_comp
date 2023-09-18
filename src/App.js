import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import data from "./data.json";
import "./App.css"; // Import your CSS file for styling

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

export default function App() {
  const [seriesVisibility, setSeriesVisibility] = useState(
    data.map(() => true) // Initialize all series as visible
  );

  const toggleSeriesVisibility = (index) => {
    const updatedVisibility = [...seriesVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setSeriesVisibility(updatedVisibility);
  };

  return (
    <div className="centered-container">
      <h2>Line Chart with Distinct Values</h2>
      <div className="legend">
        {data.map((s, index) => (
          <div key={s.name} className="legend-item">
            <label>
              <input
                type="checkbox"
                checked={seriesVisibility[index]}
                onChange={() => toggleSeriesVisibility(index)}
              />
              {s.name}
            </label>
          </div>
        ))}
      </div>
      <LineChart
        width={700}
        height={400}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          type="category"
          allowDuplicatedCategory={false}
          interval={0}
          tickCount={data[0].data.length}
          height={60}
          tick={{ dy: 10 }}
        >
          <Label
            value="Categories"
            position="insideBottom"
            offset={2} // Add a 2px gap below the X-axis label
            style={{ textAnchor: "middle" }}
          />
        </XAxis>
        <YAxis>
          <Label
            value="Values"
            angle={-90}
            position="insideLeft"
            offset={-10} // Add a 10px gap to the left of the Y-axis label
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        {/* Always render the lines, but apply conditional opacity based on visibility */}
        {data.map((s, index) => (
          <Line
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            stroke={colors[index]}
            opacity={seriesVisibility[index] ? 1 : 0} // Set opacity to 0 when series is hidden
          />
        ))}
      </LineChart>
    </div>
  );
}
