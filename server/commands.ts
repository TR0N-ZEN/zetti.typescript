export function SetRounds(number:number, playingfield:any, io:any) { playingfield.total_rounds = number; GetRounds(playingfield, io); }
export function GetRounds(playingfield:any, io:any) { io.emit("MessageFromServer", `Server: In total u have ${playingfield.total_rounds} to play.`); }
export function eval_command(string:string, io:any, playingfield:any)
{
  let word = string.split(" ");
  let Verb = word[0];
  let Noun = word[1];
  let Value = word[2];
  if(Verb == "Set" && Noun == "Rounds") { SetRounds(Value, playingfield, io); }
  if(Verb == "Get" && Noun == "Rounds") { GetRounds(playingfield, io); }
}
