import React from 'react';

const MainContext = React.createContext({
    games: [],
    players: [],
    filters: {},
    updateFilter: () => {}
})
export default MainContext;