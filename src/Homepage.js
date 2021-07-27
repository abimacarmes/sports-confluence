import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MainContext from './MainContext'

export default class Homepage extends Component {
    static contextType = MainContext;

    render() {

        return (
            <div className="homepage">
                <h1>Sports Confluence</h1>
                <h3>After a year and a half stuck inside with the pandemic, I'm ready to be back on the field!</h3>
                <p>Sports Confluence's goal is to provide a way for people to find pickup sports games in their area.</p>
                <p>Whether you're a professional looking for other experts or just figuring out you can't use your hands in soccer - there's a game for you.</p>
                <p>If there's nothing you see that interests you, feel free to add your own and find some new friends to come along.</p>
                
                <br/><br/>

                <div className="homepageLinks">
                    <h3>Pages in the website:</h3>
                    <ul>
                        <li><Link to='/'>Homepage</Link></li>
                        <li><Link to='/games'>All Games</Link></li>
                        <li><Link to='/add-game'>Add New Game</Link></li>
                    </ul>
                </div>
            </div>

            

            
        )
    }
}

