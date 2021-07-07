Sports Confluence
*GitHub: https://github.com/abimacarmes/fur-friendly-spaces
*Live Link: https://fur-friendly-spaces-abimacarmes.vercel.app/

Summary: Created for my second Bloc capstone, Sports Confluence is a app that allows individuals to find and join pickup sports games.

The application displays a list of all the available pickup games and allows the user to filter for their city, a specific location, a specific date or a specific sport. If they want to create a new pickup game, they can add all the details (location, number of players wanted, date, sport) and then individuals browsing the games can RSVP for a spot in any of the available games.

Technologies used: React, CSS, Node, Express, and PostgreSQL

Future Goals: Further utilization of the Google Maps API to show a map of the different locations. Could also add a message board system so that individuals can discuss their meetup.

Screenshots:
*![image](/src/screenshots/AllSpaces.JPG)

*Update!
API Documentation: 
GitHub: https://github.com/abimacarmes/fur-friendly-database
Live Link: https://enigmatic-basin-32386.herokuapp.com/api/

- /spaces GET: gets all items in the 'spaces' table
- /spaces POST: adds a new space to the 'spaces' table
	Request Body:
		{
    			"name": String,
        		"address": String,
		        "city": String,
		        "type": String
		}
-/spaces/:id PATCH: updates the upvote or downvote count for the space who's 'id' is provided
	Request Body:
		{
    			"id": Int,
        		"upCount": Int,
		        "downCount": Int
		}
