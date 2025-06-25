import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import image from '../images/login.png'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) throw new Error('No token found, please login.');

        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch user');
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchUserNotes = async () => {
      setLoadingNotes(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found, please login.');

        const res = await fetch(`http://localhost:5000/api/notes/my-notes/?uploadedBy=${user._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch user notes');
        }

        const data = await res.json();
        setUserNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchUserNotes();
  }, [user]);

  if (loadingUser) return <p className="text-center mt-10">Loading user profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!user) return <p className="text-center mt-10">No user found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-violet-100 rounded-lg p-6 mb-6 flex flex-col items-center justify-center shadow-md text-center">
        <div className=" border-2 border-black h-[150px] w-[150px] mb-7 rounded-full ">
          <img src={image} alt="" />
        </div>
        <h2 className="text-2xl font-bold text-violet-700 mb-2">@{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        <div className="flex justify-center gap-10 mt-4">
          <div>
            <p className="text-lg font-semibold text-violet-600">{user.followers?.length || 0}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-violet-600">{user.following?.length || 0}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>

      {/* Notes uploaded by user */}
      <h3 className="text-xl font-semibold text-violet-700 mb-4">Your Uploaded Notes</h3>
      {loadingNotes ? (
        <p>Loading notes...</p>
      ) : userNotes.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
