let STORE = {
  "games": [
    {
      "game_id": 1,
      "name":"party soccer",
      "sport": "Soccer",
      "location_name":"Park Park",
      "address":"123 place lane, Toronto",
      "players": 7,
      "date":"08/08/2021"
    },
    {
      "game_id": 2,
      "name":"crush em football",
      "sport": "Football",
      "location_name":"Park Park",
      "address":"123 place lane, Vancouver",
      "players": 12,
      "date":"08/08/2021"
    }
  ],
  "players": [
    {
      "player_id": 1,
      "name":"Bob",
      "level":"Olympic",
      "game_id": 1,
      "comment":"blah blah blah"
    },
    {
      "player_id": 2,
      "name":"Terry",
      "level":"Olympic",
      "game_id": 1,
      "comment":"blah blah blah"
    },
    {
      "player_id": 3,
      "name":"Ralph",
      "level":"Olympic",
      "game_id": 1,
      "comment":"blah blah blah"
    },
    {
      "player_id": 4,
      "name":"Bob",
      "level":"Olympic",
      "game_id": 2,
      "comment":"blah blah blah"
    }
  ]
}

export default STORE;