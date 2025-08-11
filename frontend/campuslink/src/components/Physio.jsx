import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Physio = () => {
    const navigate= useNavigate()
    const [selectedId, setSelectedId] = useState(null);
    const [impairments,setImpairments] = useState([])

    const fetchdata = async () => {
        try
        {const response= await axios.get("http://localhost:5000/api/physio")
        setImpairments(response.data)
        }catch(err){
            console.log("error fetching data",err)
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    const gotopost=(impairments)=>{
        navigate(`/detail/${impairments._id}`,{state:{title:impairments.title,content:impairments.content,id:impairments._id}})
    }

    const handleToggle = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    return (
        <div className="flex flex-col items-center text-left p-4 bg-gray-50 min-h-screen">
            <div className="text-3xl p-8 text-center font-bold text-gray-800">Neurological Disorder Impairments</div>
            <div className="w-full max-w-2xl">
                    {impairments.map((impairment) => {
      const isOpen = selectedId === impairment._id;
      return (
        <div key={impairment._id} className="mb-4">
          <div
            className="font-bold border rounded-lg p-5 text-xl bg-white shadow-sm flex justify-between items-center cursor-pointer"
            onClick={() => handleToggle(impairment._id)}
          >
            <span>{impairment.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                gotopost(impairment);
              }}
              className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded"
            >
              View
            </button>
          </div>

          {isOpen && (
            <div className="border border-t-0 rounded-b-lg p-5 bg-white text-gray-700">
              <p>{impairment.content}</p>
            </div>
          )}
        </div>
      );
    })}
            </div>
        </div>
    );
}

export default Physio;