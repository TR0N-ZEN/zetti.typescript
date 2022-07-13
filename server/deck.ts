import base_Deck from './abstract/deck';
import Card from './card';

export class Deck extends base_Deck
{
  constructor()
  {
    super(60);
    let cardIndex = 0;
    ['red','green','blue','yellow'].forEach((color, index) => 
    {
      for (let i:number = 1; i < 14; i++)
      {
        this[cardIndex] = new Card(color,i);
        ++cardIndex;
      }
    });
    for (let i:number = 0; i < 4; i++)
    {
      this[cardIndex] = new Card("Z", i); // Zauberer; each card needs to have unique properties
      ++cardIndex;
    }
    for (let i:number = 0; i < 4; i++)
    {
      this[cardIndex] = new Card("N", i); // Narren each card needs to have unique properties
      ++cardIndex;
    }
  }
}
export default Deck;
