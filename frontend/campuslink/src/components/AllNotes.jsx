import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (yearFilter, subjectFilter) => {
    setLoading(true);
    try {
      let query = [];
      if (yearFilter) query.push(`year=${encodeURIComponent(yearFilter)}`);
      if (subjectFilter) query.push(`subject=${encodeURIComponent(subjectFilter)}`);
      const queryString = query.length > 0 ? `?${query.join('&')}` : '';

      const response = await axios.get(`https://campus-link-jd0k.onrender.com/api/notes/all${queryString}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes(year, subject);
  }, [year, subject]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-violet-700 text-center">🗂️ All Notes</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border border-violet-400 rounded w-full md:w-1/4"
        >
          <option value="">All Years</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <input
          type="text"
          placeholder="Search by Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border border-violet-400 rounded w-full md:w-1/2"
        />
      </div>
      {loading ? (
        <p className="text-center text-violet-600">Loading notes...</p>
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <p className="text-center text-violet-600">No notes found.</p>
      )}
    </div>
  );
};

export default AllNotes;
