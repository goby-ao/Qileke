var recommendCount = 0;
var microsecondsPer = 1000 * 60 * 60 * 24 * 30;
var oneWeek = (new Date).getTime() - microsecondsPer;
var screenheight=window.screen.height;
var screenwidth=window.screen.width+300;
var screenchange = screenheight-280;
// var client_height=document.documentElement.clientHeight-155;
var client_height=0;

document.addEventListener('DOMContentLoaded', function () {
    Tools();
    //console.info("recommend is :" + localStorage['recommend']);
    if (localStorage['recommend'] != 1)
        recommendWebsite();
    //第一次推荐几个常去网站
    initDailer();

    window.onresize = autoAdapt;
    autoAdapt(); //底部导航自动居中

    $("#multiSearch").show();
    key("page_list_dailer");
    showchoose("page_list_dailer", sliden_dailer);
    //console.log('1');
    $('#back').live('click', function () {
        GetChildren($(this).attr('mark'));
    });

    $('#page_list_dailer').bind('mousewheel', sliden_dailer);

    $('#dot-2').bind("click", function () {
        // HoverLi(1);
        $("#historySearch").hide();
        $("#multiSearch").hide();
        $("#bar").show();
        $("#bs").hide();
        $("#boo").hide();
        $("#his").hide();
        // $("#demo").hide();

        $("#clearRecent").hide();
        $("#bookmark_back").hide();

        $("#disp").show();
        var Element_qileke = document.getElementById("page_list_mostvisit");
        if (Element_qileke == null) {
            page_list_mostvisit = document.createElement("div");
            page_list_mostvisit.id = "page_list_mostvisit";
            document.getElementById("fronter").appendChild(page_list_mostvisit);
            Uhistorystart();
        }
        showchoose("page_list_mostvisit", sliden_mostvisit);
        key("page_list_mostvisit");
    });

    //APP
    $('#dot-1').bind("click", function () {
        $("#boo").hide();
        $("#his").hide();
        // $("#demo").hide();
        $("#clearRecent").hide();

 /*       if (localStorage['Qileke-version'] != getVersion() || localStorage['Qileke2'] != 1) {
            $("#bgTips").show().animate({ bottom: "100px" }, "3000");

            $("#clo5").bind('click', function () {
                $("#bgTips").css("display", 'none');
            });
            localStorage['Qileke-version'] = getVersion();
            localStorage['Qileke2'] = 1;
        }
        else {
            $("#bgTips").css("display", "none");
        }*/

        $("#historySearch").hide();
        $("#bar").show();
        $("#multiSearch").css("display", "none");
        $("#bs").css("display", "none");
        var Element_qileke = document.getElementById("page_list_program");

        if (Element_qileke == null) {
            page_list_program = document.createElement("div");
            page_list_program.id = "page_list_program";
            document.getElementById("fronter").appendChild(page_list_program);
            appstart();
        }


        $("#disp").show();
        $("#bookmark_back").hide();
        showchoose("page_list_program", sliden_program);

        key("page_list_program");
    });

    //书签
    $('#dot-0').bind("click", function () {
        $("#his").hide();
        // $("#demo").hide();
        $("#clearRecent").hide();

        $("#historySearch").css("display", "none");
        $("#multiSearch").css("display", "none");
        $("#bar").css("display", "block");
        $("#bs").css("display", "block");
        // HoverLi(3);
        var Element_qileke = document.getElementById("page_list_bookmark");
        if (Element_qileke == null) {
            var page_list_bookmark = document.createElement("div");
            page_list_bookmark.id = "page_list_bookmark";
            document.getElementById("fronter").appendChild(page_list_bookmark);
            bookmarkstart();
        }

        $("#disp").show();
        $("#bookmark_back").show();

        showchoose("page_list_bookmark", sliden_bookmark);
        Separatelbookmarks();
        // setTimeout(showTips, 1400);
    });

    //收藏夹    
    $('#dot-6').bind("click", function () {
        $("#clearRecent").hide(); //-------------++++++++++++++++++++++

        // $("#bar").css("display","none");

        // $("#demo").hide();
        $("#disp").hide();

        $("#historySearch").hide();
        $("#multiSearch").hide();
        $("#bs").hide();
        $("#boo").hide();
        $("#his").hide();

        // HoverLi(4);

        var Element_qileke = document.getElementById("page_list_qileke");
        if (Element_qileke == null) {
            var page_list_qileke;
            page_list_qileke = document.createElement("div");
            page_list_qileke.id = "page_list_qileke";
            page_list_qileke.className = 'x-body';
            page_list_qileke.innerHTML = '<div id="qilekefolder_list" style="display:none"></div><div class="x-container sy-page x-fit-item x-container-default x-box-layout-ct" id="qileke_favlist" style="margin: 0px; width: 100%; height: 100%; opacity: 1; left: 0px; display:none ;"><div id="qilekelist_w" class="x-container tbar x-box-item x-container-default"  id="folder-header-1011"><a id="listback" class="icon left" href="javascript:void(0)"><div class="back-icon"><div class="icon-cover back-btn" data-qtip="返回  (Esc)"></div></div></a><div id="folder_title_qileke" class="folder-title"></div></div><div class="x-container  x-box-item x-container-default x-box-layout-ct" id="favlist-container" style="left: 0px; top: 85px; margin: 0px; height: 100%; width: 100%; overflow:hidden;"></div></div>';
            document.getElementById("fronter").appendChild(page_list_qileke);

            if (visitamount == 1) {
                qilekeshow();
            }
            if (visitamount == 0) {

                var loginye_div = document.createElement("div");
                loginye_div.id = "loginye";
                loginye_div.className = "displayblock";
                loginye_div.style.width = "100%";
                loginye_div.style.height = "100%";
                loginye_div.style.backgroundColor = "#f3f3f3";
                loginye_div.innerHTML = '<div id="container" ><div id="header"><h1><span class="x-unselectable">收藏点点滴滴|奇乐客</span></h1></div><div id="body"><form id="login" action="" method="post" ><div id="form"><input id="email" name="username" class="text" placeholder="用户名"/><input type="password" id="password" name="password" class="text" placeholder="密码" /><a href="http://www.qileke.com/register" target="_blank" class="sy-btn sy-cancel-btn">注册</a><a class="btn ok-btn" id="submit_qileke" >登录</a><a href="http://www.qileke.com/sendPassword" target="_blank" id="forget" class="sy-link" >忘记密码?</a></div></form></div><div id="footere"><div id="info-bar"><p><span >北京奇乐客科技有限公司</span></p></div></div></div><div class="sy-loading hidden-loading"><span class="sy-wait icon"></span><span class="loading-msg">loading......</span></div>'
                $("#page_list_qileke").append(loginye_div);
            }

        }

        showchoose("page_list_qileke", sliden_qileke);
        $("#disp").show();
        $("#bar").show();

        $("#bookmark_back").hide();

    });

    //浏览历史
    $('#dot-3').bind("click", function (e) {
        $("#clearRecent").hide(); //-------------++++++++++++++++++++++
        $("#multiSearch").hide();
        $("#bar").show();
        // $("#demo").hide();
        $("#historySearch").show();
        $("#bs").hide();

        $("#bookmark_back").hide();
        $("#boo").hide();
        //有刪改

        var Element_qileke = document.getElementById("page_list_history");
        if (Element_qileke == null) {
            var page_list_history = document.createElement("div");
            page_list_history.id = "page_list_history";
            document.getElementById("fronter").appendChild(page_list_history);
            AHistory();
        }
        e.stopPropagation();

        $("#disp").show();

        showchoose("page_list_history", sliden_history);
        Separatelhistory();

    });

    //最近关闭
    $('#dot-4').bind("click", function (e) {   //-------------------------+++++++++++++++++
        $("#clearRecent").show(); //-------------++++++++++++++++++++++
        $("#multiSearch").hide();
        $("#bar").show();
        // $("#demo").hide();
        $("#historySearch").hide();
        $("#bs").hide();
        $("#bookmark_back").hide();
        $("#boo").hide();

        var Element_qileke = document.getElementById("page_list_recentClosed");
        if (Element_qileke == null) {
            var page_list_recentClosed = document.createElement("div");
            page_list_recentClosed.id = "page_list_recentClosed";
            document.getElementById("fronter").appendChild(page_list_recentClosed);
            Arecent();
        }
        else Arecent();

        e.stopPropagation();
        showchoose("page_list_recentClosed", sliden_recent);
        key("page_list_recentClosed");

        $("#disp").show();


    });

    $('#dot-7').bind("click", function (e) {
        $("#clearRecent").hide();
        $("#multiSearch").show();
        $("#bar").show();
        $("#historySearch").hide();
        $("#bs").hide();
        $("#bookmark_back").hide();
        $("#boo").hide();

        $("#disp").show();
        // $("#demo").show();
        // $("#back").show();

        var Element_qileke = document.getElementById("page_list_dailer");
        if (Element_qileke == null) {
            var page_list_dailer = document.createElement("div");
            page_list_dailer.id = "page_list_dailer";
            document.getElementById("fronter").appendChild(page_list_dailer);
            initDailer();
        }

        e.stopPropagation();
        showchoose("page_list_dailer", sliden_dailer);
    });

});

