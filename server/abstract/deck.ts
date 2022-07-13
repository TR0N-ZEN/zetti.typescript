import Card from '../card';

export class Deck extends Array<Card>
{
  shuffle = function():number
  {
    for (let i:number = this.length - 1; i > 0; i--)
    {
      let j:number = Math.floor(Math.random() * i);
      let k:number = this[i];
      this[i] = this[j];
      this[j] = k;
    }
    return 0;
  }
  constructor(size:number) {super(size);}
}

export default Deck;
