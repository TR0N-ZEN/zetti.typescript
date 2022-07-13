import Player from './player';
import Field from './field';
import mod from './tools/mod';
import delay from './tools/delay';
import { Playing_stack } from './playing_stack';
import take_guesses from './round/take_guesses';
import play_trick from './round/trick';
import best_card from './round/trick/best_card';
import distribute_cards from './round/distribute_cards';

export async function play_round(players:Array<Player>,playingfield:Field,trump:string,io:any,trick:number=1)
{
    console.group(`play round ${playingfield.current_round}`);
  playingfield.current_trick=trick; /* logging */
  let starter_index=mod((playingfield.current_round-1),players.length); //needs to be available between iterations of the following looped block
  playingfield.trick_starter=starter_index; /* logging */
  io.emit('game.round.start',playingfield.current_round,trump);
  players.forEach((player) => Player.prep_for_round(player));
  playingfield.deck.shuffle();
  distribute_cards(playingfield.current_round,playingfield.deck,players);
  let take_next_guess = (x:any) => {  };
  await take_guesses(players,starter_index,playingfield,io,take_next_guess);
    console.table(players);
  let go_on = (x:any) => {  };
  do
  {
    playingfield.trick = new Playing_stack(players.length);
    io.emit('game.trick.start');
    await play_trick(players,starter_index,playingfield.trick,io,playingfield,go_on); // appends cards to 'playingfield.trick' in "this.io.on('card.toPlayingstack')"
      console.table(playingfield.trick);
    let winner_index = mod((starter_index+best_card(playingfield.trick,trump)),players.length);
    let winner = players[winner_index];
    ++winner.tricks_won;
      console.log(`winner: ${winner.name}`); // debug_stream.write(`winner: ${winner.name}`);
    await delay(1000);
    io.emit('playerboard.guess.update',winner.name,winner.guess,winner.tricks_won);
    winner.socket.emit('info.guess.update',(winner.guess-winner.tricks_won)); // updates the winner's "Noch zu holen: " field
    await delay(2000);
    io.emit('game.trick.end'); //for clearing playingfield from cards on this.players
    starter_index = winner_index;
    playingfield.trick_starter = starter_index; /* logging */
    ++playingfield.current_trick;
  } while(playingfield.current_trick<=playingfield.current_round)
  io.emit('info.guess.update');
  players.forEach((player)=>{Player.update_points(player);}); //calculate points after each round
    console.log("after update_points(): "); // debug_stream.write("after update_points(): ");
    console.table(players);
  //this.io.emit("playerboard.update", JSON.stringify(Player.info(players)));
    console.groupEnd();
  io.emit('game.round.end');
}
