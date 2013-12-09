
var divHeight;
var nItems = 20; // Items in a page
var pageNo = 0;


function createLink(id, url) {
    var link = document.createElement('div');
    link.onclick = function () { showUrl(id); startRecent(); };     //在index页打开关闭的标签
  link.title = url;
  return link;
}

function Arecent(){
		  startRecent();
      var id = "lkmfpgpdjngljhjeaamgbeiijbgghfof";
      $("#clearButton").bind('click',function(){
      //chrome.management.setEnabled(id,false);
    reset();
})
}

function startRecent(){
    var n = localStorage["closeCount"] - 1;
    if (localStorage["actualCount"] < 21)
        var end = localStorage["actualCount"];
    else
        var end = 21; /// <reference path="../main.html" />

	var count = 0;
	var a=Math.ceil(end/3);
	var width_j=a*285;	
	var div_context_qile;
	var div_set_recent;
	var div_blank;
	var Element_qileke = document.getElementById("recent_show");
	if(Element_qileke != null){
		$("#recent_show").remove();
		}
	div_context_qile = document.createElement("div");
	div_context_qile.id = "recent_show";
	div_context_qile.style.marginLeft = '50px';
	div_context_qile.className = "div_block";
	div_context_qile.style.width = width_j+"px";
	document.getElementById("page_list_recentClosed").appendChild(div_context_qile); //recent_show
	for(var i=0;i<a;i++){
		div_set_recent=document.createElement("div");
		div_set_recent.id="block_recent_"+i;
		div_set_recent.className="module_b";
		
    if(i%3 == 0) // magnify the margin every three blocks 
      div_set_recent.style.marginLeft = "20px";
    window.onresize = onResize_recent;
    onResize_recent();
    window.onresize = autoAdapt;
    autoAdapt();

		document.getElementById("recent_show").appendChild(div_set_recent);
		var recentDiv = document.getElementById("block_recent_"+i);
		for (var k = 0; k < 3 && n >= 0 && count < 21; n--) {
		    tabId = localStorage["ClosedTab-" + n];
		    tabUrl = localStorage["TabList-" + tabId];
		    if (tabUrl == undefined)
		    continue; 
		    else {
		        addRecentClosed(recentDiv, n);
		        count++;
		        k++;
		    }
	};
}
}


function addRecentClosed(recentDiv,i){  //最近有更改

    var tabId, tabUrl, tabTime; 
    tabId   = localStorage["ClosedTab-"+i]; 
    tabTime = localStorage["ClosedTabTime-"+i];
    tabUrl  = localStorage["TabList-"+tabId];

    if (tabUrl) {
      // Create a link node and the anchor encapsulating it.
      var text_link = createLink(tabId, tabUrl);            //--------------outer div
      text_link.className = "text_link_css";
      text_link.id = "recentOut-"+i;

      var div1 = document.createElement('div');
      div1.id = "upId";
      div1.className = "uCss";

      var img = document.createElement('img');
      // On load, we don't try to pull the favicons.
      // Save the url in alt
      if (localStorage["TabFavicon-"+tabId])   // ----------------img
        img.alt = localStorage["TabFavicon-"+tabId]; //show the url of the website
      else img.alt = "../image/empty.png"; //first empty all the items 
      img.src = img.alt;
      img.width = 16;
      img.height = 16;
      img.style.marginTop = "20px";
      div1.appendChild(img); 


      var textdiv = document.createElement('a');
      textdiv.innerHTML = " " + localStorage["TabTitle-"+tabId];   //-----------------Title
      div1.appendChild(textdiv);

      text_link.appendChild(div1);


      var textdiv2 = document.createElement('span');   //-----------------最近关闭的时间 
      textdiv2.className = "dCss";
      var timeTextz='';
      
      var nowtime = new Date();
      var milliseconds2 = nowtime.getTime(); 
      var difference = milliseconds2 - tabTime; 
      var hoursDifference = Math.floor(difference/1000/60/60); //小时
      difference = difference - hoursDifference*1000*60*60 
      var minutesDifference = Math.floor(difference/1000/60);  //分
      difference = difference - minutesDifference*1000*60 
      var secondsDifference = Math.floor(difference/1000);    
      // This next line below looks for entries over a day old 

      if ( hoursDifference < 1 &&  minutesDifference < 1 &&secondsDifference < 60)
       timeTextz = "最近关闭时间: " + '<b>'+ secondsDifference + ' sec</b>'; 
      else if (hoursDifference < 1 && minutesDifference < 10) timeTextz ="最近关闭时间: " +  '<b>'+ minutesDifference + ' min</b>'; 
      else if (hoursDifference < 1) timeTextz ="最近关闭时间: " + '<b>'+ minutesDifference + ' min</b>';
      else if (hoursDifference < 4) timeTextz = "最近关闭时间: " + '<b>' + hoursDifference + 'hr ' + minutesDifference + 'm</b>';
      else if (hoursDifference < 24) timeTextz = "最近关闭时间: " + '<b>' + hoursDifference + ' hr</b>'; 
      textdiv2.innerHTML=timeTextz;
      text_link.appendChild(textdiv2);
      recentDiv.appendChild(text_link);

      var sendImg = document.createElement("img")
      sendImg.src = "../image/view-bohaot.png"; //
      sendImg.title = "发送到拨号盘";
      sendImg.id = "send-" + i;
      sendId = sendImg.id;
     // sendName = allHistory.title;
      sendImg.className = "sendToDailCss";
      recentDiv.appendChild(sendImg);
      sendToDail(sendId, localStorage["TabList-" + tabId], localStorage["TabTitle-" + tabId], text_link.id);
      text_link.appendChild(sendImg);
    }
}

/*function loadFavicon() {
  var imgs = document.images;
  for (i=0; i<imgs.length; i++)
    imgs[i].src = imgs[i].alt;
}
*/

function showUrl(tabId) {
  var url = localStorage["TabList-"+tabId];
  var index = parseInt(localStorage["TabIndex-"+tabId]);
  chrome.tabs.create({"url": url, "index": index});
  clear(tabId);
  localStorage["actualCount"]--;

}

function reset() //------------------清空localstorage
{
  // Shallow clean: only forgets history about closed tabs
  for(i = localStorage["closeCount"]-1; i >= 0; i--)
  {
    tabId = localStorage["ClosedTab-"+i];
    delete localStorage["ClosedTab-"+i];
    delete localStorage["ClosedTabTime-"+i];
    clear(tabId);
  }
  for (j = 1 ; j<2500 ; j++)
  {
    clear(j);
  }
   initialize();
   $("#recent_show").remove();
}


function clear(tabId) {
  delete localStorage["TabList-"+tabId];
  delete localStorage["TabIndex-"+tabId];
  delete localStorage["TabTitle-"+tabId];
  delete localStorage["TabFavicon-"+tabId];
}


function initialize() {
  localStorage["closeCount"] = 0;
  localStorage["actualCount"] = 0;
}





