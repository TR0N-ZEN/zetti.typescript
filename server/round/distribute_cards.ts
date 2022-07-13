import Card from '../card';
import Player from '../player';

export function distribute_cards(amount_per_player:number,deck:Array<Card>,players:Array<Player>)
{
  console.log("distribute_cards"); // debug_stream.write('distribute_cards');
  let i:number = 0;
  //for (player of players)
  for (let a:number=0;a<players.length;a++)
  {
    let player:any=players[a];
    for (let j:number=0;j<amount_per_player;j++) { player.hand.push(deck[i*amount_per_player+j]); }
    player.socket.emit('card.distribute',JSON.stringify(player.hand));
    i++;
  }
}

export default distribute_cards;

