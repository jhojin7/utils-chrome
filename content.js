async function init(){
    const tabs = await chrome.tabs.query({})
    tabs.forEach((tab)=>{
        console.log(tab)
        let tabsDiv = document.querySelector("tabs")
        let p = document.createElement("p")
        p.textContent = tab.title
        tabsDiv.appendChild(p)
    })
}