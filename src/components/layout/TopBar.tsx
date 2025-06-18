import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBars, FaMoon, FaSun, FaSearch, FaBell, FaUser, FaCog } from 'react-icons/fa';
import { toggleSidebar, toggleMobileMenu } from '../../store/slices/uiSlice';
import { RootState } from '../../store';

interface TopBarProps {
  onToggleDarkMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleDarkMode }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      height="64px"
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="sm"
    >
      <Flex alignItems="center">
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          variant="ghost"
          onClick={() => dispatch(toggleSidebar())}
          display={{ base: 'none', md: 'flex' }}
          mr={2}
        />
        <IconButton
          aria-label="Mobile Menu"
          icon={<FaBars />}
          variant="ghost"
          onClick={() => dispatch(toggleMobileMenu())}
          display={{ base: 'flex', md: 'none' }}
          mr={2}
        />
        <Box
          as={RouterLink}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          color="primary.600"
        >
          Basketball Analytics
        </Box>
      </Flex>

      <InputGroup maxWidth="400px" mx={4} display={{ base: 'none', md: 'block' }}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search players, teams, stats..." borderRadius="full" />
      </InputGroup>

      <Flex alignItems="center">
        <IconButton
          aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          icon={darkMode ? <FaSun /> : <FaMoon />}
          variant="ghost"
          onClick={onToggleDarkMode}
          mr={2}
        />
        
        <IconButton
          aria-label="Notifications"
          icon={<FaBell />}
          variant="ghost"
          mr={2}
        />
        
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            borderRadius="full"
            p={1}
          >
            <FaUser />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaUser />}>Profile</MenuItem>
            <MenuItem icon={<FaCog />}>Settings</MenuItem>
            <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
              Dashboard Settings
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default TopBar;