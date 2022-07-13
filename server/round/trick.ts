import Player from '../player';
import { playedCard } from '../playing_stack';
import mod from '../tools/mod';
import Field from '../field';

export async function play_trick(players:Array<Player>,trick_starter_index:number,trick:Array<playedCard>,io:any,field:Field,go_on:any)
{
  // this  is waiting for resolves triggered in 'this.io.on('card.toPlayingstack')' by  call 'this.go_on()'
  console.group("play_trick"); // debug_stream.write('play trick()');
  // Requesting the players to put a card to the table.
  for (let i:number=0;i<players.length;i++)
  {
    let player = players[mod(trick_starter_index+i,players.length)];
      console.log(`card.waitingFor  ${player.name}`); // debug_stream.write(`card.waitingFor ${player.name}`);
      io.emit('card.waitingFor', player.name);
      player.socket.emit('card.request', trick.length);
      field.waiting_for_card = player.id;  /* logging */
      await new Promise((resolve) => { go_on = resolve; }); // Card is put on playingfield.trick in 'this.io.on('card.toPlayingstack')'.
  }
  console.groupEnd();
  this.field.waiting_for_card = -1; /* logging */
  return 0;
}

export default play_trick;