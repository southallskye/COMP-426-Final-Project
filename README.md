Welcome to our Trip Planner website! This website allows a user to sign up and stores their username in our database. Once a user signs up and their username and password are stored, they can log back in to our website whenever they would like using the login option with their username and password. After signing up or logging in, the website launches our trip planner dashboard. Users are able to create a new trip and enter their city of interest and dates of travel. Each new trip loads in a separate block with a title that corresponds to the location of the trip. After a user enters in the city and dates, they can click on a button to save the trip. Once the trip is saved, the trip block loads with the weather information for that city using a 3rd party API. Users also have the ability to delete a trip which removes it from our database. After a user logs out, if they log back in, they can click the load old trips button to bring up past trips that they have created, with a load weather button that users can click to reload the weather in that city. This is how we implemented a session-persistent state. Our username and password storage prevents duplicate usernames from signing up and prevents logging in with a wrong username or password.

Requirements: 
Front end
- User creates a new trip
- User enters travel city and start and end date of travel
- User saves the trip, which then uses a 3rd party API to load the weather
- User can update the weather 
- User can delete a trip
- User can load old trips 

Back end
- First resource: username and password storage in database
- Second resource: adding a trip to database

3rd party API
- Connects to OpenWeather API
- Loads temperature in Farenheit, weather conditions, and an icon representing the weather conditions
- "Load weather" button allows users to reload the weather

Session-persistent state
- Users who have created a trip can log back in and load old trips. Any trips that they have previously created will appear.

User experience
- Fun images and colors with a travel theme
- Many resources to easily manage trips
- Username and password for their personal trip planning dashboard 

Here is a link to our presentation video showcasing this website: https://youtu.be/daWl_25ZpSg

Enjoy!
