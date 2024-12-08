import { randomUUID } from 'crypto';
import { Game } from "./Game"
import { WebSocket } from 'ws';
import { INIT_GAME, MOVE, PAWNMOVE } from './Constants';
export class User{
public name:string|undefined;
public socket:WebSocket;
public userId :string
constructor(name:string|undefined,socket:WebSocket
){
this.name=name;
this.socket=socket;
this.userId=randomUUID();
}
}
export class GameManager {
private game : Game[];
private users : User [];
private Intresteduser:User | null
constructor (){
    this.game  =  [];
    this.users =[];
    this.Intresteduser=null;

}
// useer join add user to array
public addUser(name:string|undefined,socket:WebSocket){
    const user= new User(name,socket);
    this.users.push(user);
    // call add handelr for furture work
    this.addHandler(user);
} 
// if user leave remove user from array;
public removeUser (socket:WebSocket){
let newUser= this.users.filter(user=>user.socket!=socket);
this.users =[...newUser]
// stop the game if user leave
}

private addHandler(user:User){
   user.socket.on('message',async (data)=>{
    const message = JSON.parse(data.toString());
     // wheneveer any user emmit messe it will ome to this handler and we will cheak its type
    const type :string =message.type
    if(type === INIT_GAME){
     if(this.Intresteduser===null) this.Intresteduser=user;
     else {
        // initilize and start game
        const new_game = new Game(this.Intresteduser.userId,user.userId);
        //push the game to an array
        this.game.push(new_game);
     }
    }
    else if (type===MOVE){
   // normal move not pown move
   // check which user is making move user1 or user 2(i.e white or black)
    // make move
    // check for check mate
    // give result to clinet
    }
    else if(type===PAWNMOVE){

    }
   })
}

}