var lunx=0;
var luny=10;
var scrollwidth;

//choose
function g(id) {
    return document.getElementById(id);
}

/*function HoverLi(n){
	for(var i=1;i<=5;i++){
		g('dot-'+i).className='dot-select';
		g('dot_h'+i).style.color='#9A9A9A';
		$('#dot_b'+i).css("border-color","#E9E9E9");
		}
	g('dot-'+n).className='dot';	
	g('dot_h'+n).style.color='#333';
	$('#dot_b'+n).css("border-color","#0BF");

}*/

function showchoose(listdiv,sliden){
	$('#page_list_mostvisit').hide();
	$('#page_list_program').hide();
	$('#page_list_bookmark').hide();
	$('#page_list_qileke').hide();
	$('#page_list_history').hide();
	$('#page_list_recentClosed').hide();
	$("#page_list_dailer").hide();
	$("#"+listdiv).show();

	$('#page_list_mostvisit').unbind('mousewheel',sliden_mostvisit);
	$('#page_list_program').unbind('mousewheel',sliden_program);
	$('#page_list_bookmark').unbind('mousewheel',sliden_bookmark);
	$('#page_list_qileke').unbind('mousewheel',sliden_qileke);
	$('#page_list_history').unbind('mousewheel',sliden_history);
	$('#page_list_recentClosed').unbind('mousewheel',sliden_recent);
	$('#page_list_dailer').unbind('mousewheel',sliden_dailer);
	$("#"+listdiv).bind('mousewheel',sliden);
}

