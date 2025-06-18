import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  VStack,
  HStack,
  Text,
  Divider,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaHome,
  FaUsers,
  FaBasketballBall,
  FaChartLine,
  FaTable,
  FaRegCalendarAlt,
  FaCog,
  FaStar,
} from 'react-icons/fa';
import { RootState } from '../../store';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const favoriteTeamId = useSelector((state: RootState) => state.settings.favoriteTeamId);
  const favoritePlayers = useSelector((state: RootState) => state.settings.favoritePlayers);
  const players = useSelector((state: RootState) => state.players.players);
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const favoriteTeam = teams.find(team => team.id === favoriteTeamId);
  const favoritePlayersList = players.filter(player => favoritePlayers.includes(player.id));

  // Filter to show only 3 favorite players
  const topFavoritePlayers = favoritePlayersList.slice(0, 3);

  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      width="240px"
      height="calc(100vh - 64px)"
      top="64px"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      transform={{ base: 'translateX(-100%)', md: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      transition="transform 0.3s"
      zIndex={5}
      overflowY="auto"
      boxShadow="sm"
    >
      <VStack spacing={0} align="stretch" py={4}>
        <NavItem to="/" icon={FaHome} isActive={location.pathname === '/'} label="Dashboard" />
        <NavItem to="/teams" icon={FaUsers} isActive={location.pathname.startsWith('/teams')} label="Teams" />
        <NavItem to="/players" icon={FaBasketballBall} isActive={location.pathname.startsWith('/players')} label="Players" />
        <NavItem to="/games" icon={FaRegCalendarAlt} isActive={location.pathname.startsWith('/games')} label="Games" />
        <NavItem to="/stats" icon={FaChartLine} isActive={location.pathname.startsWith('/stats')} label="Statistics" />
        <NavItem to="/leaderboards" icon={FaTable} isActive={location.pathname.startsWith('/leaderboards')} label="Leaderboards" />
        
        <Divider my={4} borderColor={borderColor} />
        
        {favoriteTeam && (
          <>
            <Box px={4} mb={2}>
              <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">
                Favorite Team
              </Text>
            </Box>
            <NavItem 
              to={`/teams/${favoriteTeam.id}`} 
              label={favoriteTeam.name} 
              icon={FaStar} 
              isActive={location.pathname === `/teams/${favoriteTeam.id}`}
              color={favoriteTeam.primaryColor}
            />
          </>
        )}
        
        {topFavoritePlayers.length > 0 && (
          <>
            <Box px={4} mt={2} mb={2}>
              <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500">
                Favorite Players
              </Text>
            </Box>
            {topFavoritePlayers.map(player => (
              <NavItem
                key={player.id}
                to={`/players/${player.id}`}
                label={player.name}
                icon={FaStar}
                isActive={location.pathname === `/players/${player.id}`}
              />
            ))}
          </>
        )}
        
        <Divider my={4} borderColor={borderColor} />
        
        <NavItem to="/settings" icon={FaCog} isActive={location.pathname === '/settings'} label="Settings" />
      </VStack>
    </Box>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  color?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, color }) => {
  const activeBg = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeColor = useColorModeValue('primary.700', 'primary.200');
  
  return (
    <Flex
      as={RouterLink}
      to={to}
      align="center"
      px={4}
      py={3}
      mb={1}
      mx={2}
      borderRadius="md"
      role="group"
      cursor="pointer"
      bg={isActive ? activeBg : 'transparent'}
      color={isActive ? (color || activeColor) : undefined}
      fontWeight={isActive ? 'semibold' : 'medium'}
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
    >
      <Icon as={icon} fontSize="18px" mr={3} />
      <Text fontSize="sm">{label}</Text>
    </Flex>
  );
};

export default Sidebar;