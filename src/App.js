import React, { useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import chartData from './data.json';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [selectedDataSets, setSelectedDataSets] = useState(['data1']); // Default to 'data1'

  const handleDataSetChange = (event) => {
    const value = event.target.value;
    if (selectedDataSets.includes(value)) {
      setSelectedDataSets(selectedDataSets.filter((set) => set !== value));
    } else {
      setSelectedDataSets([...selectedDataSets, value]);
    }
  };

  const filteredData = chartData.data.filter((point) =>
    selectedDataSets.includes(point.set)
  );

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Bounce Rate by Week of Year",
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%",
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    toolTip: {
      shared: true, // Enable shared tooltip for all data points with the same X value
    },
    data: selectedDataSets.map((set) => ({
      type: "line",
      name: set,
      showInLegend: true,
      toolTipContent: `{name} - Week {x}: {y}%, `,
      dataPoints: filteredData.filter((point) => point.set === set),
    })),
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            value="data1"
            checked={selectedDataSets.includes('data1')}
            onChange={handleDataSetChange}
          />
          Data Set 1
        </label>
        <label>
          <input
            type="checkbox"
            value="data2"
            checked={selectedDataSets.includes('data2')}
            onChange={handleDataSetChange}
          />
          Data Set 2
        </label>
        {/* Add checkboxes for other data sets if needed */}
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default App;