function qilekesliden(listdiv,sliden){
	$('#content_show').unbind('mousewheel',sliden_qileke_content);
	$('#favlist-container').unbind('mousewheel',sliden_qileke_list);
	$('#page_list_qileke').unbind('mousewheel',sliden_qileke);

	$("#"+listdiv).bind('mousewheel',sliden);

}
// qilekesliden("content_show",sliden_qileke_content);
// qilekesliden("favlist-container",sliden_qileke_list);
// qilekesliden("page_list_qileke",sliden_qileke);
// $('#qileke_favlist').bind('mousewheel',sliden_qileke_list);
// $('#content_show').live('mousewheel',sliden_qileke_content);
// $('#favlist-container').live('mousewheel',sliden_qileke_list);



function sliden_qileke_content(event, delta) {
	var speed = 400;
	//console.log(delta)
	var scrollwidth=document.getElementById("content_show").scrollLeft;
	//console.log("content:"+scrollwidth);
  
	$("#content_show").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
}

function sliden_qileke_list(event, delta) {
	var speed = 400;
	//console.log(delta)
	var scrollwidth=document.getElementById("favlist-container").scrollLeft;
	//console.log("list:"+scrollwidth);
  
	$("#favlist-container").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
}
//var qileke_list_test;
function sliden_qileke(event, delta) {
	var speed = 400;
	//console.log(delta)
	var qileke_list_test=document.getElementById("qilekefolder_list").scrollLeft;
	//console.log("qileke:"+scrollwidth);
  
	$("#qilekefolder_list").stop().animate({scrollLeft:qileke_list_test-delta*speed}, 'fast','swing');
}

function sliden_mostvisit(event, delta) {
	var speed = 400;
	//console.log(delta)
	var scrollwidth=document.getElementById("page_list_mostvisit").scrollLeft;
  
	$("#page_list_mostvisit").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
}


function sliden_dailer(event, delta) {
	var speed = 400;
	//console.log(delta)
	var scrollwidth=document.getElementById("page_list_dailer").scrollLeft;
  
	$("#page_list_dailer").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
}


