import { randomUUID } from 'crypto';
import { Game } from "./Game"
import { WebSocket } from 'ws';
export class User{
public name:string;
public socket:WebSocket;
public userId :string
constructor(name:string,socket:WebSocket
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
public addUser(name:string,socket:WebSocket){
    const user= new User(name,socket);
    this.users.push(user);
} 
// if user leave remove user from array;
public removeUser (socket:WebSocket){
let newUser= this.users.filter(user=>user.socket!=socket);
this.users =[...newUser]
// stop the game if user leave
}
public initilizeNewGame(){

}
}