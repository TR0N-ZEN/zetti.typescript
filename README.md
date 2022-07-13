```mermaid
flowchart TB
server --> game --> round
subgraph round
  distribute_cards --> take_guesses --> trick --> best_card
  subgraph trick
    to_serve --> CardtoPlayingstack
  end
end
```
