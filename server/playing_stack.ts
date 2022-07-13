import Card from './card';

export class playedCard extends Card
{
  playerID:string;
  constructor(color:string,number:number,playerID:string)
  {
    super(color,number);
    this.playerID=playerID;
  }
}

export class Playing_stack extends Array<playedCard>
{
  position:number;
  constructor(size)
  {
    super(size);
    this.position=0;
  };
}
