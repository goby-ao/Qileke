// Replace HTML tags < >
function quote(s) {
  var s1 = s.replace("<", "&lt;");
  var s2 = s1.replace(">", "&gt;");
  return s2;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  localStorage["TabList-"+tabId] = tab.url; //存储Url
  localStorage["TabIndex-"+tabId] = tab.index;  //tab的索引
  if (tab.favIconUrl)
    localStorage["TabFavicon-"+tabId] = tab.favIconUrl;
  if(tab.title != null)
    localStorage["TabTitle-"+tabId] = quote(tab.title); //title 除格式
  else
      localStorage["TabTitle-" + tabId] = tab.url;
});

chrome.tabs.onRemoved.addListener(function(tabId, info)  { //监听到tabId挂关闭后 存下来
  // Should we record this tab?
  var url = localStorage["TabList-"+tabId];
  var re = /^(http:|https:|ftp:|file:)/; 
  if (url && re.test(url)) {
    var digital = new Date();

    localStorage["ClosedTab-"+localStorage["closeCount"]] = tabId;
    localStorage["ClosedTabTime-"+localStorage["closeCount"]] = digital.getTime();
    localStorage["closeCount"] ++;
    localStorage["actualCount"] ++;
  }
  else clear(tabId);
});

function initialize() {
  localStorage["closeCount"] = 0;
  localStorage["actualCount"] = 0;
}

if (localStorage["closeCount"] == undefined && localStorage["actualCount"] == undefined)
     initialize();