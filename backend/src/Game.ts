import { publicDecrypt, randomUUID } from "crypto";
import { GAMECOLOR, CHESSBOARD } from "./Constants";
//      white(0,0)
//     |
// (y) |
//     |___________ (x)
//     (black)(n-1,n-1)

// utility function
function check(srcx: number, srcy: number, destx: number, desty: number) {
  if (
    srcx >= 0 &&
    srcy >= 0 &&
    destx >= 0 &&
    desty >= 0 &&
    srcx <= 7 &&
    srcy <= 7 &&
    destx <= 7 &&
    desty <= 7
  )
    return true;
  return false;
}
function isDiffrent(src: string, dest: string) {
  let flag1: boolean = src === src.toUpperCase();
  let flag2: boolean = dest === dest.toUpperCase();
  if (flag1 === flag2) return false;
  return true;
}
function isValidPawnMove(
  srcx: number,
  srcy: number,
  destx: number,
  desty: number,
  type: string,
  board: string[][]
) {
  if (type === GAMECOLOR[0 % 2]) {
    if (srcx === 1) {
      //case of no attacing
      let case1: boolean =
        (Math.abs(srcx - destx) === 1 ||
          (Math.abs(srcx - destx) === 2 && Math.abs(srcy - desty) === 0)) &&
        board[destx][desty] === ""
          ? true
          : false;
      // case of attacing
      let case2: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 1 &&
        board[destx][desty] != ""
          ? true
          : false;

      return case1 || case2;
    } else {
      // can only move one square
      // case of no attacking
      let case1: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 0 &&
        board[destx][desty] === ""
          ? true
          : false;
      // case of attacing
      let case2: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 1 &&
        board[destx][desty] != ""
          ? true
          : false;

      return case1 || case2;
    }
  } else {
    if (srcx === 6) {
      //case of no attacing
      let case1: boolean =
        (Math.abs(srcx - destx) === 1 ||
          (Math.abs(srcx - destx) === 2 && Math.abs(srcy - desty) === 0)) &&
        board[destx][desty] === ""
          ? true
          : false;
      // case of attacing
      let case2: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 1 &&
        board[destx][desty] != ""
          ? true
          : false;

      return case1 || case2;
    } else {
      // can only move one square
      // case of no attacking
      let case1: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 0 &&
        board[destx][desty] === ""
          ? true
          : false;
      // case of attacing
      let case2: boolean =
        Math.abs(srcx - destx) === 1 &&
        Math.abs(srcy - desty) === 1 &&
        board[destx][desty] != ""
          ? true
          : false;

      return case1 || case2;
    }
  }
  return true;
}
function isValid(
  srcx: number,
  srcy: number,
  destx: number,
  desty: number,
  piece: string
): boolean {
  if (
    srcx < 0 &&
    srcy < 0 &&
    srcx > 7 &&
    srcy > 7 &&
    destx < 0 &&
    desty < 0 &&
    destx > 7 &&
    desty > 7
  )
    return false;
  if (piece.toLocaleLowerCase() === "r") {
    // For rook
    //  moves either on x axis or y axiss so one component will be equsl
    if (srcx === destx || srcy === desty) return true;
  } else if (piece.toLocaleLowerCase() === "n") {
    // For knight
    const knightMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1], // 2 squares in one direction, 1 square in the other
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2], // 1 square in one direction, 2 squares in the other
    ];
    for (let i: number = 0; i < 8; i++) {
      let newdestx: number = srcx + knightMoves[i][0];
      let newdesty: number = srcy + knightMoves[i][1];
      if (newdestx === destx && newdesty === desty) return true;
    }
  } else if (piece.toLocaleLowerCase() === "b") {
    // For bishop
    // if distance covered in x == distance covered in y;
    if (Math.abs(srcx - destx) === Math.abs(srcy - desty)) return true;
  } else if (piece.toLocaleLowerCase() === "q") {
    // for queen
    // combination of bishop and rook
    if (
      Math.abs(srcx - destx) === Math.abs(srcy - desty) ||
      srcx === destx ||
      srcy === desty
    )
      return true;
  } else if (piece.toLocaleLowerCase() === "k") {
    // fro king
    if (Math.abs(srcx - destx) === 1 && Math.abs(srcy - desty) === 1)
      return true;
    if (Math.abs(srcx - destx) === 1 || Math.abs(srcy - desty) === 0)
      return true;
    if (Math.abs(srcx - destx) === 0 || Math.abs(srcy - desty) === 1)
      return true;
  }

  return false;
}
function check_for_white(board:string[][],posx:number,posy:number){
// given position of king and queen check in all eight direction if tere are piece which can capture king
// if there then can king move to save himself

}

