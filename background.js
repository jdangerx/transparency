browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    browser.tabs.sendMessage(tabId, {
      type: "urlChanged",
      url: changeInfo.url
    });
  }
});