function key(Div_list){
	$(window).bind("keydown" ,function(e){
		// console.log(e.type + ': ' +  e.which)
		// console.log(Div_list)
		var a=0;
		var speed = 400;
	    var scrollwidth=document.getElementById(Div_list).scrollLeft;
	    if (e.keyCode == 39 || e.keyCode == 34) { 
	    	a=1;
	    }
	    if (e.keyCode == 37 || e.keyCode == 33) {
	    a=-1;  
	    }
	    $("#"+Div_list).stop().animate({scrollLeft:scrollwidth+a*speed}, 'fast');
	});
}

function Separatelhistory(){
	$(window).bind("keydown" ,function(e){
		//console.log(e.type + ': ' +  e.which)
		//console.log(Div_list)
		var a=0;
		var speed = 400;
	    var scrollwidth=document.getElementById("page_list_history").scrollLeft;

	    if (e.keyCode == 39 || e.keyCode == 34) { 
	    	a=1;
	    }
	    if (e.keyCode == 37 || e.keyCode == 33) {
	    a=-1;  
	    }
	    var rrr=window.innerWidth;
    
		var ListWidth=lunyy*232;
		var initwidth=232*12;
		var scrollwidthadd=scrollwidth+rrr;
		// console.log("ListWidth:"+ListWidth)
		// console.log('scrollwidthadd:'+scrollwidthadd)
		if(history_bl>12){
			// if(scrollwidthadd>=ListWidth && luny<history_bl && showlistwidth>=scrollwidthadd){
			if(scrollwidthadd>=ListWidth && lunyy<history_bl ){
				//console.log("luny:"+luny)
				lunxx=lunyy;
				lunyy=lunyy+8;
				if(lunyy>=history_bl) {
					addhistory(lunxx,history_bl);
				}
				else{
					addhistory(lunxx,lunyy);
				}
			}
		}
		$("#page_list_history").stop().animate({scrollLeft:scrollwidth+a*speed}, 'fast');
	});
}



function Separatelbookmarks(){
	$(window).bind("keydown" ,function(e){
		//console.log(e.type + ': ' +  e.which)
		//console.log(Div_list)
		var a=0;
		var speed = 350;
	    var scrollwidth=document.getElementById("page_list_bookmark").scrollLeft;
        //console.log("e.keyCode:"+e.keyCode);
	    if (e.keyCode == 39 || e.keyCode == 34) { 
	    	a=1;
	    }
        if (e.keyCode == 37 || e.keyCode == 33) {
    		a=-1;  
    	}
                    
    	var rrr=window.innerWidth;
        
    	var ListWidth=luny*242;
    	var initwidth=242*10;
    	var scrollwidthadd=scrollwidth+rrr;
    	// console.log("ListWidth:"+ListWidth)
    	// console.log('scrollwidthadd:'+scrollwidthadd)
    	// console.log('luny:'+luny)
    	// console.log("++bl:"+bl)
    	if(bl>10){

    		if(scrollwidthadd>=ListWidth && luny<bl ){
    			//console.log("luny:"+luny)
    			lunx=luny;
    			luny=luny+5;
    			if(luny>=bl) {
    				additem(lunx,bl);
    			}
    			else{
    				additem(lunx,luny);
    			}
    		}
    	}
    	$("#page_list_bookmark").stop().animate({scrollLeft:scrollwidth+a*speed}, 'fast');
	});
}


function sliden_program(event, delta) {
    var speed = 400;
	var scrollwidth=document.getElementById("page_list_program").scrollLeft;
	//console.log("scrollLeft:"+scrollwidth)
	$("#page_list_program").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
}


function sliden_history(event, delta) {
	var speed = 400;
	var scrollwidth=document.getElementById("page_list_history").scrollLeft;
	
	//var showlistwidth=history_bl*251;
	var rrr=window.innerWidth;
    
	var ListWidth=lunyy*232;
	var initwidth=232*12;
	var scrollwidthadd=scrollwidth+rrr;
	// console.log("ListWidth:"+ListWidth)
	// console.log('scrollwidthadd:'+scrollwidthadd)
	if(history_bl>12){

		// if(scrollwidthadd>=ListWidth && luny<history_bl && showlistwidth>=scrollwidthadd){
		if(scrollwidthadd>=ListWidth && lunyy<history_bl ){
			//console.log("luny:"+luny)

			lunxx=lunyy;
			lunyy=lunyy+8;
			if(lunyy>=history_bl) {
				addhistory(lunxx,history_bl);
			}
			else{
				addhistory(lunxx,lunyy);
			}
		}
	}
	$("#page_list_history").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
	
}

