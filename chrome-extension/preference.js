const save = async () => {
  const v = document.getElementById("dark-icon").checked;
  // document.getElementById("debug").innerText = JSON.stringify(v, null, 2);
  chrome.storage.local.set(
    {
      isDarkIcon: v,
    },
    () => {}
  );
};

const load = async () => {
  chrome.storage.local.get("isDarkIcon", (v) => {
    // document.getElementById("debug").innerText = JSON.stringify(v, null, 2);
    document.getElementById("dark-icon").checked = v.isDarkIcon;
  });
};

document.addEventListener("DOMContentLoaded", load);
document.getElementById("dark-icon").addEventListener("click", save);

// chrome.storage.local.get(null, (v) => {
//   document.getElementById("debug").innerText = JSON.stringify(v, null, 2);
// });
