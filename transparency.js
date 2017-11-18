var script = document.createElement('script');
script.src = browser.extension.getURL('page.js');
script.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(script);

function handleTyping(users) {
  const path = window.location.pathname;
  for (let userId of Object.keys(users)) {
    let user = users[userId];
    if (path.includes(userId) || path.includes(user.vanity)) {
      console.log(user);
    }
  }
}


window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data &&
      event.data.type === "typingUpdate") {
    handleTyping(event.data.typing);
  }
});
