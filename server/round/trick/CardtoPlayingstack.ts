import Player from '../../player';
import Field from '../../field';
import { playedCard } from '../../playing_stack';


export function CardtoPlayingstack(color:string,number:number,player:Player,field:Field):number
{
  for (let i:number=0;i<player.hand.length;i++)
  {
    if (player.hand[i].color==color&&player.hand[i].number==number)
    {
      player.hand.splice(i,1);
      let pos_on_stack = field.trick.push(new playedCard(color,number,player.socket.id)) - 1; //position in trick matches position of player who played the card in this.players
      console.log(`card.update: ${color} ${number} on position ${pos_on_stack} by ${player.name}`);
      return pos_on_stack;
    }
  }
  return -1;
}

export default CardtoPlayingstack;