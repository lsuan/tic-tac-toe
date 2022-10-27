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
  const [playerName, setPlayerName] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const isInRoom = useAppSelector((state) => state.onlineRoom.isInRoom);
  const gameMode = useAppSelector((state) => state.board.gameMode);
  const players = useAppSelector((state) => state.board.players);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (roomId.trim() === "" || playerName.trim() === "") {
      return;
    }

    setCanProceed(true);
  }

  
  return (
    <>
      {
        !canProceed && 
          <section className="create-room w-full">
            <h1 className="mb-20 text-5xl">
              Create/Join a Room
            </h1>
            <form 
              className="create-room-form flex flex-col items-end w-1/2 mx-auto" 
              onSubmit={handleSubmit}
            >
              <input type="text" className="room-id rounded-lg p-3 mb-5 w-full text-3xl"
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room Name"
              />
              <input type="text" className="room-id rounded-lg p-3 mb-5 w-full text-3xl"
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your Name"
              />
              <button type="submit" className="btn text-3xl rounded-lg w-28 sm:w-48 py-2">
                Next
                <i className="fa-regular fa-hand-point-right ml-2" />
              </button>
            </form>
          </section>
      }
      {
        gameMode === "pvp" && players.length == 0 && canProceed && <CharacterSelect roomId={roomId} playerName={playerName}/>
      }
    </>
  );
}

export default CreateRoom;