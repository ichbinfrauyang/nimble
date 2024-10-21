// Create a new tab when clicked the Extension icon
chrome.action.onClicked.addListener((tab) => {
  // Always invoke handler() first!
  handler()
  chrome.tabs.create({ 
  url: `nimble.html?tabId=` + tab.id});
  
})

/** Inject content-script.js in current tab
 * @function hander() 
 *    @function getCurrentTab()
 *        @param tabId
 * */
function handler(filtering = false) { 
  var tabId;
  return getCurrentTab()
    .then(items => { tabId = items[0].id; return injectScript(tabId);})
    .catch(error => console.log(error));
};

// Get the active tab in current browser window. 
function getCurrentTab() {
  return new Promise((res, rej) => {
    const queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, items => passNext(items, res, rej));
  });
};

/** Inject content-script programmatically as files by background.js
 * @function injectScript()
 *    @function passNext()
 * */
function injectScript(tabId, file = 'content-script.js') {
  return new Promise((res, rej) => {
    chrome.scripting.executeScript(
      { 
        target: {tabId: tabId}, 
        files: [file]
      },
        item => passNext(item, res, rej)
      );
  });
};


// Handle chrome.runtime.lastError
function passNext(result, fulfill, reject) {
  if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
  return fulfill(result);
};
