How to run:

Firstly make sure that you have npm installed on your machine.
In the command line, 'cd' into the folder containing all of the files,
then use 'npm install' to install all of the dependencies,
then use 'npm start' to start the server.
Then open a browser and go to 127.0.0.1:8090 
To run eslint, use 'npm run pretest'.
To run the jest tests on 'app.js', use 'npm test' (tests may take up to 10 seconds to complete).
If any of these commands don't work then try using 'run' e.g. 'npm run test' e.t.c.
'npm test' runs eslint and jest test cases.

The API I have used is from https://www.metaweather.com/

Information about the API can be found here https://www.metaweather.com/api/

I am using https://www.metaweather.com/api/location/search/
with the variable 'query' being the text to search for
e.g. https://www.metaweather.com/api/location/search/?query=london

I am also using https://www.metaweather.com/api/location/
with a woeid (where on earth IDentifier) number (https://en.wikipedia.org/wiki/WOEID)
e.g. https://www.metaweather.com/api/location/44418

Please note that not every single city in the world is available with this API.
There are 283 different cities available.

The metaweather API gets its data from these sources:
https://www.bbc.co.uk/weather
https://www.forecast.io
https://www.metoffice.gov.uk/
https://openweathermap.org/
https://www.worldweatheronline.com/
https://www.yahoo.com/news/weather/
