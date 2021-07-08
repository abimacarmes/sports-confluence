import React, { Component } from 'react'
import MainContext from './MainContext'
import {Link} from 'react-router-dom';

export default class Game extends Component {
    static contextType = MainContext;
    constructor (props){
        super(props);
        this.player = React.createRef();
        this.skillLevel = React.createRef();
        this.comments = React.createRef();
    }

    state = {
        displayForm: false
    }

    RSVP = event => {
        event.preventDefault();
        let playerRSVP = {
            "player_id": 12,
            "name": this.player.current.value,
            "level": this.skillLevel.current.value,
            "comment": this.comments.current.value,
            "game_id": this.props.info.game_id
        }

        this.context.addPlayer(playerRSVP)

        this.setState({
            displayForm: false
        })

    }

    render() {
        let RSVP_form;

        if(this.state.displayForm){
            RSVP_form = (
                <form onSubmit={this.RSVP}>
                    <label>Name:</label><input type='text' id='player-name-input'ref={this.player} required></input>
                    <label>Skill Level:</label>
                        <select ref={this.skillLevel}>
                            <option key='Beginner' value='Beginner'>Beginner</option>
                            <option key='Mid' value='Mid-Level'>Mid-Level</option>
                            <option key='Advanced' value='Semi-Pro'>Semi-Pro</option>
                            <option key='Super_Advanced' value='Olympic Ready!'>Olympic Ready!</option>
                        </select>
                    <label>Additional Comments:</label><input type='text' id='comments' ref={this.comments}></input>
                    <button type='submit'>Submit</button>
                </form>
            ) 
        }

        let {info} = this.props;

        let RSVPs = this.context.players.filter(player => player.game_id === info.game_id).length;

        let gameLink = '/games/' + info.game_id;
        return (
            <div key={info.game_id}>
                <h3><Link to={gameLink}>{info.name}</Link></h3>
                <h3>Sport: {info.sport}</h3>
                <h3>Date: {info.date}</h3>
                <h3>Field: {info.location_name} - {info.address}</h3>
                <h3>Number of Players: {RSVPs}/{info.players}</h3>
                <button onClick={() => this.setState({displayForm: true})}>RSVP for Game</button>
                {RSVP_form}
            </div>
        )
    }
}

