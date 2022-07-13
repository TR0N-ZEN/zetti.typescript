import mod from './tools/mod';
import get_random_element from './tools/get_random_element';
import delay from './tools/delay';

import Player from './player';
import Card from './card';
import Field from './field';
// import { SetRounds, GetRounds, eval_command } from './commands';
import CardtoPlayingstack from './round/trick/CardtoPlayingstack';
import { play_round } from './round';

export class Game
{
  private io:any;
  private players:Array<Player>;
  private is_running:boolean;
  private field:Field;
  private go_on = (x:any) => {  };
  constructor(io)
  {
    if (io==undefined) { console.log("class Zetti: io undefined"); }
    this.io=io;
    this.is_running=false;
    //LISTENERS------------------------------------------------------------------------
    /*
    * card
    *  .toPlayingstack
    * guess.
    *   .response
    */
    this.io.on('connection',(socket) => { //parameter of the callbackfunction here called 'socket' is the connection to the client that connected
      socket.on('card.toPlayingstack',(color:string,number:number) => {
        let player:Player=this.players.filter((player) => {player.socket.id==socket.id})[0];
        let pos_on_stack:number=CardtoPlayingstack(color,number,player,this.field);
        socket.broadcast.emit('card.update',color,number,pos_on_stack);
        this.go_on("LaL"); //resolves Promise in this.play_trick()'s loop
      });
      socket.on('guess.response',(guess:number) => {
        let i:number;
      });
    });
  }
  clear_game()
  {
  }
  //EMITTER---------------------------------------------------
  /*
  * login.
  *   successful
  *  unsuccessful
  * playerboard.
  *  update
  *   names
  *  points
  * vote.
  *  update
  * game.
  *  start
  *  round
  *     .start
  *    .end
  * trick
  *   .start
  *  .end
  * card.
  *  distribute //cards on hand
  *  update //card on stack
  * points
  *  .update
  * guess
  *  .update
  * changeCSS
  * */
  async showresumee(players:Array<Player>)
  {
    console.log("Resumee"); // debug_stream.write("Resumee");
    console.table(players);
    await delay(30000);
  }
  async game(players:Array<Player>,playingfield:Field,round:number = 1)
  {
    console.log("game"); // debug_stream.write("after game(): ");
    console.table(players); players.forEach((player)=>{player.points=0}); console.table(players);
    playingfield.current_round=round; /* logging */
    do 
    {
      let trump:string=get_random_element(Field.colors);
      playingfield.trump=trump; /* logging */
      console.log(`trump is ${trump}`); // debug_stream.write(`trump : ${trump}`);
      await play_round(players,playingfield,trump,this.io);
      await delay(3000);
      playingfield.current_round++;
    } while (playingfield.current_round<=playingfield.total_rounds)
    var message = "in 40 seconds you can reload this website and start a new round after loggin in again."
    /*global variable*/ this.io.emit('MessageFromServer', message);
    await this.showresumee(players);
    this.clear_game();
    var message = "Please reload the website to login again in order to start a new round :-)";
    /*global variable*/ this.io.emit('MessageFromServer',message);
    console.log("process terminating"); // debug_stream.write("process terminating");
  }


  //DEBUGING------------------------------------------------------
  //  changeCSS(element_selector, property, value, player_id, player_socket = undefined)
  // {
  //   if (player_socket == undefined)
  //   {
  //     let player = Player.by_id(player_id, /*global variable*/ this.players);
  //     player.socket.emit('changeCSS', element_selector,  property, value);
  //   }
  //   else if (player_id == undefined)
  //   {
  //     player_socket.emit('changeCSS', element_selector,  property, value);
  //   }
  // }
}

export default Game;
