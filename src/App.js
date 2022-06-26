import './App.css';
import { Routes, Route } from "react-router";
import NavbarTop from './components/NavbarTop';

//Pages
import Home from './pages/Home';
import Hives from './components/Hives';
import HiveDetails from './pages/hive/HiveDetails';
import CreateHive from './pages/hive/CreateHive';

//Auth
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

//Error
import Error from './pages/Error';
import EditHive from './pages/hive/EditHive';


function App() {
  return (
    <div className="App">
      <NavbarTop />
      <Hives />
      <hr />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/colmenas/:id" element={<HiveDetails />} />
        <Route path="/colmenas/new" element={<CreateHive />} />
        <Route path="/colmenas/:id/edit" element={<EditHive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
