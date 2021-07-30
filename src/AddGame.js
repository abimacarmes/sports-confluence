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
        this.newGameSportOther = React.createRef();
        
    }

    state = {
        otherSport: '',
        sportOther: false,
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
        if(submittedDate > today && this.newGamePlayers.current.value > 0){
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
                        "date": submittedDate,
                        "image_link": searchResult.photos[0].html_attributions[0]
                    }
                });
            })
            .catch(error =>
                console.log(error.message)
            )
        }
        else{
            this.setState({
                errorMessage: "Please ensure you have selected a date in the future and specified a number of players greater than 0."
            })
        }
    }

    //Upon submission of the searched space to add to database
    submitNewGame = event => {
        event.preventDefault();

        this.context.addGame(this.state.gameInfo)
        this.props.history.push('/games')
    }

    //If the sport selected is "Other" display an input box
    sportChange = event => {
        event.preventDefault();

        let otherSport = <li><input type="text" id='sport' ref={this.newGameSportOther}></input></li>

        if(this.newGameSport.current.value === 'Other'){
            this.setState({
                otherSport: otherSport
            })
        }
        else{
            this.setState({
                otherSport: ''
            })
        }
    }

    render() { 
        let sampleGame;
        let sampleConfirmButton;
        let errorMessage = this.state.errorMessage;

        const sports = [...new Set(this.context.games.map(game => game.sport))] 

        //Loads sample Space if state variable "True"
        if(this.state.displaySearch){
            sampleGame = <div><h3>Sample Game:</h3><Game info={this.state.gameInfo}/></div>
            sampleConfirmButton = <form onSubmit={this.submitNewGame}><button type='submit'><b>Submit New Space</b></button></form>
        }

        return (
            <div>
                <div>
                    <h3>Create New Game:</h3> 
                    <form className='new-game-form' onSubmit={this.gameLocationSearch}>
                        <ul>
                            <li><label><b>Name:</b></label><input type='text' id='name' ref={this.newGameName} required></input></li>
                            <li><label><b>Location:</b></label><input type='text' id='location' ref={this.newGameLocation} required></input></li>
                            <li><label><b>Number of Players:</b></label><input type='number' id='players' ref={this.newGamePlayers} required></input></li>
                            <li><label><b>Date:</b></label><input type='datetime-local' id='date' ref={this.newGameDate} required></input></li>
                            <li><label><b>Sport:</b></label>
                                <select onChange={this.sportChange} ref={this.newGameSport} required>
                                    {sports.map(sport => (
                                        <option key={sport} value={sport} selected>{sport}</option>
                                    ))}
                                    <option key='Other' value='Other'>Other</option>
                                </select></li>
                                {this.state.otherSport}
                            <li><button type='submit'><b>Submit</b></button></li>
                        </ul>
                    </form>
                </div>
                {sampleGame}
                {sampleConfirmButton}
                {errorMessage}
            </div>
        )
    }
}
