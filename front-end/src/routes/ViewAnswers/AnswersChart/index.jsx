import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
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
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 159, 64, 1)',
        'rgba(255, 0, 64, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 0, 100, 1)',
        'rgba(100, 100, 0, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const AnswersChart = ({ answers }) => {
  // useEffect(() => {
  //   console.log('todo');
  // }, [answers]);
  return (
    <>
      {/* <Card>
        <CardContent>
          <Typography variant="h5">{answers?.title}</Typography>
          <Doughnut data={data} />
        </CardContent>
      </Card> */}
    </>
  );
};

export default AnswersChart;
