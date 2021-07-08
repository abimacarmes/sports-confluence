import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import MainContext from './MainContext'
import Game from './Game'

export default class AddGame extends Component {
    static contextType = MainContext;
    constructor (props){
        super(props);
        this.newGameLocation = React.createRef();
        this.newGameName = React.createRef();
        this.newGameSport = React.createRef();
        this.newGamePlayers = React.createRef();
        this.newGameDate = React.createRef();
        
    }

    state = {
        displaySearch: false,
        locationResults: {},
        gameInfo: {},
        errorMessage:''
    }

    //Upon submission of the form for searching a location
    gameLocationSearch = event => {
        event.preventDefault();

        const today = new Date();
        let submittedDate = new Date(Date.parse(this.newGameDate.current.value));
        let submittedTime = submittedDate.getHours() + ':' + submittedDate.getMinutes()

        this.setState({
            //Displays the sample new Space
            displaySearch:false,
            errorMessage:''
        })

        //Make sure the date is valid
        if(submittedDate > today){
            var searchResult = {}
            submittedDate = submittedDate.toLocaleDateString() +" "+ submittedTime;
            //Ensures the correct formatting for search
            const formattedSearch = this.newGameLocation.current.value.split(' ').join('%20');

            fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedSearch}&inputtype=textquery&fields=formatted_address,name,photos&key=AIzaSyB0ksRosNOMHsE-YH4uj5eB27eW0fHwdlc`)
            .then(searchResult => {
                if(!searchResult.ok){
                    throw new Error('Something went wrong.');
                }
                return searchResult.json()
            })
            .then(searchJson => {
                searchResult = searchJson.candidates[0];
                this.setState({
                    displaySearch: true,
                    locationResults: searchResult,
                    gameInfo: {
                        "name": this.newGameName.current.value,
                        "sport": this.newGameSport.current.value,
                        "location_name": searchResult.name,
                        "address": searchResult.formatted_address,
                        "players": this.newGamePlayers.current.value,
                        "date": submittedDate
                    }
                });
            })
            .catch(error =>
                console.log(error.message)
            )

            
        }

        
    }

    //Upon submission of the searched space to add to database
    submitNewGame = event => {
        event.preventDefault();

        this.context.addGame(this.state.gameInfo)
        this.props.history.push('/games')
    }

    render() { 
        let sampleGame;
        let sampleConfirmButton;
        let errorMessage = this.state.errorMessage;

        const sports = [...new Set(this.context.games.map(game => game.sport))]  

        //Loads sample Space if state variable "True"
        if(this.state.displaySearch){
            sampleGame = <div><h3>Sample Game:</h3><Game info={this.state.gameInfo}/></div>
            sampleConfirmButton = <form onSubmit={this.submitNewGame}><button type='submit'>Submit New Space</button></form>
        }

        return (
            <div>
                <div>
                    <h3>Create New Game:</h3> 
                    <form onSubmit={this.gameLocationSearch}>
                        <label>Name:</label><input type='text' id='name' ref={this.newGameName} required></input>
                        <label>Location:</label><input type='text' id='location' ref={this.newGameLocation} required></input>
                        <label>Number of Players:</label><input type='number' id='players' ref={this.newGamePlayers} required></input>
                        <label>Date:</label><input type='datetime-local' id='date' ref={this.newGameDate} required></input>
                        <label>Sport:</label>
                            <select ref={this.newGameSport} required>
                                {sports.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
                                ))}
                                <option key='Other' value='Other'>Other</option>
                            </select>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                {sampleGame}
                {sampleConfirmButton}
                {errorMessage}
            </div>
        )
    }
}
