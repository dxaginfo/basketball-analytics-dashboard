import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text, Badge, Link, useColorModeValue } from '@chakra-ui/react';
import { Game } from '../../../types/game';
import { Team } from '../../../types/team';

interface GameScoreCardProps {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
}

const GameScoreCard: React.FC<GameScoreCardProps> = ({ game, homeTeam, awayTeam }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
        return <Badge colorScheme="red">LIVE</Badge>;
      case 'FINAL':
        return <Badge colorScheme="green">FINAL</Badge>;
      case 'SCHEDULED':
        return <Badge colorScheme="blue">UPCOMING</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const homeWinner = game.status === 'FINAL' && game.homeScore > game.awayScore;
  const awayWinner = game.status === 'FINAL' && game.awayScore > game.homeScore;

  return (
    <Link
      as={RouterLink}
      to={`/games/${game.id}`}
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
        <Flex justify="space-between" align="center" p={3} borderBottom="1px solid" borderColor={borderColor}>
          <Text fontWeight="medium">{formatDate(game.date)}</Text>
          {getStatusBadge(game.status)}
        </Flex>

        <Box p={4}>
          <Flex justify="space-between" align="center" mb={3}>
            <Flex align="center" flex={1}>
              <Box
                w={8}
                h={8}
                bg={awayTeam.primaryColor}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
                mr={3}
              >
                {awayTeam.abbreviation}
              </Box>
              <Text fontWeight={awayWinner ? 'bold' : 'normal'} isTruncated>
                {awayTeam.name}
              </Text>
            </Flex>
            <Text fontWeight="bold" fontSize="xl">
              {game.awayScore}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Flex align="center" flex={1}>
              <Box
                w={8}
                h={8}
                bg={homeTeam.primaryColor}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
                mr={3}
              >
                {homeTeam.abbreviation}
              </Box>
              <Text fontWeight={homeWinner ? 'bold' : 'normal'} isTruncated>
                {homeTeam.name}
              </Text>
            </Flex>
            <Text fontWeight="bold" fontSize="xl">
              {game.homeScore}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default GameScoreCard;