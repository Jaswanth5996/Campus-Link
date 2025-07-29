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

  // Post new event
  const postEvents = async () => {
    if (!title || !description || !date || !location || !imageUrl || !createdBy) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/events/post", {
        title,
        description,
        date,
        location,
        imageUrl,
        createdBy,
      });
      console.log("Event posted:", response.data);
      setError(null);
      // Clear form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImageUrl('');
      setCreatedBy('');
      // Refresh events
      fetchEvents();
    } catch (err) {
      console.error("Error posting event:", err);
      setError("Failed to post event. Please try again later.");
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events/");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    }
  };

  // Fetch events on component mount
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col"
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="rounded-md w-full h-40 object-cover mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{event.description}</p>

            <div className="text-sm text-gray-500 space-y-2 mt-auto">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <span>
                  {new Date(event.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{event.location}</span>
              </div>
              <p className="text-xs text-gray-400">Posted by: {event.createdBy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
