async function load(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let result;
    try {
        [{result}] = await chrome.scripting.executeScript({target: {tabId: tab.id},
                                                           function: () => getSelection().toString()
        });
        chrome.runtime.sendMessage({journal: result}, function(response) {
            document.getElementById('w3review').value =  response.display;
        });
    } 
    catch (e) {
        document.getElementById('w3review').value = e; // ignoring an unsupported page like chrome://extensions
    }    
};

load();

