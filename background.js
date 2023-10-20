console.log("background hello");
const marked = new Map()

chrome.tabs.query({}, res=>{
    chrome.storage.local.set({"tabs":res})
})

chrome.storage.local.get(["tabs"]).then((tabs)=>{
  console.log(tabs)
  tabs["tabs"].forEach(
  // tabs.forEach(
    (tab)=>console.log(tab)
    )
  })

function openTab(x){
  chrome.tabs.update(marked[x], {active:true,highlighted:true}, (tab)=>{
    chrome.windows.update(tab.windowId, {focused:true})
  })
}

function markTab(idx,tab){
  marked[idx] = tab.id
  chrome.storage.local.set({"marked":marked})
}

chrome.commands.onCommand.addListener((command, tab)=>{
  const cmd = command.split(':')[0]
  const idx = command.split(':')[1]

  if (command === "mark:"+idx){
    markTab(idx,tab)
    console.log(command, tab)
  }
  else if (command === "open:"+idx){
    openTab(idx)
    console.log(command, tab)
    chrome.storage.local.get(["marked"]).then(
      marked=>console.log("marked Map:",marked))

  }
})