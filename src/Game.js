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
                <form onSubmit={this.RSVP} className="RSVP-form">
                    <label><b>Name:</b></label><input type='text' id='player-name-input'ref={this.player} required></input>
                    <label><b>Skill Level:</b></label>
                        <select ref={this.skillLevel}>
                            <option key='Beginner' value='Beginner'>Beginner</option>
                            <option key='Mid' value='Mid-Level'>Mid-Level</option>
                            <option key='Advanced' value='Semi-Pro'>Semi-Pro</option>
                            <option key='Super_Advanced' value='Olympic Ready!'>Olympic Ready!</option>
                        </select>
                    <label><b>Additional Comments:</b></label><input type='text' id='comments' ref={this.comments}></input>
                    <button type='submit'>Submit</button>
                </form>
            ) 
        }

        let {info} = this.props;

        let RSVPs = this.context.players.filter(player => player.game_id === info.game_id).length;

        let gameLink = '/games/' + info.game_id;
        return (
            <div className='game' key={info.game_id}>
                <div className='game-horizontal-group'>
                    <div className='game-headers'>
                        <h2><Link to={gameLink}>{info.name}</Link></h2>
                        <h3><u>Sport:</u> {info.sport}</h3>
                    </div>
                    <div className='game-date-field'>
                        <h3><u>Date:</u> {info.date}</h3>
                        <h3><u>Field:</u> {info.location_name} - {info.address}</h3>
                    </div>
                    <div className='game-RSVP'>
                        <h3><u>Number of Players:</u> {RSVPs}/{info.players}</h3>
                        <button onClick={() => this.setState({displayForm: !this.state.displayForm})}>RSVP for Game</button>
                    </div>
                </div>
                <div className='game-vertical-group'>
                    {RSVP_form}
                </div>
            </div>
        )
    }
}

