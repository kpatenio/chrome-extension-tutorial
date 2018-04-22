/*
 * This script allows users to pick what colour they want as an option.
 * Each colour has their own button. Once a button is clicked, the new colour
 * will be stored in storage and be the new colour for our button.
 *
 * Each button will also have their own onclick event listener.
 *
 * @author: Katherine Mae Patenio
 */

const kButtonColors = ["green", "blue", "red", "orange"]
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement("button");
    button.style.backgroundColor = item;
    button.addEventListener("click", function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log("color is " + item);
      })
    });
    // NOTE: original google tutorial had:
    //    page.appendChild(button);
    // For some reason, this would not work 
    document.body.appendChild(button);
  }
}
constructOptions(kButtonColors);
