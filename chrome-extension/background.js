const URL = "http://192.168.10.131";

const registerAlarm = () => {
  chrome.alarms.create("onair", {
    delayInMinutes: 0,
    periodInMinutes: 1,
  });
};

const setEnabledIcon = () => {
  chrome.storage.local.get("isDarkIcon", (v) => {
    const theme = v.isDarkIcon ? "dark" : "light";
    chrome.action.setIcon({
      path: {
        16: `imgs/icon-${theme}16.png`,
        48: `imgs/icon-${theme}48.png`,
        128: `imgs/icon-${theme}128.png`,
      },
    });
  });
};

const setOnairIcon = () => {
  chrome.action.setIcon({
    path: {
      16: "imgs/onair16.png",
      48: "imgs/onair48.png",
      128: "imgs/onair128.png",
    },
  });
};

const setDisabledIcon = () => {
  chrome.storage.local.get("isDarkIcon", (v) => {
    const theme = v.isDarkIcon ? "dark" : "light";
    chrome.action.setIcon({
      path: {
        16: `imgs/disabled-${theme}16.png`,
        48: `imgs/disabled-${theme}48.png`,
        128: `imgs/disabled-${theme}128.png`,
      },
    });
  });
};

registerAlarm();
chrome.alarms.onAlarm.addListener((e) => {
  chrome.tabs.query({ url: "https://meet.google.com/*" }, (tabs) => {
    if (tabs.length === 0) {
      fetch(`${URL}/l`).then((res) => {
        return res.json().then((data) => {
          // console.log(data);
          setEnabledIcon();
        });
      });
      return;
    }

    // tabs.forEach((t) => {
    //   console.log(`Window ID: ${t.windowId}, Tab ID: ${t.id}`);
    // });

    fetch(`${URL}/h`).then((res) => {
      return res.json().then((data) => {
        // console.log(data);
        setOnairIcon();
      });
    });
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.alarms.get("onair", (alarm) => {
    if (alarm) {
      chrome.alarms.clear("onair", (isStop) => {
        // console.log(`Stop an alarm: ${alarm.name}`);
        setDisabledIcon();
      });
    } else {
      // console.log(`Register an alarm`);
      setEnabledIcon();
      registerAlarm();
    }
  });
});
