import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RootState } from '../../../store';

const TeamPerformanceChart: React.FC = () => {
  const teams = useSelector((state: RootState) => state.teams.teams);
  const chartLabelColor = useColorModeValue('gray.700', 'gray.300');
  
  // Generate some sample data for the line chart
  const generatePerformanceData = () => {
    // Create a dataset for each month
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    
    return months.map(month => {
      const data: Record<string, any> = { month };
      
      // Add random values for the top 4 teams
      teams.slice(0, 4).forEach(team => {
        data[team.abbreviation] = Math.floor(Math.random() * 30) + 90; // Random value between 90-120
      });
      
      return data;
    });
  };
  
  const data = generatePerformanceData();
  
  // Top 4 teams for the line chart
  const topTeams = teams.slice(0, 4);

  return (
    <Box>
      <Text fontSize="md" fontWeight="medium" mb={3}>Team Offensive Rating Trends</Text>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue('gray.200', 'gray.600')} />
          <XAxis 
            dataKey="month" 
            stroke={chartLabelColor}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[85, 125]}
            stroke={chartLabelColor}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          {topTeams.map((team, index) => (
            <Line
              key={team.id}
              type="monotone"
              dataKey={team.abbreviation}
              stroke={team.primaryColor}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TeamPerformanceChart;