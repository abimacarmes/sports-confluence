import React, { Component } from 'react'
import MainContext from './MainContext'
import {Link} from 'react-router-dom';

export default class Filter extends Component {
    static contextType = MainContext;

    constructor (props){
        super(props);
        this.cityFilter = React.createRef();
        this.sportFilter = React.createRef();
    }

    //Upon submission of filter form
    filterResults = event => {
        event.preventDefault();

        const filters = {
            city: this.cityFilter.current.value,
            sport:this.sportFilter.current.value
        }

        this.context.updateFilter(filters.city, filters.sport);
    }

    render() {
        
        //Unique list of cities
        const cities = [...new Set(this.context.games.map(game => game.address.split(', ')[1]))]

        //Unique list of sports
        const sports = [...new Set(this.context.games.map(game => game.sport))]        

        return (
                <form className="filter" onSubmit={this.filterResults}>
                    <div className="filter-item">
                        <h3><b>Filter By:</b></h3>
                    </div>
                    <div className='filter-item'>
                        <label>City: </label>
                        <select ref={this.cityFilter}>
                            <option key='All' value=''></option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className='filter-item'>
                        <label>Sport: </label>
                        <select ref={this.sportFilter}>
                            <option key='All' value=''></option>
                            {sports.map(sport => (
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </select>
                    </div>
                    <div className='filter-item'>
                        <button type='submit'>Submit</button>
                    </div>
                    <div className='filter-item'>
                        <button className='add-game-button'><Link to='/add-game'>Add New Game</Link></button>
                    </div>
                </form>
        )
    }
}
