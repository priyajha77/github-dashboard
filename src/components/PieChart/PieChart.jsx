import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function PieChart() {
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    axios.get('https://api.github.com/users/priyajha7585/repos')
      .then(response => {
        const languages = response.data.map(repo => repo.language);
        const languageCounts = languages.reduce((acc, language) => {
          if (language) {
            acc[language] = acc[language] ? acc[language] + 1 : 1;
          }
          return acc;
        }, {});
        const total = Object.values(languageCounts).reduce((acc, count) => acc + count, 0);
        const languageData = Object.entries(languageCounts).map(([language, count]) => ({
          label: language,
          value: (count / total * 100).toFixed(2),
        }));
        setLanguageData(languageData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Languages Used by priyajha7585</h2>
      <Doughnut
        data={{
          labels: languageData.map(item => item.label),
          datasets: [
            {
              data: languageData.map(item => item.value),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#1ABC9C',
                '#2ECC71',
                '#3498DB',
                '#9B59B6',
                '#34495E',
                '#F1C40F',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#1ABC9C',
                '#2ECC71',
                '#3498DB',
                '#9B59B6',
                '#34495E',
                '#F1C40F',
              ],
            },
          ],
        }}
        
      />
    </div>
  );
}

export default PieChart;
