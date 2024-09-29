import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

Chart.register(...registerables);

const DataVisualization: React.FC = () => {
  // Mock data for daily habit success
  const habitSuccessData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Daily Habit Success',
        data: [
          { x: 1, y: 80 },
          { x: 2, y: 90 },
          { x: 3, y: 85 },
          { x: 4, y: 95 },
          { x: 5, y: 88 },
          { x: 6, y: 92 },
          { x: 7, y: 94 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Perceived Success',
        data: [
          { x: 1, y: 70 },
          { x: 2, y: 85 },
          { x: 3, y: 80 },
          { x: 4, y: 90 },
          { x: 5, y: 85 },
          { x: 6, y: 88 },
          { x: 7, y: 91 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Mock data for another creative graph
  const creativeData = {
    labels: ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4', 'Goal 5'],
    datasets: [
      {
        label: 'Goal Progress',
        data: [
          { x: 1, y: 60 },
          { x: 2, y: 75 },
          { x: 3, y: 80 },
          { x: 4, y: 90 },
          { x: 5, y: 85 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Daily Habit Success vs. Perceived Success</CardTitle>
        </CardHeader>
        <CardContent>
          <Scatter data={habitSuccessData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goal Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Scatter data={creativeData} options={{ responsive: true }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;