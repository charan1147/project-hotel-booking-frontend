import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <div>
      <p>
        <strong>Name:</strong> {room.name}
      </p>
      <p>
        <strong>Number:</strong> {room.number}
      </p>
      <p>
        <strong>Price:</strong> ${room.price}
      </p>
      <p>
        <strong>Description:</strong> {room.description}
      </p>
      <p>
        <strong>Status:</strong> {room.status}
      </p>

      {room.status === "available" && (
        <Link to={`/user/book-room?roomId=${room._id}`}>Book Now</Link>
      )}
    </div>
  );
}

export default RoomCard;
