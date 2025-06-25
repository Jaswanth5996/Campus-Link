import image from '../images/dbms.jpg'
const NoteCard = ({ note }) => {
  const { title, description, uploadedBy, fileUrl } = note;

  return (
    <div className="flex flex-col justify-center items-center hover:cursor-pointer mt-5  my-10 bg-violet-500 font-bold text-white shadow-sm hover:shadow-md transition rounded-xl p-5 border border-gray-400">
      <h3 className="text-3xl text-center font-semibold  text-white-200 mb-2">{title}</h3>
      
      <br />
       <div className="h=[180px] w-[180px]">
        <img src={image}></img>
      </div>
      <p className="text-[20] text-white-80 mb-4 pt-3">{description}</p>
      <div className="text-[15] font-semibold text-white-500 mb-2">Uploaded by <span className="font-medium text-gray-700"><span className="text-[24] font-extrabold text-yellow-200">{uploadedBy?.username}</span>
</span></div>
      <a
        href={fileUrl}
        className="text-center underline inline-block mt-2 text-white-600 hover:text-violet-800 text-sm font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF
      </a>
    </div>
  );
};

export default NoteCard