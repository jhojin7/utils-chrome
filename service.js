function getStorage(){
  let allTabs = []
  const myLocalStorage = chrome.storage.local;
//   if (!chrome.storage.local.get("savedKeys")){
// 	chrome.tabs.query({}, (res) => res.forEach((x) => allTabs.push(x)));
// 	chrome.storage.local.set("savedKeys",allTabs)
//   }
  chrome.tabs.query({}, (res) => res.forEach((x) => allTabs.push(x)));
  chrome.storage.local.set({"savedKeys":allTabs})
  console.log("getStorage",allTabs, tabs)
  console.log(chrome.storage.local.get("savedKeys"))
  console.log("getStorage",allTabs, tabs)
  return allTabs
}

function setStorage(){
  let allTabs = [];
  chrome.tabs.query({}, (res) => res.forEach((x) => allTabs.push(x)));
  const myLocalStorage = chrome.storage.local;
  console.log("setStorage",myLocalStorage)
  return chrome.storage.local.set("savedKeys",allTabs)
//   return myLocalStorage.get("savedKeys",allTabs)
}

async function getNumber(window){
	console.log(window)
	// return keypress if from 1~9
	return 3
}


function doSomething(a){
	console.log(a,allTabs[a])
	chrome.tabs.update(allTabs[a].id,{active:true})
}

chrome.commands.onCommand.addListener((command) => {
	console.log(`Command: ${command}`)
	// console.log(allTabs)
	let newWindowId = -1
	console.log(tabs)
	chrome.windows.create(
		{'url': 'popup.html',
			'type': 'panel',
			'width': 1000, 'height': 1000,
			'left': 0, 'top': 0
		} , function(window) {

			let mytabs = getStorage()
			console.log(newWindowId, window)
			a = getNumber(window)
			console.log("getNumber",a)
			// doSomething(a)
			// chrome.windows.remove(window.id)
		}
	)
	//console.log(chrome.windows.get(newWindowId))

});

/*
chrome.tabs.onActivated.addListener((activeInfo)=>{
	tabId = activeInfo.tabId
	windowId = activeInfo.windowId
	console.log(tabId, windowId)
	console.log(allTabs, allTabs[0].id)
	chrome.tabs.get(allTabs[2].id, tab=>{console.log(tab)})
})
*/


