import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

//Pages
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import { Profile } from 'pages/Profile';

//Utils
import { menu } from 'utils/constants';

const Navigation = () => {
  return (
    <Router>
      <Header title="Quickly Inc Challenge" menu={menu} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/my-profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Navigation;
