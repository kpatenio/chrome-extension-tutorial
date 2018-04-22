# chrome-extension-tutorial
My first attempt at creating a Chrome web extension using Google's official [tutorial](https://developer.chrome.com/extensions/getstarted). 

## What Does an Extension Need?
An extension is made up of several **components** - particularly HTML and JavaScript files - and a JSON **manifest** file. 

### Manifest File
According to _Wikipedia_, a manifest file is "a file containing **metadata** for a group of accompanying files that are part of a set or coherent unit<sup>1</sup>. 

The manifest file contains important information for our extension. It can contain our extension [name](https://developer.chrome.com/apps/manifest/name#name), the current [version](https://developer.chrome.com/apps/manifest/version) of our extension and manifest, [icons](https://developer.chrome.com/apps/manifest/icons), and more. This particular JSON file is used for both Chrome extensions and Chrome web applications. Note that what the file contains may differ depending on what we're developing. The following links may be useful:
* Web applications: https://developer.chrome.com/apps/manifest
* Web extensions: https://developer.chrome.com/extensions/manifest

### Component - User Interface
We can make our extension look different, be activated, or open a new menu after a particular action or state. We can use **HTML** to define the structure of a [popup](https://developer.chrome.com/extensions/user_interface#popup) or of a new page that will [override](https://developer.chrome.com/extensions/override) another one. 

To run and create scripts (see _Component - Scripts and Pages_) that help in changing our extension's appearance after an action, we use **JavaScript**. The manifest must also be updated, especially when activating an extension for [**all** pages](https://developer.chrome.com/extensions/browserAction) _or_ activating an extension for [**some** pages](https://developer.chrome.com/extensions/pageAction).

More information can be found at: https://developer.chrome.com/extensions/user_interface

### Component - Scripts and Pages 
We can use scripts to display or manipulate menus, icons, or especially web pages a certain way. We can use [content scripts](https://developer.chrome.com/extensions/content_scripts) for reading or altering a web page. Otherwise, we could also use [event pages](https://developer.chrome.com/extensions/event_pages) or [background pages](https://developer.chrome.com/extensions/background_pages) to listen for events and load when an event is found.  

## Getting Started with the Tutorial
While Google's tutorial is informative and contains all the information needed, I will provide additional notes in an attempt to simplify some concepts. 

### Create your Manifest File 
Create a JSON file for your manifest. 

```  
{
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "manifest_version": 2
 } 
```
Here, we have stated what the _name_ of our extension will be, what _version_ it currently is (this is determined by the developer), a _description_ about our extension, and the _manifest version_ as 2. Note that a manifest version of 1 is no longer supported for Chrome extensions - click this [link](https://developer.chrome.com/apps/manifestVersion) for more information.  

### Adding Functionality to Our Extension
Once we open our extension in Chrome (via developer mode), we will now have the ability to install our newly created extension! However,
there is not much we can do with it. If we want it do something, we must add some scripts. All scripts for our extension are written in JavaScript files. 

Let's add a background script! First, we must create a JavaScript file. We can call it _background.js_. We will include the following in our JavaScript file:

```
  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });
```
In our _background.js_ file, we added a script that will allow our extension to listen for a [runtime.onInstalled](https://developer.chrome.com/apps/runtime#event-onInstalled) event. Inside this listener that we just defined, our extension will save `{color: '#3aa757'}` into storage via the [Storage API](https://developer.chrome.com/apps/storage) 

**Tip**: think of localStorage in JavaScript! 



The extension is now aware that it includes a non-persistent background script and will scan the registered file for important events it needs to listen for.

This extension will need information from a persistent variable as soon as its installed. Start by including a listening event for runtime.onInstalled in the background script. Inside the onInstalled listener, the extension will set a value using the storage API. This will allow multiple extension components to access that value and update it.

```
  {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "manifest_version": 2
  }
```



## More Resources
* Google provides much more detailed information about the overall **architecture** of extensions, which can be found [here](https://developer.chrome.com/extensions/overview). 
* For a guide targeted towards **developers**, Google has also provided a [developer guide](https://developer.chrome.com/extensions/devguide).  
* Have trouble **debugging**? Please see Google's tutorial on [debugging here](https://developer.chrome.com/apps/tut_debugging).
* Want to use **APIs** with your extension? Google's got your back [here](https://developer.chrome.com/apps/api_index)! 



## Citations
<sup>1</sup>. “Manifest File”, Wikipedia, https://en.wikipedia.org/wiki/Manifest_file, (June 22, 2017)
