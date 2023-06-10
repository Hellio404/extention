//
chrome.webNavigation.onCommitted.addListener(function(details) {
	if (details.frameId == 0) {
		chrome.scripting.executeScript({
			target: { tabId: details.tabId, allFrames: true },
			files: ['insert.js'],
		});
	}
}, { url: [{ urlMatches: 'https://profile.intra.42.fr/searches/search' }] });
