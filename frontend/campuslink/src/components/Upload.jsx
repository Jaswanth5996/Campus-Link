import React, { useState } from 'react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMsg(null);

    if (!title || !subject || !year || !description || !file) {
      setError('Please fill all fields and select a file.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to upload notes.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('year', year);
    formData.append('description', description);
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await fetch('https://campus-link-jd0k.onrender.com/api/notes/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Upload failed');
      }

      const result = await response.json();

      setSuccessMsg('Note uploaded successfully!');

      // Reset form on success
      setTitle('');
      setSubject('');
      setYear('');
      setDescription('');
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center max-w-lg mx-auto p-6 mt-[125px] bg-violet-50 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-violet-700">Upload Notes</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-violet-400 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border border-violet-400 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border border-violet-400 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-violet-400 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
          className="text-violet-700"
        />

        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {successMsg && <p className="text-green-600 font-semibold">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
