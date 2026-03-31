import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function TicketDetails() {
 const { id } = useParams();
const navigate = useNavigate();

// ✅ NEW CODE (use this)
const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
const ticket = storedTickets.find(t => String(t.id) === id);

const [ticketData, setTicketData] = useState(ticket);

  const tickets = [
    {
      id: "1",
      title: "Login Bug",
      description: "User unable to login with correct credentials",
      developer: "John",
      status: "In Progress",
      priority: "High",
      createdAt: "2026-03-20",
    },
    {
      id: "2",
      title: "UI Issue",
      description: "Alignment problem in dashboard page",
      developer: "Mike",
      status: "Open",
      priority: "Medium",
      createdAt: "2026-03-22",
    },
  ];
  

  //const ticket = tickets.find(t => t.id === id);
  //const [ticketData, setTicketData] = useState(ticket);
  // 🔹 Modal states
const [isStatusOpen, setIsStatusOpen] = useState(false);
const [isCommentOpen, setIsCommentOpen] = useState(false);

// 🔹 Update status
const [status, setStatus] = useState(ticket?.status);
const [isRatingOpen, setIsRatingOpen] = useState(false);
const [rating, setRating] = useState(0);

// 🔹 Comments
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");

  if (!ticket) return <h2>❌ Ticket not found</h2>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/tickets")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">🎫 Ticket Details</h2>

          <span className={`px-3 py-1 rounded-full text-sm ${
            ticket.status === "Open"
              ? "bg-yellow-100 text-yellow-700"
              : ticket.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}>
            {ticket.status}
          </span>
        </div>
        

        {/* GRID DETAILS */}
        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Ticket ID</p>
            <p className="font-medium">#{ticket.id}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Priority</p>
            <p className={`font-medium ${
              ticket.priority === "High"
                ? "text-red-500"
                : ticket.priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}>
              {ticket.priority}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Title</p>
            <p className="font-semibold">{ticket.title}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created Date</p>
            <p>{ticket.createdAt}</p>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm">Description</p>
          <p className="mt-1">{ticket.description}</p>
        </div>

        {/* DEVELOPER */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm">Assigned Developer</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              👨
            </div>
            <span className="font-medium">{ticket.developer}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex gap-3">
            <button
    onClick={() => setIsRatingOpen(true)}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Complete
  </button>
          <button
  onClick={() => setIsStatusOpen(true)}
  className="px-4 py-2 bg-indigo-600 text-white rounded"
>
  Update Status
</button>
          <button
  onClick={() => setIsCommentOpen(true)}
  className="px-4 py-2 bg-gray-200 rounded"
>
  Add Comment
</button>
        </div>
       

      </div>
      {isStatusOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-80">

      <h3 className="font-semibold mb-4">Update Status</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={() => setIsStatusOpen(false)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            ticket.status = status; // ✅ update
            setIsStatusOpen(false);
          }}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
{isCommentOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">

      <h3 className="font-semibold mb-4">Add Comment</h3>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write comment..."
        className="w-full border p-2 mb-4 rounded"
      />

      <div className="flex justify-between">
        <button
          onClick={() => setIsCommentOpen(false)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setComments([...comments, newComment]); // ✅ save
            setNewComment("");
            setIsCommentOpen(false);
          }}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
{isRatingOpen && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    
    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

      <h3 className="text-lg font-semibold mb-4">⭐ Rate Developer</h3>

      {/* ⭐ STAR RATING */}
      <div className="flex justify-center gap-2 mb-4">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsRatingOpen(false)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setTicketData({ ...ticketData, status: "Closed" }); // ✅ update
            setIsRatingOpen(false);
           navigate("/notification");
          }}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>

    </div>

  </div>
)}
    </div>
  );
}