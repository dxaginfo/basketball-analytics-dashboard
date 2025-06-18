import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { AppDispatch } from './store';
import { fetchTeams } from './store/slices/teamsSlice';
import { fetchPlayers } from './store/slices/playersSlice';
import Layout from './components/layout/Layout';

// Use React.lazy for code splitting
const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'));
const TeamAnalysis = React.lazy(() => import('./features/teamAnalysis/TeamAnalysis'));
const PlayerStats = React.lazy(() => import('./features/playerStats/PlayerStats'));
const GameDetails = React.lazy(() => import('./features/gameDetails/GameDetails'));
const Settings = React.lazy(() => import('./features/settings/Settings'));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch initial data when the app loads
    dispatch(fetchTeams());
    dispatch(fetchPlayers());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense
        fallback={
          <Center h="calc(100vh - 64px)">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        }
      >
        <Box className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams/:teamId" element={<TeamAnalysis />} />
            <Route path="/players/:playerId" element={<PlayerStats />} />
            <Route path="/games/:gameId" element={<GameDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </Suspense>
    </Layout>
  );
}

export default App;