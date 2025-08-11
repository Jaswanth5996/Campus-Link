import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Upload from './components/Upload';
import { Provider } from 'react-redux';
import { store } from './store';
import AllNotes from './components/AllNotes';
import Profile from './components/Profile';
import Events from './components/Events';
import Discussion from './components/Discussion';
import PostDiscussion from './components/postdiscussion';
import Physio from './components/Physio';
import DetailPage from './components/Detail';

function Navbar() {
  const location = useLocation();
  const linkClass = (path) =>
    `transition duration-200 ease-in-out px-3 py-2 rounded-lg hover:bg-violet-600 ${
      location.pathname === path ? 'bg-violet-600 font-bold' : ''
    }`;

  return (
    <div className="flex flex-col sm:flex-row sticky top-0 z-50 shadow-md items-center justify-between bg-violet-500 text-white w-full px-6 py-4">
      <div className="text-2xl sm:text-3xl font-extrabold tracking-wide">
        <Link to="/">Campus-Link</Link>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 sm:mt-0 sm:gap-6 text-base sm:text-lg font-medium">
        <Link className={linkClass('/')} to="/">Home</Link>
        <Link className={linkClass('/login')} to="/login">Login</Link>
        <Link className={linkClass('/signup')} to="/signup">Signup</Link>
        <Link className={linkClass('/upload')} to="/upload">Upload</Link>
        <Link className={linkClass('/profile')} to="/profile">Profile</Link>
        <Link className={linkClass('/events')} to="/events">Events</Link>
        <Link className={linkClass('/discussion')} to="/discussion">Discussion</Link>
        <Link className={linkClass('/physio')} to="/physio">Physio</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App bg-gray-50 min-h-screen">
        <Router>
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/allnotes" element={<AllNotes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events" element={<Events />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/postdiscussion" element={<PostDiscussion />} />
              <Route path="/physio" element={<Physio />} />
              <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
