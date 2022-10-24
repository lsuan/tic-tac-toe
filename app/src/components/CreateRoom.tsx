import { useState } from "react";

function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  return (
    <section className="create-room w-full">
      <h1 className="mb-20 text-5xl">
        Create a Room
      </h1>
      <form className="create-room-form flex flex-col items-end w-1/2 mx-auto">
        <input type="text" className="room-id rounded-lg p-3 mb-5 w-full text-3xl"
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Name"
        />
        <button className="btn text-3xl rounded-lg w-28 sm:w-48 py-2">
          <i className="fa-solid fa-highlighter mr-2" />
          Create
        </button>
      </form>
    </section>
  );
}

export default CreateRoom;