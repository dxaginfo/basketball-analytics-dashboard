import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Image, Text, Badge, Progress, Link, useColorModeValue } from '@chakra-ui/react';
import { Player } from '../../../types/player';
import { fetchPlayerStats } from '../../../store/slices/playersSlice';
import { AppDispatch, RootState } from '../../../store';

interface PlayerStatsCardProps {
  player: Player;
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ player }) => {
  const dispatch = useDispatch<AppDispatch>();
  const playerStats = useSelector((state: RootState) => 
    state.players.playerStats[player.id]
  );
  const teams = useSelector((state: RootState) => state.teams.teams);
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const team = teams.find(t => t.id === player.teamId);
  
  useEffect(() => {
    if (!playerStats) {
      dispatch(fetchPlayerStats(player.id));
    }
  }, [dispatch, player.id, playerStats]);

  return (
    <Link
      as={RouterLink}
      to={`/players/${player.id}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg={cardBg}
        boxShadow="md"
        border="1px solid"
        borderColor={borderColor}
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      >
        <Flex borderBottom="1px solid" borderColor={borderColor}>
          <Image
            src={player.imageUrl || 'https://via.placeholder.com/100?text=Player'}
            alt={player.name}
            boxSize="100px"
            objectFit="cover"
          />
          <Box p={3} flex={1}>
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text fontWeight="bold" fontSize="lg">{player.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {team?.name || 'Team'} | #{player.jerseyNumber}
                </Text>
              </Box>
              <Badge
                bg={team?.primaryColor || 'blue.500'}
                color="white"
                borderRadius="full"
                px={2}
              >
                {player.position}
              </Badge>
            </Flex>
          </Box>
        </Flex>

        <Box p={4}>
          {playerStats ? (
            <>
              <Flex justify="space-between" mb={3}>
                <StatDisplay label="PPG" value={playerStats.pointsPerGame.toFixed(1)} />
                <StatDisplay label="RPG" value={playerStats.reboundsPerGame.toFixed(1)} />
                <StatDisplay label="APG" value={playerStats.assistsPerGame.toFixed(1)} />
              </Flex>

              <Box mb={3}>
                <Flex justify="space-between" align="center" mb={1}>
                  <Text fontSize="xs" fontWeight="medium">FG%</Text>
                  <Text fontSize="xs">{(playerStats.fieldGoalPercentage * 100).toFixed(1)}%</Text>
                </Flex>
                <Progress
                  value={playerStats.fieldGoalPercentage * 100}
                  size="sm"
                  colorScheme="green"
                  borderRadius="full"
                />
              </Box>

              <Box>
                <Flex justify="space-between" align="center" mb={1}>
                  <Text fontSize="xs" fontWeight="medium">3P%</Text>
                  <Text fontSize="xs">{(playerStats.threePointPercentage * 100).toFixed(1)}%</Text>
                </Flex>
                <Progress
                  value={playerStats.threePointPercentage * 100}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                />
              </Box>
            </>
          ) : (
            <Text fontSize="sm" color="gray.500" textAlign="center">Loading stats...</Text>
          )}
        </Box>
      </Box>
    </Link>
  );
};

interface StatDisplayProps {
  label: string;
  value: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => (
  <Box textAlign="center">
    <Text fontSize="xl" fontWeight="bold">{value}</Text>
    <Text fontSize="xs" color="gray.500">{label}</Text>
  </Box>
);

export default PlayerStatsCard;