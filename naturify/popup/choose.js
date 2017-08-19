/*
Given the name of a target, get the URL to the corresponding image.
*/
function targetNameToURL(targetName) {
    switch (targetName) {
      case "First":
        return browser.extension.getURL("photos/1.jpg");
      case "Second":
        return browser.extension.getURL("photos/2.jpg");
      case "Third":
        return browser.extension.getURL("photos/3.jpg");
      case "Fourth":
        return browser.extension.getURL("photos/3.jpg");
    }
  }

/*
Listen for clicks in the popup.

If the click is on one of the targets:
  Inject the "naturify.js" content script in the active tab.

  Then get the active tab and send "naturify.js" a message
  containing the URL to the chosen target's image.

If it's on a button which contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("nature")) {
      var chosenTarget = e.target.textContent;
      var chosenTargetURL = targetNameToURL(chosenTarget);
  
      browser.tabs.executeScript(null, { 
        file: "/content_scripts/naturify.js" 
      });
  
      var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
      gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {targetURL: chosenTargetURL});
      });
    }
    else if (e.target.classList.contains("clear")) {
      browser.tabs.reload();
      window.close();
    }
  });    