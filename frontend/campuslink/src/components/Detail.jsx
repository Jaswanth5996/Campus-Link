// DetailPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`https://campus-link-jd0k.onrender.com/api/physio/${id}`);
        console.log(data)
        setData(res.data);
      } catch (err) {
        console.error("Error fetching detail", err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {data.postId.title}
      </h1>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{data.postId.content}</p>
      </div>

      {/* Condition */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Condition</h2>
        <p className="text-gray-700 leading-relaxed">{data.condition}</p>
      </div>

      {/* Physiotherapy Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">
          Physiotherapy Management
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {data.pt_manage}
        </p>
      </div>
    </div>
  );
};

export default DetailPage;
