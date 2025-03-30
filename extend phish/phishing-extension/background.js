chrome.runtime.onInstalled.addListener(() => {
    const phishingList = [
        "malicious.com",
        "fakebank.com",
        "phishingsite.net",
        "paypal-secure-login.com",
        "secure-update-banking.com",
        "account-verification.net"
    ];

    const rules = phishingList.map((domain, index) => ({
        id: index + 1,
        priority: 1,
        action: { 
            type: "redirect",
            redirect: { url: chrome.runtime.getURL("block.html") }
        },
        condition: { urlFilter: `*://${domain}/*`, resourceTypes: ["main_frame"] }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: rules
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Failed to update rules:", chrome.runtime.lastError);
        } else {
            console.log("Blocking rules updated successfully!");
        }
    });
});