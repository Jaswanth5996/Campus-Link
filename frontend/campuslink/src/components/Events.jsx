import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const postEvents = async () => {
    if (!title || !description || !date || !location || !imageUrl || !createdBy) {
      setError("All fields are required");
      return;
    }
    try {
          const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to post an event");
      return;
    }
      const response = await axios.post("https://campus-link-jd0k.onrender.com/events/post", {
        title,
        description,
        date,
        location,
        imageUrl,
        createdBy,
      },      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Event posted:", response.data);
      setError(null);
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImageUrl('');
      setCreatedBy('');
      fetchEvents();
    } catch (err) {
      console.error("Error posting event:", err);
      setError("Failed to post event. Please try again later.");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://campus-link-jd0k.onrender.com/events/");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="font-sans px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-900 mb-12">
        📅 Upcoming Events
      </h1>

      {/* Form Section */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-12 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Created By (email/user ID)"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={postEvents}
          className="bg-blue-700 text-white mt-4 px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Post Event
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Events Grid */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
  {events.map((event, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
    >
      {/* Image on Left */}
      {event.imageUrl && (
<div className="w-full sm:w-1/3 h-64 bg-gray-100 flex items-center justify-center">
  <img
    src={event.imageUrl}
    alt={event.title}
    className="w-full h-auto object-contain"
  />
</div>
      )}

      {/* Content on Right */}
      <div className="p-6 flex flex-col justify-between w-full sm:w-2/3">
        <div>
          <h2 className="text-2xl font-extrabold text-blue-900 mb-3">{event.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{event.description}</p>

          <div className="flex items-center gap-3 text-blue-700 font-semibold mb-2">
            <FaCalendarAlt />
            <span>
              {new Date(event.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-red-600 font-semibold">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">Posted by: {event.createdBy}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Events;
