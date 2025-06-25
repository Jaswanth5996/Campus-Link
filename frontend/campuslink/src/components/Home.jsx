import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';

const Home = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/notes/all?limit=10&sort=desc');
      setRecentNotes(response.data);
    } catch (error) {
      console.error('Error fetching recent notes:', error);
      setRecentNotes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecentNotes();
  }, []);

  return (
    <div className=" font-serif px-6 py-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl  font-bold text-gray-800 m-6">Welcome to Campus-Link</h1>
        <p className="text-lg tfont-serifext-gray-600 mt-3">
          Discover and share class notes, PDFs, and resources uploaded by students.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">Most Recent Notes</h2>

        {loading ? (
          <p className="text-center text-violet-600">Loading recent notes...</p>
        ) : recentNotes.length > 0 ? (
          <div className="grid gap-4 text-left lg:grid-cols-3">
            {recentNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <p className="text-center text-violet-600">No recent notes found.</p>
        )}

        <div className="text-center mt-10">
          <Link
            to="/allnotes"
            className="text-violet-600 hover:text-violet-800 text-base font-medium underline transition"
          >
            Browse all notes →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
