import {WebSocketServer} from "ws"
import { GameManager } from "./GameManager";
import { v4 as uuidv4 } from 'uuid';
 import url from 'url';
const wss = new WebSocketServer({ port: 8080 });

// as the sript load initilize a new game manager
const gameManager= new GameManager();

wss.on('connection', function connection(ws,req) {
  ws.on('error', console.error);
  // functin if user get connected
  //@ts-ignore
  const name: string|undefined = url.parse(req.url).query.name;
  // get name and add user
    gameManager.addUser(name,ws);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
     
  });
  
  // Afetr leaving game remove user
  ws.on('close',function (){
    gameManager.removeUser(ws);
  })
});