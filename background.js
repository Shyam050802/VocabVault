// const contextMenuItemId = "MyContextMenuId"; // Define the menu item ID

// // Check if the context menu item already exists before creating it
// chrome.contextMenus.(contextMenuItemId, function (existingMenuItem) {
//   if (!existingMenuItem) {
//     // The context menu item doesn't exist, so create it
//     chrome.contextMenus.create({
//       id: contextMenuItemId,
//       title: "Find Meaning",
//       contexts: ["selection"],
//     });
//   }
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId === "MyContextMenuId") {
//     const selectedWord = info.selectionText.trim();
//     if (selectedWord !== "") {
//       chrome.tabs.sendMessage(tab.id, {
//         message: selectedWord,
//       });
//     }
//   }
// });

const contextMenuItemId = "MyContextMenuId";
let contextMenuItemCreated = false;

// Create the context menu item if it hasn't been created yet
function createContextMenu() {
  if (!contextMenuItemCreated) {
    chrome.contextMenus.create({
      id: contextMenuItemId,
      title: "Find Meaning",
      contexts: ["selection"],
    });
    contextMenuItemCreated = true;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item when the extension is installed
  createContextMenu();
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === contextMenuItemId) {
    const selectedWord = info.selectionText.trim();
    if (selectedWord !== "") {
      console.log("Selected word: " + selectedWord);
      chrome.tabs.sendMessage(tab.id, {
        message: selectedWord,
      });
    }
  }
});
