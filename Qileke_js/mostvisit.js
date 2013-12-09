var historyList = [];
var arrayUnique = [];
var historyListSort = [];
var divHeight;
var l = 0;
var filterList = [];
var reorderList = [];  //重排序的网站
var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 60;
var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

/*	Array.prototype.unique = function()
	{
	 var array = [];
	  array.push(this[this.length-1]);
		for (var i = this.length-2; i >= 0; i--) {
		   var j = i+1;
			while(this[i].sortUrl != this[j].sortUrl)
			{
				++j;
		        if (j == this.length)	
			 	{array.push(this[i]); break;}
		     }
		};
		return array;
     }    
*/

function Uhistorystart() { 

	chrome.history.search({text: '', maxResults: 9000, startTime: oneWeekAgo},function(HistoryItem) {
	  historyListSort = HistoryItem.sort(compareByVisitCount);// sort by the visit times ,2000
	  var rearrangeList = deRepeat(historyListSort);//对前300个整理对象，再去重复最后得到deRepeatList
	  var List = deRe(rearrangeList);
	  filterList = [];//先清空过滤列表
	  setFilterList();  //扫描获取列表
	  reorderList = reorderit(List);
	  // console.info("reorderList is : " + reorderList);
	  context_init_div_context_qileke(reorderList);
	});
	
}

function deRe(list){
 var array = [];
  array.push(list[0]);
	for (var i = 1; i < list.length ; i++) {
	   var j = i-1;
		while(list[i].sortUrl != list[j].sortUrl){
			--j;
	        if (j == -1)	
		 	{array.push(list[i]); break;}
	     }
	};
	return array;
 }     


function deRepeat (historyListSort){  //整理对象
	var count = 1;
	var rearrangeList = [];
	for(i = historyListSort.length - 1 ;i >0 && count <= 200 ;i--, count++){
			var newObj=new Object();//对象
			newObj.url = historyListSort[i].url;
			newObj.sortUrl = getDomain(historyListSort[i].url);
			newObj.title = historyListSort[i].title;
			newObj.visitCount = historyListSort[i].visitCount;
			rearrangeList.push(newObj);
		}
		return rearrangeList;
}


function setFilterList(){
	for(k = 0; k <= 100; k++ ){
		var bb = localStorage["clo-" + k];
		// console.info("bb ____ "  + bb);
		if(bb != "undefined"){
			var aa = localStorage["clo-" + k];
			// console.info( "+++++" + aa);
			filterList.push(aa);
		}
	}
	// console.info("filterList is : " + filterList) ;
}

function reorderit(List){
	var count = 0;
	var reorderList = [];
	var re = /^(http:|https:|ftp:)/;
	for (i = 0 ; i < List.length && count <=50  ; i++)
		for(j =0 ; j < filterList.length; j++)
		if(List[i].url == filterList[j] || !re.test(List[i].url) || List[i].visitCount < 10)
			break;
		else  if( j == filterList.length - 1){
          	reorderList.push(List[i]);
          	++count ;
      	  }
    // console.info(reorderList);
    return reorderList;
}



function context_init_div_context_qileke(HistoryItemSort){
	if (HistoryItemSort.length < 12)
		end = HistoryItemSort.length;
	else
	   var end = 12; // 一共多少个
	var seperateEnd = Math.ceil(end/2);
	var m =1;  //要传入的ID
	var n=HistoryItemSort.length;
	// var a=Math.ceil(end/2);
	var count = 0;
	var jj=0;
	var width_j=seperateEnd*280;	
	var div_context_qileke;
	var div_set_qileke;
	var div_blank;
	var Element_qileke = document.getElementById("mostvisit_show");
	//console.info("mostvisit_show is : " + Element_qileke);
	if(Element_qileke != null){
		// $("#mostvisit_show").remove();
		$("#mostvisit_show").html('');
		}
	div_context_qileke = document.createElement("div");
	div_context_qileke.id = "mostvisit_show";
	div_context_qileke.style.marginLeft = '120px';//120px
	div_context_qileke.className = "div_block";
	div_context_qileke.style.width = width_j+"px";
	document.getElementById("page_list_mostvisit").appendChild(div_context_qileke);
	for(var i=0;i < seperateEnd;i++){
		div_set_qileke=document.createElement("div");
		div_set_qileke.id="block_history_"+i;
		div_set_qileke.className="module_b";
		

    window.onresize = onResize_mostvisit;
    onResize_mostvisit();
    window.onresize = autoAdapt;
    autoAdapt();
		document.getElementById("mostvisit_show").appendChild(div_set_qileke);
		var historyDiv = document.getElementById("block_history_"+i);
		for (var k = 0; k < 2 && count < end; k++) {
			 addHistory(historyDiv,HistoryItemSort[jj],m);
			 // qileke.webdb.addMostVisit(HistoryItemSort[jj].url,HistoryItemSort[jj].title,HistoryItemSort[jj].visitCount);
			 count++;m++; jj++;
				};		
		}
	}	



