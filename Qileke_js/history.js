var changecolor=0;
var colornumber=0;

function addHistoryAll(historyDiv,allHistory,f){
		var div_allHistory = document.createElement("div"); //最外层
		var title = document.createElement("div"); //上面的title
		var p = document.createElement("p");
		var title_d = document.createElement("div");//下面的icon 和 visitcount
		var icon = document.createElement("div");
		var icon_left = document.createElement("div");
		var img = document.createElement("img");
		var website = document.createElement("div");
		var count = document.createElement("div");
		var countLeft = document.createElement("div");
		var countRight = document.createElement("div");
		var countImage = document.createElement("img");
		var countNumber = document.createElement("p");
		var historyLink = document.createElement("a"); 

	// img.src = "http://ico.tnnde.com/"+ allHistory.url
	img.src = "http://www." + getDomain(allHistory.url) +  "/favicon.ico"; // 9 26
	/*img.style.height = "16px"
	img.style.width = "16px"*/
	img.style.cssText = " height:16px; width:16px; position:absolute; top:5px; left:8px";
	website.className = "webUrl";
	div_allHistory.id = "historyOuter-" + f;
	div_allHistoryId = div_allHistory.id;
	if(changecolor==1) {
		colornumber=(colornumber+1)%3;
		changecolor=0;
	}
	div_allHistory.className = "insert_"+colornumber;
	div_allHistory.title = allHistory.title;

	title.className = "title_up";
	title.id = "historyUp";
	p.className = "p_history";
	title_d.className = "title_down";
	title_d.id = "historyDown";
	icon.id = "iconUrl";
	icon.className = "iconHistory";
	icon_left.className = "iconLeft";
	count.id = "hisCount";
	count.className = "countHistory";
	website.innerHTML = "&nbsp" + getDomain(allHistory.url);
        countImage.src = "image/visitCount.png";
    countImage.style.cssText = "padding-top:6px; float:left;"

    countLeft.className = "count_left";     //访问次数
    countRight.className = "count_right";
    countRight.innerHTML = allHistory.visitCount;

    historyLink.href = allHistory.url;
    historyLink.target = "_blank";
    
    if (allHistory.title)
     	p.innerHTML = allHistory.title;
  	else
  		p.innerHTML = "无标题";
	title.appendChild(p);
    title_d.appendChild(icon);
    title_d.appendChild(count);
    countLeft.appendChild(countImage);
    count.appendChild(countLeft);
    count.appendChild(countRight);
    icon.appendChild(icon_left);
    icon.appendChild(website);
    icon_left.appendChild(img);
    div_allHistory.appendChild(title);
    div_allHistory.appendChild(title_d); 
    historyLink.appendChild(div_allHistory);
    historyDiv.appendChild(historyLink);  
    //send to dail
    var sendImg = document.createElement("img") 
    sendImg.src = "../image/view-bohaot.png"; //
    sendImg.title = "发送到拨号盘";
    sendImg.id = "send-" + f;
    sendId = sendImg.id;
    sendName = allHistory.title;
    sendImg.className = "sendToDailCss";
    div_allHistory.appendChild(sendImg);  
   	sendToDail(sendId,allHistory.url,sendName,div_allHistoryId);

}

//发送到拨号盘
function sendToDail(sendId,url,sendName,divId){
	var transfer = $('<h style="width:250px"></h>');
    $('#'+sendId).bind('click',function(e) {
    transfer.html(sendName);
    $('#transferdialog').empty().append(transfer).dialog({
   	 autoOpen: false,
     closeOnEscape: true, 
     title: '添加到拨号盘', 
     modal: true,
     width:300,
     height:200,
     show: 'slide', 
     buttons: {
        '添加': function() {
           qileke.webdb.addBookmarks(url,sendName);
           // options.show();
           $(this).dialog('destroy');
        },
       '取消': function() {
           $(this).dialog('destroy');
       }
   } }).dialog('open');
	    e.preventDefault();
		e.stopPropagation();
  });

		var sendHover = document.getElementById(divId);
		sendHover.onmouseover = function(){
		$("#" + sendId).show();
	}
		sendHover.onmouseout = function(){
		$("#" + sendId).hide();
	} 

}

function rebuildHistoryList(Historyitem) {
	for (var i = 0; i < Historyitem.length; i++){
		var item = Historyitem[i];
	    historyList.push(item);
   }
}

Array.prototype.unique = function()
	{
	 var array = [];
	  array.push(this[0]);
		for (var i = 1; i < this.length; i++) {
		   var j = i-1;
			while(this[i].url != this[j].url)
			{
				--j;
		        if (j == -1)	
			 	{array.push(this[i]); break;}
		     }
		};
		return array;
     }    //去重复


var history_j=0;
var history_bl=0;
var historyList = []; 
var historyList1 = []; 
var microsecondsPerWeek1 = 1000 * 60 * 60 * 24 * 18;
var oneWeekAgo1 = (new Date).getTime() - microsecondsPerWeek1;	

