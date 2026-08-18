let leads=[]
let inputBtn=document.getElementById("input-btn")
let inputEl=document.getElementById("input-el")
let listEl=document.getElementById("list")
let delBtn=document.getElementById("delete-btn")
let tabBtn=document.getElementById("tab-btn")

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("leads"))

if(leadsFromLocalStorage){
    leads=leadsFromLocalStorage
    render(leads)//passing array so that global variable, ie leads is not used everywhere
}

function render(Leads){
    let listItems=""
    for(let i=0;i<Leads.length;i++){
        listItems+=`<li>
            <a href='${Leads[i]}' target='_blank'>${Leads[i]}</a></li>`
    }
    listEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    let inputValue=inputEl.value
    leads.push(inputValue)
    localStorage.setItem("leads", JSON.stringify(leads))
    render(leads)
    inputEl.value=""
})


tabBtn.addEventListener("click", function(){
    
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){ //current tabs and current window(front one out of two) should be active
    //chrome gives this tabs var which will be used for getting the url of the tab directly from chrome 
    leads.push(tabs[0].url)
    localStorage.setItem("leads", JSON.stringify(leads))
    render(leads)
    inputEl.value=""
})
    
})

delBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    leads=[]
    render(leads)
})

