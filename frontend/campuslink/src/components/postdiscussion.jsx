import React, { useState } from "react";
import axios from "axios";
import { FiEdit, FiFileText, FiMail, FiSend } from "react-icons/fi";

const PostDiscussion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handlePostDiscussion = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/discussion/postdiscussion/", {
        title,
        description,
        createdBy,
      });
      setSuccess(" Discussion posted successfully!");
      setTitle("");
      setDescription("");
      setCreatedBy("");
    } catch (error) {
      console.error("Error posting discussion:", error);
      setError(" Failed to post discussion. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-semibold text-violet-600 mb-6 text-center">
        <FiEdit className="inline-block mr-2" />
        Post a Discussion
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handlePostDiscussion} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FiEdit className="inline mr-1" /> Title
          </label>
          <input
            type="text"
            placeholder="Discussion Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FiFileText className="inline mr-1" /> Description
          </label>
          <textarea
            placeholder="Describe your topic or question..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FiMail className="inline mr-1" /> Your Email
          </label>
          <input
            type="email"
            placeholder="yourname@example.com"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
        >
          <FiSend />
          Post Discussion
        </button>
      </form>
    </div>
  );
};

export default PostDiscussion;
