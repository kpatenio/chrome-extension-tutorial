/*
 * This file contains a script that adds a new listener
 * The listener will scan for the following events:
 *
 *    extension is installed for the first time
 *    extension is updated
 *    Chrome is updated
 *
 * When one of the mentioned events is found, store an object with
 * key color and value green into storage via Storage API
 *
 * Additionally, callback function will display on the console what
 * our colour currently is.
 *
 * @author Katherine Mae Patenio
 */

 chrome.runtime.onInstalled.addListener(function(){
   chrome.storage.sync.set({color:"green"}, function(){
     console.log("The colour is green.");
   }); // end of callback

   // Remove old rules and replace with new ones
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
     chrome.declarativeContent.onPageChanged.addRules([{
       // Run the new rule when the URL host contains "developer.chrome.com"
       conditions: [new chrome.declarativeContent.PageStateMatcher({
         // Read the current URL and check if we are on a Google developer page by checking the host of our URL
         pageUrl: {hostEquals: "developer.chrome.com"},
       })
     ], // end of conditions at this square bracket
        // This will be the extension's page action
        actions: [new chrome.declarativeContent.ShowPageAction()]
     }]);
   });
 }); // end of onInstalled