function ReHistory(){
	console.log((new Date).getTime())
	colornumber=0;
			historyList = [];
		  	chrome.history.search( { text:'', maxResults:3000,startTime: oneWeekAgo1}, function(HistoryItem) {
	        rebuildHistoryList(HistoryItem);
  		    context_init_allhistory_qileke();	 
   })
}

function AHistory(){
	    historyList = [];
	    colornumber=0;
	  	chrome.history.search( { text:'', maxResults:3000,startTime: oneWeekAgo1}, function(HistoryItem) {
	  	
	            rebuildHistoryList(HistoryItem);
  		        context_init_allhistory_qileke();	  	
	   });

	  	$('#history-search').keyup(function(e){
	   	query = $('#history-search').val();  
	   	//console.info("输入字符：" + query);

	    if(query.length == 0)
	   		ReHistory();
	   	if ( query.length <= 1 && query.length > 0) 
	   		    return false;
	   		if(query.length > 1 ){
	  	chrome.history.search( {text:query,maxResults:100,startTime: oneWeekAgo1}, function(HistoryItem) {
	  		historyList = [];
	  		 /*for (var i = 0; i < HistoryItem.length; i++) {
	  		 	if(-1 != HistoryItem[i].title.indexOf(query))
	  		 	historyList.push(HistoryItem[i])
	  		 };	  	*/
	  		 historyList = HistoryItem;
	  		 context_init_allhistory_qileke();	 		        	
	   });}
	  	 
    });
  
}

var lunxx=0;
var lunyy=12;
var Count =0;
var historyamount=0;
 
function context_init_allhistory_qileke(){

	lunxx=0;
    lunyy=12;
    history_j=0;//必须初始化
	var n=historyList.length;
	// console.log("n:"+n);
	historyamount=Math.floor((window.innerHeight/120)-2);
	if(historyamount<3){
		historyamount=3;
	}
	// console.log("window.:"+window.innerHeight);
	// console.log("window.:"+window.innerHeight/120);
	// console.log("historyamount:"+historyamount)
	//j=0;
	var a=Math.ceil(n/historyamount); 
	// console.log("a:"+a);
	history_bl=a;
	// var width_j=a*232+70+a*25;
	var width_j=a*260+70;
	var div_context_qileke;
	var div_title_qileke;
	var div_blank;
	var Element_qileke = document.getElementById("history_show");
	if(Element_qileke != null){
		$("#history_show").remove();
		}
	div_context_qilekee = document.createElement("div");
	div_context_qilekee.id = "history_show";	
	div_context_qilekee.style.marginLeft = "50px";	
	div_context_qilekee.style.width = width_j+"px";	

    // var  backLeft = document.createElement('a');
    // backLeft.href = "#left";
    // backLeft.className = "backLeftCss";

    var  backLeft = document.createElement('div');
    backLeft.id = "toleft";
    backLeft.className = "backLeftCss";

    var backLeftImg = document.createElement("img");
    //backLeftImg.id = "toLeft";
    backLeftImg.src = "image/backLeft.png";
    backLeft.appendChild(backLeftImg);

     
	document.getElementById("page_list_history").appendChild(div_context_qilekee);
	document.getElementById("page_list_history").appendChild(backLeft);
	// document.getElementById("page_list_history").appendChild(sea);
    
	var sLeft = $(window).scrollLeft();
	$("#toleft").live("click",function Backleft(){
		 $("#page_list_history").animate({scrollLeft:0},600);
	})

	if(a<=12)
		addhistory(0,a);
	else
		addhistory(0,12);
	}


function addhistory(init,all){
    for(var i=init;i<all;i++){
		var div_title_qilekee=document.createElement("div");
		div_title_qilekee.id="block_allhistory_"+i;
		div_title_qilekee.className = "module_history"
		div_title_qilekee.style.height=124*historyamount+'px';

		window.onresize = onResize_history;  //自适应屏幕调用
		onResize_history();
		window.onresize = autoAdapt;  //footer居中
		autoAdapt();

		document.getElementById("history_show").appendChild(div_title_qilekee);
		var historyDiv = document.getElementById("block_allhistory_"+i);

		if(i>0 && (i%3)==0) {
			changecolor=1;
			historyDiv.style.marginLeft="25px";
		}
		else{
			changecolor=0;
		}

		for (var k = 0; k < historyamount; k++,++Count) {
			 addHistoryAll(historyDiv,historyList[history_j++],Count);
				};		
		}
}


// function change_background_color(n,historyDiv){
//     switch ((n/4)%4)
// 　　   {
// 　　   case 0:
// 　　     historyDiv.style.backgroundColor="#808";
//   　　   break;
// 　　   case 1:
// 　　     historyDiv.style.backgroundColor="#801";
//  　　    break;
// 　　   case 2:
// 　　     historyDiv.style.backgroundColor="#802";
// 　　     break;
// 	  case 3:
// 　　     historyDiv.style.backgroundColor="#803";
// 　　     break;
//  // 　　  default:
//  //   　　  document.write("I'm looking forward to this weekend!")
// 　　}

// }