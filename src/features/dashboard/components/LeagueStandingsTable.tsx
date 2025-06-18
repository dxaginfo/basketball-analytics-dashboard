import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { Team } from '../../../types/team';

interface LeagueStandingsTableProps {
  teams: Team[];
}

const LeagueStandingsTable: React.FC<LeagueStandingsTableProps> = ({ teams }) => {
  const headerBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Generate random win-loss records for each team
  const generateRecord = () => {
    const wins = Math.floor(Math.random() * 30) + 30; // 30-60 wins
    const losses = 82 - wins; // 82-game season
    return { wins, losses };
  };
  
  // Sort teams by win percentage
  const teamsWithRecords = teams.map(team => {
    const record = generateRecord();
    return {
      ...team,
      ...record,
      winPct: record.wins / (record.wins + record.losses),
    };
  }).sort((a, b) => b.winPct - a.winPct);

  return (
    <Box overflowX="auto">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr bg={headerBg}>
            <Th borderColor={borderColor} width="10px">Rank</Th>
            <Th borderColor={borderColor}>Team</Th>
            <Th borderColor={borderColor} isNumeric>W</Th>
            <Th borderColor={borderColor} isNumeric>L</Th>
            <Th borderColor={borderColor} isNumeric>Pct</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teamsWithRecords.map((team, index) => (
            <Tr key={team.id}>
              <Td borderColor={borderColor} fontWeight="medium">{index + 1}</Td>
              <Td borderColor={borderColor}>
                <Link as={RouterLink} to={`/teams/${team.id}`} fontWeight="medium" color={team.primaryColor}>
                  {team.abbreviation}
                </Link>
              </Td>
              <Td borderColor={borderColor} isNumeric>{team.wins}</Td>
              <Td borderColor={borderColor} isNumeric>{team.losses}</Td>
              <Td borderColor={borderColor} isNumeric>{team.winPct.toFixed(3)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeagueStandingsTable;