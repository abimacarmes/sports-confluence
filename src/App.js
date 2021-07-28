import React, { Component } from 'react'
import {Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';

import MainContext from './MainContext'

import Homepage from './Homepage'
import GameList from './GameList'
import AddGame from './AddGame';
import SingleGameView from './SingeGameView';

const API_URL_BASE = "https://glacial-atoll-16614.herokuapp.com/api"

export default class App extends Component {
    static contextType = MainContext;
    state = {
        games: [],
        players: [],
        filters: {
            city: '',
            sport:''
        }
    }

    //Loads backend data upon page load.
    componentDidMount(){
        fetch(`${API_URL_BASE}/games`)
        .then(gamesResult => {
            if(!gamesResult.ok){
                throw new Error('Something went wrong.');
            }
            return gamesResult.json()
        })
        .then(gamesJson => {
            this.setState({
                games: gamesJson
            })
        })
        .catch(error =>
            console.log(error.message)
        )

        fetch(`${API_URL_BASE}/players`)
        .then(playersResult => {
            if(!playersResult.ok){
                throw new Error('Something went wrong.');
            }
            return playersResult.json()
        })
        .then(playersJson => {
            this.setState({
                players: playersJson
            })
        })
        .catch(error => {
            console.log(error.message)
        })
        
    }
    
    //Upon submission of a new Game for backend.
    addGame = (game) => {
        const oldGames = this.state.games
        game.game_id = oldGames.length+1;

        oldGames.push(game)

        this.setState({
            games: oldGames
        })

        fetch(`${API_URL_BASE}/games`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "game_id":`${game.game_id}`,
                "name":`${game.name}`,
                "sport": `${game.sport}`,
                "location_name":`${game.location_name}`,
                "address":`${game.address}`,
                "players":`${game.players}`,
                "date":`${game.date}`
            })
          }
        )
        .then(result => {
            if(!result.ok){
                throw new Error('Something went wrong.')
            }
            return result.json()
        })
        .catch(error => {
            console.log(error.message)
        })        
        
    }


    //Upon submission of a new player RSVPing for backend.
    addPlayer = (player) => {
        const oldPlayers = this.state.players;
        player.player_id = oldPlayers.length+1;
        oldPlayers.push(player)

        this.setState({
            players: oldPlayers
        })

        fetch(`${API_URL_BASE}/players`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "player_id":`${player.player_id}`,
                "name":`${player.name}`,
                "level":`${player.level}`,
                "comment":`${player.comment}`,
                "game_id":`${player.game_id}`
            })
          }
        )
        .then(result => {
            if(!result.ok){
                throw new Error('Something went wrong.')
            }
            return result.json()
        })
        .catch(error => {
            console.log(error.message)
        }) 
    }
    
    //Context function for updating the filters
    updateFilter = (city, sport) => {
        console.log('Filter: ' + city + ' ' + sport);

        this.setState({
            filters: {
                city: city,
                sport: sport
            }
        })
    }
    
    //Creates routes for website
    mainRoutes = () => {
        return(
            <>
                <Route exact path='/' component={Homepage}/>
                <Route exact path='/games' component={GameList}/>
                <Route path='/add-game' component={AddGame}/>
                <Route path='/games/:game_id' component={SingleGameView}/>
            </>
        )
    }

    render(){
        const contextValue = {
            filters: this.state.filters,
            updateFilter: this.updateFilter,
            games: this.state.games,
            players: this.state.players,
            addGame: this.addGame,
            addPlayer: this.addPlayer
        }       

        return(
            <BrowserRouter>
                <MainContext.Provider value={contextValue}>
                    
                    <header className='header'>
                        <Link to='/games'><h1>Sports Confluence</h1></Link>
                    </header>
                        <main className='app'>
                            {this.mainRoutes()}
                        </main>
                </MainContext.Provider>
            </BrowserRouter>
            
        )
    }
}
