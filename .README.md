# _MD Finder_

#### _This page was created to explore using API calls on a Javascript webpage_

#### By _Joel Stockamp_

## Description

_A user should be able to find a local doctor._

## Setup/Installation Requirements

* Run npm install from your command line once you have downloaded this package
* Go to the url https://developer.betterdoctor.com and obtain an API key by requesting a new app.
* Once you have your API Key, use command line to create a .env file in the projects root directory.
* Open the .env file and enter the following text: "exports.apiKey = "
* Paste your API Key after the equals sign and save the file.
* Use the command line to npm run start.  

## Specs
| Behavior | Input | Output |
|-|:-:| -:|
|A user should be able to enter a medical issue to receive a list of doctors in the Portland area that fit the search query.|headache|Sue Brown, PDX MD|
|A user should be able to to enter a name to receive a list of doctors in the Portland area that fit the search query.|Sue Brown|Sue Brown, PDX MD|
|If the query response includes any doctors, the following information should be included about each doctor: first name, last name, address, phone number, website and whether or not the doctor is accepting new patients (the API provides this data).|Sue Brown|Sue Brown, 4566 Hwy 43, Portland, OR 97028, accepting new patients, http://docbrown.org |
|If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is.|Sue Brown|error: syntax not parsable|
|If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. (This is not an error so it should be handled separately from any errors.)|Sue Brown|No doctors in the area met your criteria|
|A user's ip address will determine the search area |sue brown|sue brown PDX|


## Known Bugs

_TBD_

## Support and contact details

_Please let me know if you want to chat: stockampj@gmail.com_

## Technologies Used

HTML, CSS, JavaScript, jQuery, Bootstrap, Webpack, Karma, Jasmine

### License

*MIT License*

Copyright (c) 2019 **_Joel Stockamp_**
