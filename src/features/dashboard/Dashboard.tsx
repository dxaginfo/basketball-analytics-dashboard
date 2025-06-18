import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Link,
} from '@chakra-ui/react';
import { AppDispatch, RootState } from '../../store';
import { fetchRecentGames } from '../../store/slices/gamesSlice';
import GameScoreCard from './components/GameScoreCard';
import PlayerStatsCard from './components/PlayerStatsCard';
import TeamPerformanceChart from './components/TeamPerformanceChart';
import LeagueStandingsTable from './components/LeagueStandingsTable';
import ShotDistributionChart from './components/ShotDistributionChart';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams } = useSelector((state: RootState) => state.teams);
  const { players } = useSelector((state: RootState) => state.players);
  const { games, loading } = useSelector((state: RootState) => state.games);
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('sm', 'dark-lg');
  
  useEffect(() => {
    dispatch(fetchRecentGames());
  }, [dispatch]);
  
  // In a real app, this would be calculated from real data
  const getTeamById = (teamId: string) => {
    return teams.find(team => team.id === teamId) || {
      id: teamId,
      name: 'Unknown Team',
      abbreviation: 'UNK',
      primaryColor: 'gray.400',
      secondaryColor: 'gray.200',
    };
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Dashboard</Heading>
      
      {/* Recent Games */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2" size="lg">Recent Games</Heading>
          <Button as={RouterLink} to="/games" size="sm" colorScheme="blue" variant="outline">
            View All Games
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {games.slice(0, 3).map(game => (
            <GameScoreCard
              key={game.id}
              game={game}
              homeTeam={getTeamById(game.homeTeamId)}
              awayTeam={getTeamById(game.awayTeamId)}
            />
          ))}
        </SimpleGrid>
      </Box>
      
      {/* League Overview */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>League Overview</Heading>
        
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4} mb={6}>
          <Stat
            bg={cardBg}
            p={4}
            borderRadius="lg"
            boxShadow={cardShadow}
          >
            <StatLabel>Average Points</StatLabel>
            <StatNumber>112.4</StatNumber>
            <StatHelpText>League Average</StatHelpText>
          </Stat>
          
          <Stat
            bg={cardBg}
            p={4}
            borderRadius="lg"
            boxShadow={cardShadow}
          >
            <StatLabel>3PT%</StatLabel>
            <StatNumber>36.2%</StatNumber>
            <StatHelpText>League Average</StatHelpText>
          </Stat>
          
          <Stat
            bg={cardBg}
            p={4}
            borderRadius="lg"
            boxShadow={cardShadow}
          >
            <StatLabel>FG%</StatLabel>
            <StatNumber>46.7%</StatNumber>
            <StatHelpText>League Average</StatHelpText>
          </Stat>
          
          <Stat
            bg={cardBg}
            p={4}
            borderRadius="lg"
            boxShadow={cardShadow}
          >
            <StatLabel>Pace</StatLabel>
            <StatNumber>99.2</StatNumber>
            <StatHelpText>League Average</StatHelpText>
          </Stat>
        </Grid>
        
        <Box
          bg={cardBg}
          borderRadius="lg"
          boxShadow={cardShadow}
          p={4}
          mb={4}
          height="300px"
        >
          <TeamPerformanceChart />
        </Box>
      </Box>
      
      {/* Team Stats & Standings */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
        <Box
          bg={cardBg}
          borderRadius="lg"
          boxShadow={cardShadow}
          p={4}
          height="400px"
        >
          <Heading as="h3" size="md" mb={4}>Team Performance Comparison</Heading>
          <ShotDistributionChart />
        </Box>
        
        <Box
          bg={cardBg}
          borderRadius="lg"
          boxShadow={cardShadow}
          p={4}
          height="400px"
          overflowY="auto"
        >
          <Heading as="h3" size="md" mb={4}>League Standings</Heading>
          <LeagueStandingsTable teams={teams} />
        </Box>
      </Grid>
      
      {/* Player Spotlights */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>Player Spotlights</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {players.slice(0, 3).map(player => (
            <PlayerStatsCard key={player.id} player={player} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;