class chess {
  public user1_dead_pieces: string[];
  public user2_dead_pieces: string[];
  public board: string[][];
  // turn will deside that if its tun is there or not
  public turn: string;
  constructor() {
    this.user1_dead_pieces = [];
    this.user2_dead_pieces = [];
    this.board = CHESSBOARD;
    // initial white will get turn
    this.turn = GAMECOLOR[0 % 2];
  }
  // this is not for pawns
  public makeMove(
    srcx: number,
    srcy: number,
    destx: number,
    desty: number,
    type: string
  ) {
    if (this.turn != type) return;
    if (check(srcx, srcy, destx, desty) && this.board[srcx][srcy] === "")
      return;
    if (!isValid(srcx, srcy, destx, desty, this.board[srcx][srcy])) return;
    if (this.board[srcx][srcy] === "p" || this.board[srcx][srcy] === "P")
      return;
    if (this.board[destx][desty] != "") {
      if (!isDiffrent(this.board[srcx][srcy], this.board[destx][desty])) return;
      // of diffrent then remove the piece and add to array of removed piece
      if (type === GAMECOLOR[0 % 2]) {
        // current user is white then black looses it piece
        this.user2_dead_pieces.push(this.board[destx][desty]);
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      } else {
        // current user is black then white looses it piece
        this.user1_dead_pieces.push(this.board[destx][desty]);
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      }
    } else {
      this.board[destx][desty] = this.board[srcx][srcy];
      this.board[srcx][srcy] = "";
    }
  }

  // this will move pawn
  public movePawn(
    srcx: number,
    srcy: number,
    destx: number,
    desty: number,
    type: string
  ) {
    if (this.turn != type) return;
    if (check(srcx, srcy, destx, desty) && this.board[srcx][srcy] === "")
      return;
    if (!isValidPawnMove(srcx, srcy, destx, desty, type, this.board)) return;
    if (this.board[srcx][srcy].toLowerCase() != "p" ) return;
    // Now pawn will move for starting it will move  2 steps bu for other
    // it will move only one step
    // for attack it will caputre diagonaly
    if (type === GAMECOLOR[0 % 2]) {
      // if piece is there at dest then move to array
      // white is palying the black wil lose it poece
      if (this.board[destx][desty] === "") {
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      } else {
        this.user2_dead_pieces.push(this.board[destx][desty]);
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      }
    } else {
      // black is playing
      if (this.board[destx][desty] === "") {
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      } else {
        this.user1_dead_pieces.push(this.board[destx][desty]);
        this.board[destx][desty] = this.board[srcx][srcy];
        this.board[srcx][srcy] = "";
      }
    }
  }
  public isFinished(type:string){

   switch (type) {
    case GAMECOLOR[0%2]:
        // check if finished for black or not
        break;
    case GAMECOLOR[1%2]:
     // chec if finished for white or not

        break;
    
   }
  }
}

export class Game {
  public id: string;
  public user1_id: string;
  public user2_id: string;
  public moves: string[];
  public board: chess;
  public user1_color: string;
  public user2_color: string;
  constructor(user1: string, user2: string) {
    (this.id = randomUUID()),
      (this.user1_id = user1),
      (this.user2_id = user2),
      (this.user1_color = GAMECOLOR[0 % 2]);
    this.user2_color = GAMECOLOR[1 % 2];
    this.board = new chess();
    this.moves = [];
  }
}
