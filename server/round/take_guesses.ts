import Player from '../player';
import Field from '../field';
import mod from '../tools/mod';

export async function take_guesses(players:Array<Player>,starter_index:number,playingfield:Field,io:any,take_next_guess:any)
{
  console.group("take_guesses"); // debug_stream.write('take_guesses');
  for (let i:number=0;i<players.length;i++)
  {
    let player:Player=players[mod(starter_index+i,players.length)];
    console.log(`guess.waitingFor: ${player.name}`); // debug_stream.write(`guess.waitingFor: ${player.name}`);
    io.emit('guess.waitingFor', player.id);
    player.socket.emit('guess.request');
    playingfield.waiting_for_guess = player.id; /* logging */
    await new Promise( (resolve) => {
      take_next_guess = resolve; // resolve can be triggered from outside by calling 'this.take_next_guess()' in 'this.io.on('guess.response')';
    });
    console.log(`${player.name} guessed: ${player.guess}`); // debug_stream.write(`${player.name} guessed: ${player.guess}`);
    io.emit('playerboard.guess.update',player.name,player.guess,0);
  }
  console.groupEnd();
  /*global variable*/ playingfield.waiting_for_guess=-1; /* logging */
  return 0;
}

export default take_guesses;
