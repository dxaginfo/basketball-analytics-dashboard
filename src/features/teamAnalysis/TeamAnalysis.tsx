import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Avatar,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import { AppDispatch, RootState } from '../../store';
import { fetchTeamStats } from '../../store/slices/teamsSlice';
import { fetchTeamShotChart } from '../../store/slices/shotChartsSlice';

// Components
import TeamOverview from './components/TeamOverview';
import TeamRoster from './components/TeamRoster';
import TeamShotChart from './components/TeamShotChart';
import TeamGameLog from './components/TeamGameLog';

const TeamAnalysis: React.FC = () => {
  const { teamId = '' } = useParams<{ teamId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const teams = useSelector((state: RootState) => state.teams.teams);
  const teamStats = useSelector((state: RootState) => 
    teamId ? state.teams.teamStats[teamId] : undefined
  );
  const players = useSelector((state: RootState) => 
    state.players.players.filter(player => player.teamId === teamId)
  );
  
  const team = teams.find(t => t.id === teamId);
  const cardBg = useColorModeValue('white', 'gray.700');
  
  useEffect(() => {
    if (teamId) {
      dispatch(fetchTeamStats(teamId));
      dispatch(fetchTeamShotChart({ teamId }));
    }
  }, [dispatch, teamId]);

  if (!team) {
    return <Box>Team not found</Box>;
  }

  return (
    <Box>
      <Flex
        mb={6}
        p={5}
        borderRadius="lg"
        bg={cardBg}
        boxShadow="sm"
        align="center"
      >
        <Avatar
          size="xl"
          bg={team.primaryColor}
          color="white"
          name={team.name}
          src={team.logoUrl}
          mr={6}
        />
        
        <Box>
          <Heading as="h1" size="xl">{team.name}</Heading>
          <Text fontSize="lg" color="gray.500">{team.abbreviation}</Text>
        </Box>
        
        {teamStats && (
          <Flex ml="auto" align="center">
            <Stat mx={4}>
              <StatLabel>Record</StatLabel>
              <StatNumber>{teamStats.wins}-{teamStats.losses}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {((teamStats.wins / (teamStats.wins + teamStats.losses)) * 100).toFixed(1)}%
              </StatHelpText>
            </Stat>
            
            <Stat mx={4}>
              <StatLabel>Points</StatLabel>
              <StatNumber>{teamStats.pointsPerGame.toFixed(1)}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Per Game
              </StatHelpText>
            </Stat>
            
            <Stat mx={4}>
              <StatLabel>Net Rating</StatLabel>
              <StatNumber>
                {(teamStats.offensiveRating - teamStats.defensiveRating).toFixed(1)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Per 100 Possessions
              </StatHelpText>
            </Stat>
          </Flex>
        )}
      </Flex>
      
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Roster</Tab>
          <Tab>Shot Chart</Tab>
          <Tab>Game Log</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel p={0} pt={5}>
            <TeamOverview team={team} teamStats={teamStats} />
          </TabPanel>
          
          <TabPanel p={0} pt={5}>
            <TeamRoster players={players} team={team} />
          </TabPanel>
          
          <TabPanel p={0} pt={5}>
            <TeamShotChart teamId={teamId} />
          </TabPanel>
          
          <TabPanel p={0} pt={5}>
            <TeamGameLog teamId={teamId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TeamAnalysis;