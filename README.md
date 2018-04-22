# chrome-extension-tutorial
My first attempt at creating a Chrome web extension using Google's official [tutorial](https://developer.chrome.com/extensions/getstarted). This extension allows a user to change the colour of a page on [developer.chrome.com](https://developer.chrome.com/home). 

## What Does an Extension Need?
An extension is made up of several **components** - particularly HTML and JavaScript files - and a JSON **manifest** file. 

### Manifest File
According to _Wikipedia_, a manifest file is "a file containing **metadata** for a group of accompanying files that are part of a set or coherent unit<sup>1</sup>. 

The manifest file contains important information for our extension. It can contain our extension [name](https://developer.chrome.com/apps/manifest/name#name), the current [version](https://developer.chrome.com/apps/manifest/version) of our extension and manifest, [icons](https://developer.chrome.com/apps/manifest/icons), and more. This particular JSON file is used for both Chrome extensions and Chrome web applications. Note that what the file contains may differ depending on what we're developing. The following links may be useful:
* Web applications: https://developer.chrome.com/apps/manifest
* Web extensions: https://developer.chrome.com/extensions/manifest

### Component - User Interface
We can make our extension look different, be activated, or open a new menu after a particular action or state. We can use **HTML** to define the structure of a [popup](https://developer.chrome.com/extensions/user_interface#popup) or of a new page that will [override](https://developer.chrome.com/extensions/override) another one. 

To run and create scripts (see _Component - Scripts and Pages_) that help in changing our extension's appearance after an action, we use **JavaScript**. The manifest must also be updated, especially when activating an extension for [**all** pages](https://developer.chrome.com/extensions/browserAction) via browserAction or activating an extension for [**some** pages](https://developer.chrome.com/extensions/pageAction) via pageAction.

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

### Adding Functionality to Our Extension - The Script
Once we open our extension in Chrome (via developer mode), we will now have the ability to install our newly created extension! However,
there is not much we can do with it. If we want it do something, we must add some scripts. All scripts for our extension are written in JavaScript files. 

Let's add a background script! First, we must create a JavaScript file. We can call it _background.js_. We will include the following in our JavaScript file to **create a listener**:

```
  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });
```
In our _background.js_ file, we added a script that will allow our extension to listen for a [runtime.onInstalled](https://developer.chrome.com/apps/runtime#event-onInstalled) event. Inside this listener that we just defined, our extension will save `{color: '#3aa757'}` into storage via the [Storage API](https://developer.chrome.com/apps/storage).

**Tip**: think of localStorage in JavaScript! 

#### What did we just do?
All we did was create a listener that checks if we are installing our extension for the first time, when the extension is updated, _or_ when Chrome is updated. When the listener successfully finds one of mentioned events, we will simply save a key-value property `{color: '#3aa757'}` to storage so that - in the future - we can let other components make use of that value and update it when necessary.

Note we also have a second function _inside_ our first function that prints to the console. This function is a **callback** function. According to the [offical documentation](https://developer.chrome.com/apps/runtime#event-onInstalled) for `runtime.onInstalled.addListener`, our callback simply contains details for as to why an event occurs. However, what this really does is just print to console once we finish using our storage. 

**Tip**: This [link](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/XOUXL2X9Qyk) might help in understanding what a callback really is.

#### What is _runtime_? 
_runtime_ is a Chrome API that can be used to listen for events during our extension's lifetime. The offical documentation states that it is also used to get pages, return manifest details, and convert URL relative paths to full URLs.  

For more information on _runtime_, click [here](https://developer.chrome.com/apps/runtime).

### Adding Functionality to Our Extension - The Manifest

#### Scripts
Note that any scripts that we want to include in our extension must be declared in our manifest. We will now update our manifest:

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
Notice that we added a _background_ key with values of `"scripts":["background.js"]` and `"persistent": false`. All we've done is simply declare what script should run in the background and declare that script as non-persistent. Note that background scripts are ideally non-persistent. 

Now the extension knows that it has this background script. It will be used to listen for the appropriate event(s).

#### Storage
To use the Storage API, it is necessary to give our extension **permission** to access storage. Registering under _permissions_ in our manifest is needed for most APIs.  

```
  {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "manifest_version": 2
  }
```
We added `"permissions": ["storage"],` to our manifest to allow our extension to have storage access.

### Adding Functionality to Our Extension - The Result
As a result, once we reload our extension and click on _background page_, you will notice that we have just created a [**background page**](https://developer.chrome.com/extensions/background_pages). This page is an HTML page that has been been generated by our background script. We can only view this page in chrome://extensions/ at the moment.

### User Interface
We can customize the appearance of our extension and its menu(s). 

#### Popup Menu
We will create a popup for our extension. Since popups are created using HTML, we will create a file called _popup.html_:

```
 <!DOCTYPE html>
  <html>
    <head>
      <style>
        button {
          height: 30px;
          width: 30px;
          outline: none;
        }
      </style>
    </head>
    <body>
      <button id="changeColor"></button>
    </body>
  </html>
```
We have defined the structure of our popup. Even though it is structured using HTML, do not confuse this for an actual webpage! Also note that we have a defined a _button_. We will use this button later to change the colour of pages.

It is essential that we **declare our html file** in our manifest. We will declare it under [page_action](https://developer.chrome.com/extensions/pageAction). Our updated manifest will appear as the following:

```
  {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
      "default_popup": "popup.html",
    },
    "manifest_version": 2
  }
```
We have simply declared our **default popup**.  

#### Icons For Our Toolbar 
We can add icons on our **toolbar** for our extension by utilizing *page_action*. Note that if we want to disable icons, we would also use *page_action*. We will need to update our manifest file again and declare our **default icons**:

```
 {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
      "default_popup": "popup.html",
      "default_icon": {
        "16": "images/get_started16.png",
        "32": "images/get_started32.png",
        "48": "images/get_started48.png",
        "128": "images/get_started128.png"
      }
    },
    "manifest_version": 2
  }
```
Our key `"default_icon"` contains multiple images of sizes 16x16, 32x32, 48x48, and 128x128. We need to specify the relative paths of the images we wish to use. Now our extension will display an icon on our toolbar. 

#### Icons for Other Places 
We can always displays icons for our extensions in other places including the extension management page, permissions warning, and favicon/shortcut icon. We will add another property called **icons**. 

```
  {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
      "default_popup": "popup.html",
      "default_icon": {
        "16": "images/get_started16.png",
        "32": "images/get_started32.png",
        "48": "images/get_started48.png",
        "128": "images/get_started128.png"
      }
    },
    "icons": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    },
    "manifest_version": 2
  }
```

Now if reload our extension, we will be able to see our icon in the extensions management page.  

### Using Scripts with Our Toolbar Icon
You might have noticed that the icon for our extension is greyed-out. 

## More Resources
* Google provides much more detailed information about the overall **architecture** of extensions, which can be found [here](https://developer.chrome.com/extensions/overview). 
* For a guide targeted towards **developers**, Google has also provided a [developer guide](https://developer.chrome.com/extensions/devguide).  
* Have trouble **debugging**? Please see Google's tutorial on [debugging here](https://developer.chrome.com/apps/tut_debugging).
* Want to use **APIs** with your extension? Google's got your back [here](https://developer.chrome.com/apps/api_index)! 



## Citations
<sup>1</sup>. “Manifest File”, Wikipedia, https://en.wikipedia.org/wiki/Manifest_file, (June 22, 2017)

## License 
The tutorial provided by Google is licensed under [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/); no alterations were made to the web page, but code provided from the tutorial have been altered (please see the MIT license provided below).

The source code in this repository is licensed under the MIT license:

-----------

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-----------
