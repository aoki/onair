const URL = "http://192.168.10.131";

chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ url: "https://meet.google.com/*" }, (tabs) => {
    if (tabs.length === 0) {
      fetch(`${URL}/l`).then((res) => {
        return res.json().then((data) => {
          console.log(data);
          chrome.action.setIcon({
            path: {
              16: "imgs/icon16.png",
              48: "imgs/icon48.png",
              128: "imgs/icon128.png",
            },
          });
        });
      });
      return;
    }

    tabs.forEach((t) => {
      console.log(`Window ID: ${t.windowId}, Tab ID: ${t.id}`);
    });

    fetch(`${URL}/h`).then((res) => {
      return res.json().then((data) => {
        console.log(data);
        chrome.action.setIcon({
          path: {
            16: "imgs/onair16.png",
            48: "imgs/onair48.png",
            128: "imgs/onair128.png",
          },
        });
      });
    });
  });
});
