import './App.css';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterContainer from './features/users/containers/RegisterContainer/RegisterContainer.tsx';
import LoginContainer from './features/users/containers/LoginContainer/LoginContainer.tsx';
import { Typography } from '@mui/joy';
import CocktailsContainer from './features/cocktails/containers/CocktailsContainer.tsx';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<CocktailsContainer/>} />
      <Route path="/register" element={<RegisterContainer/>} />
      <Route path="/login" element={<LoginContainer/>} />
      <Route path="*" element={
        <Typography textColor="success.plainColor" sx={{ fontWeight: 'md', fontSize: '30px' }}>
        Not found
      </Typography>}
      />
    </Routes>
  </Layout>
);

export default App;
