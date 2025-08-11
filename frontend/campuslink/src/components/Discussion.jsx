import React, { useState, useEffect } from "react";
import axios from "axios";
import PostDiscussion from './postdiscussion.jsx'; // ✅ Correct default import for component

const Discussion = () => {
  const [discussion, setDiscussion] = useState([]);
  const [error, setError] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false); // toggle form

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/discussion/fetchalldiscussions/");
      setDiscussion(response.data);
    } catch (err) {
      console.error("Error fetching discussions:", err);
      setError("Failed to fetch discussions. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
<div className="discussion-container p-4">
  <div className="discussion-list mb-6">
    {discussion.map((item) => (
      <div key={item._id} className="discussion-item border p-4 rounded mb-4 shadow">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p>{item.description}</p>
        <p><strong>Created By:</strong> {item.createdBy}</p>
        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      </div>
    ))}
  </div>

  {showPostForm && (
    <div className="mt-10">
      <PostDiscussion />
    </div>
  )}

  <button
    onClick={() => setShowPostForm(!showPostForm)}
    className="fixed bottom-[30px] px-12  py-10 right-[100px] z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 font-semibold text-xl"
  >
    {showPostForm ? "Close" : "Have a Doubt ? Ask" }
  </button>
</div>
  );
};

export default Discussion;
