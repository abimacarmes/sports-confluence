import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MainContext from './MainContext'

export default class Homepage extends Component {
    static contextType = MainContext;

    render() {

        return (
            <div className="homepage">
                <h1>Sports Confluence</h1>
                <p>App to allow people to set up pickup sports games near them.</p>
                
                <br/><br/>

                <div className="homepageLinks">
                    <h3>Pages in the website:</h3>
                    <ul>
                        <li><Link to='/'>Homepage</Link></li>
                        <li><Link to='/games'>All Spaces</Link></li>
                        <li><Link to='/add-game'>Add New Space</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

