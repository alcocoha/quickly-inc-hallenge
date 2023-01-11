import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

//Pages
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import { Profile } from 'pages/Profile';
import { NotFound } from 'pages/NotFound';
import Logout from 'pages/Logout';

// Providers
import { DataSessionProvider, DataSessionContext } from 'providers/DataSessionProvider';

const RoutesData = () => {
  const { sessionActive } = useContext(DataSessionContext);

  return (
    <Routes>
      <Route exact path="/" element={sessionActive ? <Profile /> : <Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/my-profile" element={<Profile />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Navigation = () => {
  return (
    <Router>
      <DataSessionProvider>
        <Header title="Quickly Inc Challenge" />
        <RoutesData />
        <Footer />
      </DataSessionProvider>
    </Router>
  );
};

export default Navigation;
