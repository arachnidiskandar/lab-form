import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  Button,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
} from '@material-ui/core';

const chartColors = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(0, 159, 64, 0.8)',
  'rgba(255, 0, 64, 0.8)',
  'rgba(255, 255, 0, 0.8)',
  'rgba(0, 0, 100, 0.8)',
  'rgba(100, 100, 0, 0.8)',
];
const AnswersChart = ({ question }) => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const chartConfig = {
      labels: Object.keys(question.answers),
      datasets: [
        {
          label: '# of Votes',
          data: Object.values(question.answers),
          backgroundColor: chartColors,
          borderColor: chartColors,
          borderWidth: 1,
        },
      ],
    };
    setChartData(chartConfig);
  }, [question]);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{question?.questionTitle}</Typography>
        <Divider />
        <div>
          <Doughnut data={chartData} height={400} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswersChart;
