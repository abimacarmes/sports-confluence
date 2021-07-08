import React, { Component } from 'react'
import MainContext from './MainContext'
import Game from './Game'

export default class SingleGameView extends Component {
    static contextType = MainContext;

    render() {
        const game_id = parseInt(this.props.match.params.game_id);
        const game = this.context.games.filter(game => game.game_id === game_id)[0];

        let filteredPlayers = this.context.players;
        filteredPlayers = filteredPlayers.filter(player => player.game_id === game_id)

        return (
            <div>
                <Game key={game.game_id} info={game}/>
                {filteredPlayers.map(player =>
                    <div key={player.player_id} className='player'>
                        <h3>{player.name}</h3>
                        <h3>Skill Level: {player.level}</h3>
                        <h3>Comment: {player.comment ? player.comment : "N/A"}</h3>
                    </div>
                )}
            </div>
        )
    }
}

