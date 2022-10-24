import { io, Socket } from "socket.io-client";

class SocketService {
  public socket: Socket | null = null;
  public connect(url: string): Promise<Socket<any, any>> {
    return new Promise((resolve, reject) => {
      this.socket = io(url);

      if (!this.socket) {
        return reject("Connection not found");
      }

      this.socket.on("connect", () => {
        resolve(this.socket as Socket);
      });

      this.socket.on("connect_error", (err) => {
        console.log(err);
        reject(`Connection error: ${err}`);
      });
    });
  }
}

export default new SocketService();