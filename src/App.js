import React, { Component } from 'react'
import {Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';

import MainContext from './MainContext'

import Homepage from './Homepage'
import Game from './Game'
import GameList from './GameList'
import STORE from './dummy-store';
import AddGame from './AddGame';
import Filter from './Filter';

//import STORE from './old/dummy-store';

//const API_URL_BASE = "https://enigmatic-basin-32386.herokuapp.com/api"

export default class App extends Component {
    static contextType = MainContext;
    state = {
        filters: {
            city: '',
            sport:''
        }
    }  

    //Loads backend data upon page load.
    componentDidMount(){
        /*
        fetch(`${API_URL_BASE}/spaces`)
        .then(spacesResult => {
            if(!spacesResult.ok){
                throw new Error('Something went wrong.');
            }
            return spacesResult.json()
        })
        .then(spacesJson => {
            this.setState({
                spaces: spacesJson
            })
        })
        .catch(error =>
            console.log(error.message)
        )
        */
    }
    
    //Upon submission of a new Game for backend.
    addSpace = (game) => {
        console.log('Adding Game')
        //const oldGames = this.state.games

        //oldGames.push({new addition})

        this.setState({
            //spaces: oldGames
        })
        
        /*
        fetch(`${API_URL_BASE}/spaces`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "name":`${name}`,
                "address":`${address}`,
                "city":`${city}`,
                "type":`${type}`
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
        */
    }


    //Upon submission of a new player RSVPing for backend.
    addPlayer = (player) => {
        console.log('Add player');
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
                <Route path='/games' component={GameList}/>
                <Route path='/add-game' component={AddGame}/>
            </>
        )
    }

    render(){
        const contextValue = {
            filters: this.state.filters,
            updateFilter: this.updateFilter,
            games: STORE.games,
            players: STORE.players

        }       

        return(
            <BrowserRouter>
                <MainContext.Provider value={contextValue}>
                    <header>
                        <Link to='/games'><h1>Sports Confluence</h1></Link>
                    </header>
                    <div className='app'>
                            <main>
                                {this.mainRoutes()}
                            </main>
                    </div>
                </MainContext.Provider>
            </BrowserRouter>
            
        )
    }
}
