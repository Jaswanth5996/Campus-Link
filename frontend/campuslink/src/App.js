import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Upload from './components/Upload';
import { Provider } from 'react-redux';
import {store} from './store'
import AllNotes from './components/AllNotes';
import Profile from './components/Profile';
import Events from './components/Events';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
      <div className="flex sticky top-0 mb-10 justify-end bg-violet-500 text-white w-full p-7">
            <div className="flex-1 text-left font-bold text-3xl pl-8"><Link to='/'>Campus-Link</Link></div>   
            <div className="flex-1 text-right flex gap-x-8 justify-end pr-14 text-2xl font-semibold">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/events">Events</Link>
            </div>
        </div>
    <Routes>
    <Route path="/"  element={<Home />} />
    <Route path="/login"  element={<Login />} />
    <Route path="/signup"  element={<Signup />} />
    <Route path="/upload"  element={<Upload />} />
    <Route path="/allnotes"  element={<AllNotes />} />
    <Route path="/profile"  element={<Profile />} />
    <Route path="/events"  element={<Events />} />
    </Routes>
    </Router>
    </div>
    </Provider>
  );
}

export default App;