function sliden_recent(event, delta){
    var speed = 400;
    var scrollwidth=document.getElementById("page_list_recentClosed").scrollLeft;
    //console.log("scrollLeft:"+scrollwidth)
    $("#page_list_recentClosed").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
 
}


// function sliden_recent(event, delta) {  
// 	var speed = 400;
// 	var scrollwidth=document.getElementById("page_list_recentClosed").scrollLeft;
	
// 	//var showlistwidth=history_bl*251;
// 	var rrr=window.innerWidth;
    
// 	var ListWidth=lunyy*251;
// 	var initwidth=251*10;
// 	var scrollwidthadd=scrollwidth+rrr;
// 	// console.log("ListWidth:"+ListWidth)
// 	// console.log('scrollwidthadd:'+scrollwidthadd)
// 	if(history_bl>10){

// 		// if(scrollwidthadd>=ListWidth && luny<history_bl && showlistwidth>=scrollwidthadd){
// 		if(scrollwidthadd>=ListWidth && lunyy<history_bl ){
// 			//console.log("luny:"+luny)

// 			lunxx=lunyy;
// 			lunyy=lunyy+5;
// 			if(lunyy>=history_bl) {
// 				addRecent(lunxx,history_bl);
// 			}
// 			else{
// 				addRecent(lunxx,lunyy);
// 			}
// 		}
// 	}
// 	$("#page_list_recentClosed").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');
	
// }


function sliden_bookmark(event, delta){
	var speed = 350;
	var scrollwidth=document.getElementById("page_list_bookmark").scrollLeft;
	
	//var showlistwidth=bl*242;
	var rrr=window.innerWidth;
    
	var ListWidth=luny*242;
	var initwidth=242*10;
	var scrollwidthadd=scrollwidth+rrr;
	// console.log("ListWidth:"+ListWidth)
	// console.log('scrollwidthadd:'+scrollwidthadd)
	// console.log('luny:'+luny)
	// console.log("++bl:"+bl)
	if(bl>10){

		if(scrollwidthadd>=ListWidth && luny<bl ){
			//console.log("luny:"+luny)
			lunx=luny;
			luny=luny+5;
			if(luny>=bl) {
				additem(lunx,bl);
			}
			else{
				additem(lunx,luny);
			}
		}
	}
	$("#page_list_bookmark").stop().animate({scrollLeft:scrollwidth-delta*speed}, 'fast','swing');

}

function recommendWebsite(){
    chrome.history.search({ text: '', maxResults: 5000, startTime: oneWeek}, function (history) {
        var historySort = history.sort(compareByVisitCount);
        var list = deRepeat(historySort);
        var reRepeatList = deRe(list); 
        var re = /^(http:|https:|ftp:)/;
        var ner = reRepeatList.length - 1;
        for (i = 0; i <= ner && recommendCount < 8; i++)
            if (re.test(reRepeatList[i].url) && reRepeatList[i].visitCount > 10) {
                //console.info("reRepeatList " + reRepeatList[i]);
                qileke.webdb.addBookmarks(reRepeatList[i].url, reRepeatList[i].title);
                recommendCount++;
            }
        localStorage['recommend'] = 1;
    });
}

function autoAdapt(){
    var count = 0;
    for(i = 0 ; i < 7 ; i ++)
        if(localStorage['toolmark'][i] == 1)
            count++;
        console.info("count is : " + count);
	var a = (window.innerWidth - count*70)/2;
    if(window.innerWidth > 600){
        $("#logo").css("margin-left",a);
    }
    else{
        $("#logo").css("margin-left","20px");
    }
}

function showTips() {
   var tipHeight = (window.innerHeight - 500) / 2 + 60;
   if (localStorage['Qileke3'] != 5) {
       $("#boo").show().animate({ top: tipHeight }, "slow");
       $("#clo3").bind('click', function () {
           $("#boo").css("display", 'none');
       });
       localStorage['Qileke3'] = 5;
   }
   else {
       $("#bgTips").css("display", "none");
   }
}

