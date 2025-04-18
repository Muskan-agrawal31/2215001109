import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';




const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Feed</Link> | <Link to="/top-users">Top Users</Link> | <Link to="/trending">Trending</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending" element={<TrendingPosts />} />
      </Routes>
    </Router>
  );
};



export default App;
