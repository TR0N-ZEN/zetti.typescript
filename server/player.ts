import Client from './abstract/client';
import Card from './card'


export class Player extends Client
{
  public name:string;
  public points:number;
  public guess:number;
  public tricks_won:number;
  public hand:Array<Card>;
  public voted:boolean;
  constructor (name:string,socket:any=undefined)
  {
    super(socket);
    this.name = name;
    this.points = 0;
    this.guess = 0;
    this.tricks_won = 0;
    this.hand = [];
    this.voted = false;
  }
  // info ()
  // {
  //   let player = Object.assign({}, this);
  //   delete player.socket;
  //   delete player.hand;
  //   return player;
  // }
  static prep_for_round(player:any)
  {
    player.guess=-1;
    player.tricks_won=0;
    player.hand=[];
  }
  static update_points_branched(player:any)
  {
    console.log(`Player ${player.name}:\n\tguess: ${player.guess}\n\ttricks_won: ${player.tricks_won}.`);
    let delta=player.guess-player.tricks_won;
    if (delta==0) { delta=20+player.tricks_won*10; }
    else
    {
      if (delta>0) { delta*=(-1); }
      delta=(delta*10);
    }
    player.points+=delta;
    console.log(`\thas delta ${delta}\n\tpoints: ${player.points}`);
  }
  // static by_id (id:number, players:any)
  // {
  //   //for (player of players)
  //   for (let a = 0; a < players.length; a++)
  //   {
  //     let player = players[a];
  //     if (player.id == id) { return player } }
  // }
  static update_points(player:any)
  {
    console.log(`Player ${player.name}:\n\tguess: ${player.guess}\n\ttricks_won: ${player.tricks_won}.`);
    let delta:any=player.guess-player.tricks_won;
    delta=
      <number><unknown>(delta==0)*(20+player.tricks_won*10)
      +
      <number><unknown>(delta>0)*delta*(-10)
      +
      <number><unknown>(delta<0)*delta*10;
    player.points+=delta;
    console.log(`\thas delta ${delta}\n\tpoints: ${player.points}`);
  }
  
}

export default Player;