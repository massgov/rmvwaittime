# Mass RMV Wait Time Widget
This widget fetches the RMV wait times for licensing and registration for a given branch (supplied via querystring parameter) 
and presents them using a component which uses Mayflower Assets.

## Machine Setup
- Install NodeJS version 6.9.4 (https://nodejs.org/en/download/)
- Install GulpJS, via command line `npm install -g gulp`

## Dependencies
- Static assets copied from [Mayflower v3.1.0](http://mayflower.digital.mass.gov/)
- RMV wait time data feed: https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx
- CORS enabled API proxy using AWS (_since data source is not cors enabled_): http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html 

## Working with the App
###  To work locally
This project uses [Browserify](http://browserify.org/) (_to bundle JS_) with [watchify](https://github.com/substack/watchify) (_to watch for and rebuild on changes_) and [Browsersync](https://browsersync.io) (_to server and reload on changes_).
 
- Run `npm install` prior to running `npm run dev`.
- From project root, run `npm run dev` and a browser window should automatically open to `localhost:3000/?town=Boston`
- Do work on JS or HTML files and when you save, the JS will be automatically rebuild and the app will automatically reload.


## Implementing the widget
1. In mass Drupal instance, add a node of type `Location Page` 
2. Click the `Header` tab
3. Under the `Widget Area` click on the `Add iFrame` button.
4. Use the following as the iframe source: `https://massgov.github.io/rmvwaittime/?town=Boston` where Boston is the name of the town whose location page you are building.  
- For spelling and list of towns, see [raw MassDOT feed](https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx).
