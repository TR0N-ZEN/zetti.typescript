import Card from './card';
import Deck from './deck';
import { Playing_stack } from './playing_stack';

export class Field
{
  static colors:Array<string> = ["red", "green", "blue", "yellow"];
  deck:Deck;
  total_rounds:number;
  current_round:number;
  trump:string;
  round_starter:number;
  waiting_for_guess:number;
  current_trick:number;
  trick_starter:number;
  trick:Playing_stack;
  waiting_for_card:number;
  constructor(player_count:number)
  {
    this.deck = new Deck();
    this.total_rounds = 60 / player_count;
    this.current_round=1;
    //this.trump='';
    //this.round_starter=0;
    this.waiting_for_guess=0;
    //this.current_trick=1;
    //this.trick_starter=0;
    this.trick = new Playing_stack(player_count);
    //waiting_for_card=0;
  }
}
export default Field;
