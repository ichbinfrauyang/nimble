// Await message for 'background.js' & Send extractLinks() as response
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extract') {
    sendResponse(extractLinks());
  } else {
    throw new Error('Unknown message!');
  }
});


// Extract website links: document.links
function extractLinks() {
  const links = [];
  for (let index = 0; index < document.links.length; index++) {
    links.push(decodeURI(document.links[index].href));
  }
  return links.length ? links : null;
};
