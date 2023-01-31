# Project Weather App
## Goal
Use everything we’ve been discussing to create a weather forecast site using the weather API from the previous lesson. You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius.

You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather. Feel free to use promises or async/await in your code, though you should try to become comfortable with both.

## Key Objective
#### When you display the weather information for the selected area, allow the user to set the area as a ‘saved’ area. This also means that the user should be able to remove a ‘saved’ area.

## Steps
### Part 1
Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.
Write the functions that fetch the API. You’re going to want functions that can take a location and return the weather data for that location.
Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
Create a form that will let users input their location and will fetch the weather info.
Display the information on your webpage using the DOM.
Does it work? Now style it up.
### Part 2
The user should be able to select the area as a ‘saved’ or ‘home’ area
You may want to create a class SelectedAreas that holds the list of saved areas
The SelectedAreas class could have a method for adding and a method for removing selected areas
It’d be nice to have a button for refetching weather information for selected areas
When you implement step 4, add a timestamp to the last update for selected areas’ data
Once you have that working, go ahead and implement any other features that you want to add
### Bonus
Add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.
Display a gif from GIPHY’s API depending on the weather for their area