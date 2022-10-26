import React, { useEffect, useState } from "react";
import { setIsInRoom } from "src/features/onlineRoom/onlineRoomSlice";
import gameService from "src/services/gameService";
import socketService from "src/services/socketService";
import { useAppDispatch, useAppSelector } from "src/states/hooks";
import CharacterSelect from "./CharacterSelect";

const connectSocket = async () => {
  const port = process.env.REACT_APP_PORT;
//   const socket = io(`http://localhost:${port}`);
  const socket: any = await socketService.connect(`http://localhost:${port}`);
}

function CreateRoom() {
  useEffect(() => {
    connectSocket();
  }, []);

  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const dispatch = useAppDispatch();
  const isInRoom = useAppSelector((state) => state.onlineRoom.isInRoom);

  const handleJoining = async (e: React.FormEvent) => {
    e.preventDefault();
    const socket = socketService.socket;
    if (!roomId || roomId.toLowerCase().trim() === "" || !socket) {
      return;
    }

    setIsJoining(true);
    console.log(roomId);

    const joined = await gameService.joinGameRoom(socket, roomId).catch((err) => {
      alert(err);
    });

    if (joined) {
      console.log(isInRoom);
      dispatch(setIsInRoom(true));
      console.log(isInRoom);
    }

    setIsJoining(false);

  }
  return (
    <>
      <section className="create-room w-full">
        <h1 className="mb-20 text-5xl">
          Create/Join a Room
        </h1>
        <form 
          className="create-room-form flex flex-col items-end w-1/2 mx-auto" 
          onSubmit={handleJoining}
        >
          <input type="text" className="room-id rounded-lg p-3 mb-5 w-full text-3xl"
            value={roomId} 
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Name"
          />
          <button type="submit" disabled={isJoining} className="btn text-3xl rounded-lg w-28 sm:w-48 py-2">
            { isJoining ? "Joining..." : (
              <>
                <i className="fa-solid fa-highlighter mr-2" />
                Confirm
              </>
              )
            }
          </button>
        </form>
      </section>
      {
        isInRoom && <CharacterSelect roomId={roomId}/>
      }
    </>
  );
}

export default CreateRoom;