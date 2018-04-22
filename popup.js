/*
 * This script reads the colour stored in storage and applies
 * the colour to our button (appearance and value-wise).
 *
 * Once the button is clicked, the colour the button is currently
 * set to will change the current page's background colour to this
 * colour.
 *
 *@author Katherine Mae Patenio
 */

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get("color", function(data){
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value",data.color);
});

changeColor.onclick = function(element){
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: "document.body.style.backgroundColor = '" + color + "';"});
  });
};