function addHistory(historyDiv,HistoryItemSort,m){  //最近有更改
	var title = document.createElement('div');  //   
	title.id = "mostOuter" + m;
	title.className = "module_li";
	title.title=HistoryItemSort.title;

	var title_picture = document.createElement('div');
	title_picture.id ="outdiv";
	title_picture.className = "picture";  

	var link = document.createElement('a');         // link 
    link.id = "link_" + m;
    var deleteId = link.id;
    link.href =HistoryItemSort.url;
    link.target = "_blank";      
    link.className= "link";


	var thumbDiv =document.createElement("div");//缩略图div

	var thumbImg = document.createElement("img");
	thumbImg.className = "thumbImgCss"
	thumbImg.id = "bgThumb_" + m;

	var titleEye = document.createElement("div");//缩略图下面div，包含title 和 count

	thumbDiv.className = "bgThumbCss"; //待添加
	titleEye.className = "titleEyeCss"; //待添

	var thumbId =  "bgThumb_" + m;
	var storageTitle = HistoryItemSort.title;

	title_picture.appendChild(thumbDiv);
	thumbDiv.appendChild(thumbImg);
	title_picture.appendChild(titleEye);
   
    var left = document.createElement("div");
   	left.className = "thumbLeft";  //dai tainjia 
    var right = document.createElement("div");
    right.className = "thumbRight";

    titleEye.appendChild(left);
    titleEye.appendChild(right);

     		var para = document.createElement('p');   
			para.innerHTML = HistoryItemSort.title;
			para.className = "para_most";
			left.appendChild(para);
  
     		 
      var eye = $("<div></div>"); //添加访问次数前的小眼睛icon
      eye.attr('id','count_mostVisit');
      eye.addClass('eyeCss');
      eye.appendTo(right);

      var newdiv1 = $('<img src = "image/visitCount.png" alt="visitCount"/>');
      eye.append(newdiv1);

	var p_count = document.createElement('p');  
	p_count.className ="p_count"; 
	p_count.innerHTML = HistoryItemSort.visitCount;
    right.appendChild(p_count);
    title.appendChild(title_picture);
    link.appendChild(title);
    historyDiv.appendChild(link);

	var cloImg = document.createElement("img") //删除
    cloImg.src = "../image/delete.png"; //png 还很丑 带换
    cloImg.id = "clo-" + m;
    var closeId = cloImg.id;
    cloImg.className = "closeMostCss";
    cloImg.title="删除";
    title_picture.appendChild(cloImg);  

    storeImage(thumbId,storageTitle,HistoryItemSort.url); // thumbnails获取与本能地存储 在thumbStorage.js里

    deleteEvent(closeId , HistoryItemSort.url , deleteId, HistoryItemSort.title);  //触发关闭事件 ，等待写入

   var sendImg = document.createElement("img") 
    sendImg.src = "../image/view-bohaot.png"; //
    sendImg.title = "发送到拨号盘";
    sendImg.id = "sendMost-" + m;
    sendId = sendImg.id;
    sendName = HistoryItemSort.title;
    sendImg.className = "mostSendToDailCss";
    title.appendChild(sendImg);  
   	sendToDail(sendId,HistoryItemSort.url,sendName,title.id);
   	//hover事件

   	var mouse = document.getElementById("mostOuter" + m);
	mouse.onmouseover = function(){
		$("#clo-" + m).css("display","block");
		$("#sendMost-" + m).css("display","block");
		// $("#clo-" + m).animate({"top":"3px"},800);
	}
	mouse.onmouseout = function(){
		$("#clo-" + m).css("display","none");
		$("#sendMost-" + m).css("display","none");
	}
}



function deleteEvent(closeId , url , deleteId, deleteTitle){
  var hisUrl = url;
  var edith = $('<div style="width:250px"></div>');
  $('#'+ closeId).bind('click',function(e) {
    edith.text(deleteTitle);
    $('#deletedialog').empty().append(edith).dialog({
       autoOpen: false,
       title: '删除并过滤此网站',
       resizable: false,
       height: 200,
       modal: true,
       width: 300,
       show: 'slide', 
       overlay: {
       backgroundColor: '#000',
       opacity: 0.5
       },
       buttons: {
         '确认删除!': function() {
           $("#" + deleteId).remove();
			localStorage.setItem("clo-" + l , hisUrl)
			l++;
			Uhistorystart();
			$(this).dialog('destroy');
          },
          "取消": function() {
            $(this).dialog('destroy');
          }
       }
     }).dialog('open');
       e.preventDefault();
       e.stopPropagation();
   // e.stopPropagation();
   });
}

function compare(a,b){   
      return (a > b) ? 1 : (a == b ? 0 : -1);
   }
function compareByVisitCount(HistoryItem1,HistoryItem2){
   	  return compare(HistoryItem1.visitCount, HistoryItem2.visitCount);
   }
	
