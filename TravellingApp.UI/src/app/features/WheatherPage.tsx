import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchWeatherData, WeatherData } from '../api/weatherData.ts'; // Import interface and function
import { geocodeCity } from '../api/geocoderData.ts';

ChartJS.register(...registerables); // Register Chart.js components

interface WeatherChartProps {
  latitude?: number;
  longitude?: number;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ latitude = 42.6975, longitude = 23.3241 }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [dailyCharts, setDailyCharts] = useState<LineConfig[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coordinates = await geocodeCity("Sofia");
        const data = await fetchWeatherData(coordinates[0], coordinates[1]);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const dailyChartsData = [];
      for (let i = 0; i < 7; i++) {
        const dayData = {
          labels: weatherData.hourly.time.slice(i * 24, (i + 1) * 24).map((time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
          datasets: [
            {
              label: 'Temperature (℃)',
              data: weatherData.hourly.temperature2m.slice(i * 24, (i + 1) * 24),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
        dailyChartsData.push(dayData);
      }
      setDailyCharts(dailyChartsData);
    }
  }, [weatherData]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  if (!dailyCharts) {
    return <div>Processing weather data...</div>;
  }

  return (
    <div>
      <h2>Daily Weather Charts</h2>
      {dailyCharts.map((chartData, index) => (
        <div key={index}>
          <h3>Day {index + 1}</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      ))}
    </div>
  );
};

const chartOptions = {
  scales: {
    x: {
      title: 'Time',
    },
    y: {
      title: 'Temperature (℃)',
    },
  },
};

type LineConfig = typeof chartData; // Define type for daily chart data

export default WeatherChart;
