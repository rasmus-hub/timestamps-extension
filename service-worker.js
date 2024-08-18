chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getUrl") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: () => window.location.href
                }, (results) => {
                    try {
                        const url = results[0].result;
                        sendResponse({ url });
                    } catch (err) {
                        console.log('Error at sending response of the current page: ', err)
                    }
                });
            }
        });
    }

    return true;
});