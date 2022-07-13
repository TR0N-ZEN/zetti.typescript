import { playedCard } from "../../playing_stack";
import to_serve from "./to_serve";

export function best_card(trick:Array<playedCard>,trump:string)
{
  let color_to_serve:string = to_serve(trick);
  if (color_to_serve == "N") { return 0; }// der Only-Enno Fall
  let high_card_index:number = 0;
  let high_card:playedCard = trick[high_card_index];
  let index:number = 0;
  let trump_played:boolean = false;
  for (let a=0;a<trick.length;a++) { let card:playedCard=trick[a];
    switch(card.color)
    {
      case(trump):
        // console.log("Trump has been played."); debug_stream.write();
        if (high_card.color!=trump)
        {
          // console.log("Trump has been played for the first time."); debug_stream.write();
          trump_played=true;
          high_card_index=index;
          high_card=card;
        }
        else if (card.number>high_card.number)
        {
          high_card_index = index;
          high_card = card;
          // console.log("Topped."); debug_stream.write();
        }
        break;
      case(color_to_serve):
        if (!trump_played&&card.number>high_card.number)
        {
          high_card_index = index;
          high_card = card;
          // console.log("Topped."); debug_stream.write();
        }
        break;
      case("Z"):
        // console.log("der erste Zetti ist geflogen"); debug_stream.write();
        return index;
      default:
        console.log("This card doesn't compete.");  // debug_stream.write("This card doesn't compete.");
    }
    index++;
  }
  // console.log(high_card_index); debug_stream.write();
  return high_card_index;
}

export default best_card;
