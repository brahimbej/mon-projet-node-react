import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#fff',
        font: {
          size: 12
        },
        padding: 10
      }
    },
    title: {
      display: true,
      text: 'Réalisation machine par heure',
      color: '#fff',
      font: {
        size: 20
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
  },
  scales: {
    y: {
      min: 0,
      max: 150,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff'
      }
    }
  }
};

const ProductionChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [
      {
        label: 'Réalisation/eq',
        data: data.map(item => item.effectif),
        borderColor: '#53a2eb',
        backgroundColor: 'rgba(83, 162, 235, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#53a2eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'OBJ',
        data: data.map(() => 90),
        borderColor: '#4bc04b',
        backgroundColor: 'rgba(75, 192, 75, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#4bc04b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ],
  };

  return (
    <div style={{ 
      width: '100%',
      height: '400px',
      backgroundColor: '#2f2f2f',
      borderRadius: '8px',
      padding: '10px'
    }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ProductionChart; 