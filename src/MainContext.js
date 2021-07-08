import React from 'react';

const MainContext = React.createContext({
    games: [],
    players: [],
    filters: {},
    updateFilter: () => {},
    addGame: () => {},
    addPlayer: () => {}
})
export default MainContext;