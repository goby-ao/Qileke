function onChange1(){
	var index = document.getElementById("select").selectedIndex;
	var searchIcon = document.getElementById("searchIcon");
	var searchUrl= document.getElementById("hidden");
	switch(index){
		case 1:
		// searchIcon.src="baidu.png";
		searchUrl.value="http://www.baidu.com/s?ie=utf-8&wd=";
		sUrl = "http://www.baidu.com";
		break;
		
		case 0:
		// searchIcon.src="google.png";
		searchUrl.value="http://www.google.com/search?q=";
		sUrl = "http://www.google.com";
		break;

		case 2:
		// searchIcon.src="bing.png";
		searchUrl.value="http://cn.bing.com/search?q=";
		sUrl = "http://cn.bing.com"
		break;

		case 3:
		// searchIcon.src="bing.png";
		searchUrl.value="http://search.yahoo.com/search?p=";
		sUrl = "http://cn.bing.com"
		break;

		case 4:
		// searchIcon.src="taobao.png" ;
		searchUrl.value="http://s.taobao.com/search?q=";
		sUrl = "http://s.taobao.com";
		break; 

		case 5:
		// searchIcon.src="wiki.png" ;
		searchUrl.value="http://en.wikipedia.org/w/index.php?title=Special:Search&search=";
		sUrl = "http://zh.wikipedia.org/wiki";
		break;

		};
}

function clickEvent(){
	
        document.forms[0].searchTxt.focus();
		setItem(1,document.getElementById("select").selectedIndex);
		var searchTxt =  encodeURIComponent(document.getElementById("searchTxt").value); 
		if (searchTxt!=""){
		  var adres= document.getElementById("hidden").value+searchTxt;
		  //console.info("search Url ____" + adres);
		  window.open(adres);
		}
	}

function setItem(key, value) {
		try {
		  window.localStorage.removeItem(key);
		  window.localStorage.setItem(key, value);
		}catch(e) {
		}
    }
function zapisz(){
	 setItem(0,document.getElementById("searchTxt").value);
	}


function getItem(key) {
    var value;
    try {
      value = window.localStorage.getItem(key);
    }catch(e) {
      value = "null";
    }
   return value;
   }



$(function(){

$("#submit").bind('click',function(){
	 document.forms[0].searchTxt.focus();
		setItem(1,document.getElementById("select").selectedIndex);
		var searchTxt =  encodeURIComponent(document.getElementById("searchTxt").value); 
		if (searchTxt!=""){

		   var adres= document.getElementById("hidden").value+searchTxt;
		   window.open(adres);	

		   // $("#backgroundDiv").css("display","block")
		   // $("#result").attr("src",adres);

		}
});

var sUrl ;
$("#select").change(function(){

	var index = document.getElementById("select").selectedIndex;
	//var searchIcon = document.getElementById("searchIcon");
	var searchUrl= document.getElementById("hidden");
	switch(index){
		case 1:
		// searchIcon.src="baidu.png";
		searchUrl.value="http://www.baidu.com/s?ie=utf-8&wd=";
		sUrl = "http://www.baidu.com";
		break;
		
		case 0:
		// searchIcon.src="google.png";
		searchUrl.value="http://www.google.com/search?q=";
		sUrl = "http://www.google.com";
		break;

		case 2:
		// searchIcon.src="bing.png";
		searchUrl.value="http://cn.bing.com/search?q=";
		sUrl = "http://cn.bing.com"
		break;

		case 3:
		// searchIcon.src="bing.png";
		searchUrl.value="http://search.yahoo.com/search?p=";
		sUrl = "http://cn.bing.com"
		break;

		case 4:
		// searchIcon.src="taobao.png" ;
		searchUrl.value="http://s.taobao.com/search?q=";
		sUrl = "http://s.taobao.com";
		break; 

		case 5:
		// searchIcon.src="wiki.png" ;
		searchUrl.value="http://en.wikipedia.org/w/index.php?title=Special:Search&search=";
		sUrl = "http://zh.wikipedia.org/wiki";
		break;

		}

		//clickEvent();

});
  
 $("#closeIf").bind("click",function(){ //close

  $("#backgroundDiv").css("display","none");
  $("#result").attr("src","");
 })



 $("#searchTxt").change(function(){
 	setItem(0,document.getElementById("searchTxt").value);
 });


	var screenHeight = window.innerHeight - 50;
	var screenWidth = window.innerWidth;
	var iWidth = screenWidth - 300;
	var iHeight = screenHeight - 100;
	$("#searchResult").css({"width":iWidth,"left":"150px","height":iHeight}); //自动识别宽度
	$("#backgroundDiv").css({height:screenHeight,width:screenWidth});


/*$("#searchTxt").keyup(function(e){ //监听空格
	var Url= document.getElementById("hidden");
	var r =  $("#searchTxt").val();
	console.info(r);
	if(r == " ")
	 {
	 	 $("#backgroundDiv").css("display","block");
	 	 $("#result").attr("src",sUrl);
   }
})
*/
$("#backgroundDiv").bind("click",function(){
	$("#backgroundDiv").css("display","none");
})


document.getElementById("select").selectedIndex = getItem(1);
onChange1();

/*document.addEventListener("keypress",dispatchEvent,false);

	function dispatchEvent(e){

	var code;
	if (!e)   var e = window.event;
	if (e.keyCode)   code = e.keyCode;
	else if (e.which)    code = e.which;
	var character = String.fromCharCode(code);
	if (character == " ") 
	{
	 	 $("#backgroundDiv").css("display","block");
	 	 $("#result").attr("src",sUrl);
   }

}*/

// document.forms[0].searchTxt.focus();
// document.getElementById("searchTxt").value = getItem(0); //取上次输入的值
})


