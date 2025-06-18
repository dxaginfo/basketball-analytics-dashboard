import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RootState } from '../../../store';

const ShotDistributionChart: React.FC = () => {
  const teams = useSelector((state: RootState) => state.teams.teams);
  const chartLabelColor = useColorModeValue('gray.700', 'gray.300');
  
  // Generate sample data for shot distribution by zone
  const generateShotData = () => {
    const zones = [
      'Restricted Area',
      'Paint (Non-RA)',
      'Mid-Range',
      'Corner 3',
      'Above Break 3',
    ];
    
    return zones.map(zone => {
      const data: Record<string, any> = { zone };
      
      // Add random values for top 3 teams
      teams.slice(0, 3).forEach(team => {
        // Random percentage for each zone
        let value: number;
        switch (zone) {
          case 'Restricted Area':
            value = Math.random() * 15 + 65; // 65-80%
            break;
          case 'Paint (Non-RA)':
            value = Math.random() * 15 + 40; // 40-55%
            break;
          case 'Mid-Range':
            value = Math.random() * 10 + 35; // 35-45%
            break;
          case 'Corner 3':
            value = Math.random() * 10 + 35; // 35-45%
            break;
          case 'Above Break 3':
            value = Math.random() * 15 + 30; // 30-45%
            break;
          default:
            value = Math.random() * 10 + 40; // 40-50%
        }
        data[team.abbreviation] = parseFloat(value.toFixed(1));
      });
      
      return data;
    });
  };
  
  const data = generateShotData();
  
  // Top 3 teams for the bar chart
  const topTeams = teams.slice(0, 3);

  return (
    <Box>
      <Text fontSize="md" fontWeight="medium" mb={3}>Team Shot Distribution FG%</Text>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue('gray.200', 'gray.600')} />
          <XAxis 
            dataKey="zone" 
            stroke={chartLabelColor}
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis 
            stroke={chartLabelColor}
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          {topTeams.map((team, index) => (
            <Bar
              key={team.id}
              dataKey={team.abbreviation}
              fill={team.primaryColor}
              name={team.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ShotDistributionChart;