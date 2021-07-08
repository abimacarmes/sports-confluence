import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MainContext from './MainContext'

import Game from './Game';
import Filter from './Filter';

export default class GameList extends Component {
    static contextType = MainContext;

    render() {
        const filters = this.context.filters;
        
        //remove to be replaced with context games
        let games = this.context.games;

        //Applies the combination of folders selected by the user.
        if(filters.city){
            games = games.filter(game => game.address.split(', ')[1] === filters.city)
        }
        if(filters.sport){
            games = games.filter(game => game.sport === filters.sport)
        }

        //If the selected filters do not have results, display a message.
        var noResults = "";
        if(!games){
            noResults = `There are currently no games that fit your filter criteria - please add your own to keep the party going!`
        }

        return (
            <div>
                <button><Link to='/add-game'>Add New Game</Link></button>
                <Filter/>
                <div>
                    {games.map(game => <Game key={game.game_id} info={game}/> )}
                    <p>{noResults}</p>
                </div>
            </div>
        )
    }
}