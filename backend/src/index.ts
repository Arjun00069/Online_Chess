import {WebSocketServer} from "ws"
import { GameManager } from "./GameManager";
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 8080 });

// as the sript load initilize a new game manager
const gameManager= new GameManager();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  // functin if user get connected
  ws.on('ConnectGame',(name:string)=>{
    gameManager.addUser(name,ws);
    console.log(`User with ${name} joinde the room`);
  })
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
     
  });
  
  // Afetr leaving game remove user
  ws.on('close',function (){
    gameManager.removeUser(ws);
  })
});