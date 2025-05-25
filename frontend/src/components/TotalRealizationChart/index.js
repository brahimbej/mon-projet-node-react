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
      position: 'top',
      align: 'end',
      labels: {
        color: '#fff',
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: 'Total Réalisation par machine',
      color: '#fff',
      font: {
        size: 24,
        weight: 'normal'
      },
      padding: {
        top: 10,
        bottom: 30
      }
    },
  },
  scales: {
    y: {
      min: 0,
      max: 1200,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff',
        font: {
          size: 14
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff',
        font: {
          size: 12
        }
      }
    }
  }
};

const TotalRealizationChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [
      {
        label: 'Réalisation/machine',
        data: data.map(item => {
          const totalMachines = item.machines.length;
          const totalOutput = item.machines.reduce((sum, m) => {
            const output = parseFloat(m.output);
            return sum + (isNaN(output) ? 0 : output);
          }, 0);
          return totalMachines > 0 ? Math.round(totalOutput / totalMachines) : 0;
        }),
        borderColor: '#53a2eb',
        backgroundColor: 'rgba(83, 162, 235, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#53a2eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'obj/machine',
        data: data.map(() => 960),
        borderColor: '#4bc04b',
        backgroundColor: 'rgba(75, 192, 75, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#4bc04b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
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

export default TotalRealizationChart; 