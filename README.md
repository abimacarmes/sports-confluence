Sports Confluence
GitHub: https://github.com/abimacarmes/sports-confluence
Live Link: https://sports-confluence.vercel.app

Summary: Created for my second Bloc capstone, Sports Confluence is a app that allows individuals to find and join pickup sports games.

The application displays a list of all the available pickup games and allows the user to filter for their city or a specific sport. If they want to create a new pickup game, they can add all the details (location, number of players wanted, date, sport) and then individuals browsing the games can RSVP for a spot in any of the available games.

Technologies used: React, CSS, Node, Express, and PostgreSQL

Future Goals: Further utilization of the Google Maps API to show a map of the different locations. Could also add a message board system so that individuals can discuss their meetup.

Screenshots:
![image](/src/screenshots/Homepage.JPG)

Update!
API Documentation: 
GitHub: https://sports-confluence.vercel.app
Live Link: https://glacial-atoll-16614.herokuapp.com/api

- /games GET: gets all games in the 'games' table
- /players GET: gets all players in the 'players' table
- /games POST: adds a new game to the 'games' table
	Request Body:
		{
    			"name": String,
        		"sport": String,
				"location_name": String,
		        "address": String,
				"players": Integer,
		        "date": Date
		}
- /players POST: adds a new player to the 'players' table
Request Body:
		{
    			"name": String,
        		"level": String,
				"comment": String,
		        "game_id": Foreign Key from 'games'
		}