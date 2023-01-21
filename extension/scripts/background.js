const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";

function checkAuthorBackground(info, tab) {
    if (info.menuItemId !== CONTEXT_MENU_ID) {
        return;
    }
    
    console.log("Word " + info.selectionText + " was clicked.");

    // Open a new tab.
    // chrome.tabs.create({  
    //     url: "http://www.google.com/search?q=" + info.selectionText
    // });
 
    // 127.0.0.1 is the address of the server.
    // Direct request, such as https://customsearch.googleapis.com/customsearch/v1?q=Ed%20Krassenstein&cx=f393ab8cb82b8474f&key=GOOGLE_SEARCH_API_KEY
    // also works, but it exposes the API key. A safer approach would be to send the request on the server.
    fetch('https://google.com/').then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...
        console.log(result);

        const requestData = {
            // "links":
            //     ["https://en.wikipedia.org/wiki/Brian_and_Ed_Krassenstein|-|",
            //     "https://mobile.twitter.com/edkrassen|-|",
            //     "https://www.instagram.com/ed_krassenstein/?hl=en|-|",
            //     "https://www.rollingstone.com/culture/culture-news/krassenstein-brothers-twitter-elon-musk-1234646852/|-|",
            //     "https://knowyourmeme.com/memes/people/brian-and-ed-krassenstein"],
            // "titles": 
            //     ["Brian and Ed Krassenstein - Wikipedia|-|",
            //     "Ed Krassenstein (@EdKrassen) / Twitter|-|",
            //     "Eddie Krassenstein (@ed_krassenstein) • Instagram photos|-|",
            //     "Krassenstein Brothers Return to Twitter to Battle Elon Musk|-|",
            //     "Brian and Ed Krassenstein | Know Your Meme"],
            // "descriptions":
            // ["Brian and Ed Krassenstein are American twin brothers who are writers, entrepreneurs, and social media personalities. They reside in Fort Myers, Florida and ...|-|",
            // "Ed Krassenstein. @EdKrassen. Living in reality. Follow my twin: @Krassenstein . Web3 futurist. DeSo: http://diamondapp.com/u/Krassenstein Subscribe on ...|-|",
            // "Eddie Krassenstein. Building on the DeSo Blockchain. Co-founded 3dprint.com, NFTz.me, HillReporter.com, etc. diamondapp.com/u/Krassenstein. 51 posts.|-|",
            // "Twin brothers Edward and Brian Krassenstein, of Fort Myers, Florida, were once little-known entrepreneurs who ran investment web forums that ...|-|",
            // "Brian and Ed Krassenstein are American twin brothers known for their presence on Twitter as part of the anti-Trump Resistance movement."]
    
            "serviceNames": 
                ["Wikipedia|-|", "Lorem ipsum|-|", "Lorem ipsum|-|", "Lorem ipsum|-|", "Lorem ipsum"],
            "descriptions":
                ["Barack Hussein Obama II (/bəˈrɑːk huːˈseɪn oʊˈbɑːmə/ (listen) bə-RAHK hoo-SAYN oh-BAH-mə;[1] born August 4, 1961) is an American politician who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, Obama was the first African-American president of the United States.[2] He previously served as a U.S. senator from Illinois from 2005 to 2008 and as an Illinois state senator from 1997 to 2004, and previously worked as a civil rights lawyer before entering politics.|-|",
                "Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.|-|",
                "Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.|-|",
                "Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus.|-|",
                "Pellentesque nec elit vitae mauris viverra commodo. Nulla luctus leo a diam tempus, sed viverra lectus maximus."]
        }

        console.log(requestData);

        // chrome.scripting.executeScript({
        //     files: ["content.js"],
        //     target: {tabId: tab.id}
        // })
    
        const requestDataParams = new URLSearchParams(requestData).toString();
    
        chrome.windows.create({url: "popup/search-popup.html?" + requestDataParams, type: "popup"});
    
        // (async () => {
        //     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        //     const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        //     // do something with response here, not outside the function
        //     console.log(response);
        // })();
    })
}

if (chrome.contextMenus) {
    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create({
            title: "Search: %s", 
            contexts: ["selection"], 
            id: CONTEXT_MENU_ID
        });
    });

    chrome.contextMenus.onClicked.addListener(checkAuthorBackground);
}