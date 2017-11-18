console.log("slamajama ding dong");

requireLazy(
  ['MercuryTypingReceiver', 'ShortProfiles'],
  (MercuryTypingReceiver, ShortProfiles) => {

    console.log(ShortProfiles);
    console.log(MercuryTypingReceiver);

    function getUserId(fbid) {
      return fbid.split(':')[1];
    }

    function inThreadFor(userId) {
      debugger;
      const prof = ShortProfiles.getNow(userId);
      const vanity = prof.vanity;
      const path = window.location.pathname;
      return path.includes(userId) || path.includes(vanity);
    }

    function onStateChanged(data) {
      const typingIds = Object.keys(data).map(getUserId);
      ShortProfiles.getMulti(typingIds, users => {
        window.postMessage({
          type: 'typingUpdate',
          typing: users,
          }, '*');
      });
    }

    MercuryTypingReceiver.get()
      .addRetroactiveListener('state-changed', onStateChanged);

  }
);
