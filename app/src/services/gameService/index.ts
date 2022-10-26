import { Socket } from "socket.io-client";
import Character from "src/character";


type Player = {
  name: string,
  character: Character,
}

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => resolve(true));
      socket.on("room_join_error", ({error}) => reject(error));
    });
  }

  public async updateGame(socket: Socket, board: number[]) {
    socket.emit("update_game", { board: board });
  }

  public async onGameUpdate(socket: Socket, listener: (board: number[]) => void) {
    socket.on("on_game_update", ({board}) => listener(board));
  }

  public async onStartGame(socket: Socket, listener: (player: Player) => void) {
    socket.on("start_game", ({player}) => listener(player));
  }
}

export default new GameService();