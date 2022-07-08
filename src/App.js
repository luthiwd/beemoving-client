import './App.css';
import { Routes, Route } from "react-router";
import NavbarTop from './components/NavbarTop';

//Pages
import Home from './pages/Home';
import Hives from './components/Hives';
import HiveDetails from './pages/hive/HiveDetails';
import CreateHive from './pages/hive/CreateHive';
import AddActionsHive from './pages/hive/AddActionsHive';

//Auth
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import IsPrivate from './components/IsPrivate'

//Error
import Error from './pages/Error';
import EditHive from './pages/hive/EditHive';
import EditAction from './pages/hive/EditAction';



function App() {
  return (
    <div className="App">
      <NavbarTop />
      <Hives />
      <hr />
      <div className='backpanal'>
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/colmenas/:id" element={<IsPrivate><HiveDetails /></IsPrivate>} />
          <Route path="/colmenas/new" element={<IsPrivate><CreateHive /></IsPrivate>} />
          <Route path="/colmenas/:id/edit" element={<IsPrivate><EditHive /></IsPrivate>} />
          <Route path="/colmenas/:id/action" element={<IsPrivate><AddActionsHive /></IsPrivate>} />
          <Route path="/actions/:id/edit" element={<IsPrivate><EditAction /></IsPrivate>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
