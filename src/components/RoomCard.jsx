import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{room.name}</h5>
        <p className="card-text">
          <strong>Number:</strong> {room.number}
          <br />
          <strong>Price:</strong> ${room.price}
          <br />
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${room.status === "available" ? "bg-success" : "bg-secondary"}`}
          >
            {room.status}
          </span>
        </p>
        {room.status === "available" && (
          <Link
            to={`/user/book-room?roomId=${room._id}`}
            className="btn btn-primary"
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
