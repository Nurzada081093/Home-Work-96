import './App.css';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/joy';
import CocktailsContainer from './features/cocktails/containers/CocktailsContainer.tsx';
import NewCocktailContainer from './features/cocktails/containers/NewCocktailContainer.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { userFromSlice } from './features/users/usersSlice.ts';

const App = () => {
  const user = useAppSelector(userFromSlice);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CocktailsContainer/>}/>
        <Route path="/newCocktail" element={
          <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
            <NewCocktailContainer/>
          </ProtectedRoute>
        }/>
        <Route path="*" element={
          <Typography textColor="success.plainColor" sx={{fontWeight: 'md', fontSize: '30px'}}>
            Not found
          </Typography>}
        />
      </Routes>
    </Layout>
  )
};

export default App;
