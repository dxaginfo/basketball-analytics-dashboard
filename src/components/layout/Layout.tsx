import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useColorMode } from '@chakra-ui/react';
import { RootState } from '../../store';
import { toggleDarkMode } from '../../store/slices/uiSlice';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { sidebarOpen, darkMode } = useSelector((state: RootState) => state.ui);

  // Sync Redux dark mode state with Chakra color mode
  React.useEffect(() => {
    if ((darkMode && colorMode === 'light') || (!darkMode && colorMode === 'dark')) {
      toggleColorMode();
    }
  }, [darkMode, colorMode, toggleColorMode]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TopBar onToggleDarkMode={handleToggleDarkMode} />
      
      <Box display="flex" flex="1" mt="64px">
        <Sidebar isOpen={sidebarOpen} />
        
        <Box
          as="main"
          flex="1"
          transition="margin 0.3s"
          ml={sidebarOpen ? { base: 0, md: '240px' } : 0}
          pt={2}
          px={4}
          pb={8}
          overflowX="hidden"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;