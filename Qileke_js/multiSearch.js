
// for multi search engine 
// var searchUrl = "http://www.google.com/search?q=";
$(function(){

/*  var sWidth = (window.innerWidth - 382 )/2;
  $("#search").css("margin-left",sWidth);*/
  var searchUrl = {};

  searchUrl[0] = "http://www.google.com/search?q=";
  searchUrl[1] = "http://www.baidu.com/s?ie=utf-8&wd=";
  searchUrl[2] = "http://cn.bing.com/search?q=";
  searchUrl[3] = "http://s.taobao.com/search?q=";

  setIcon(); //首先设置搜索引擎图标

  onResize_search();//set middle 
	$("#selected , .v").bind('click',function(){
		$(".engine").show();
	})


    $("#search_google").bind('click',function(){
    	// $("#selected").css('background-image','url(images/google.png)');
    	$("#selected").removeClass();
      $("#selected").addClass("icon google")
        setItem(engine,0);
        $(".engine").hide();
    })

    $("#search_baidu").bind('click',function(){
      // $("#selected").css('background-image','url(images/baidu.png)');
      $("#selected").removeClass();
      $("#selected").addClass("icon baidu")
       setItem(engine,1);
        $(".engine").hide();
    })


    $("#search_bing").bind('click',function(){
    	// $("#selected").css('background-image','url(images/taobao.png)');
    	$("#selected").removeClass();
    	$("#selected").addClass("icon bing")
      setItem(engine,2);
        $(".engine").hide();
    })

    $("#search_taobao").bind('click',function(){
    	// $("#selected").css('background-image','url(images/taobao.png)');
    	$("#selected").removeClass();
    	$("#selected").addClass("icon taobao")
        setItem(engine,3);
        $(".engine").hide();
    })
  
   $("#clickToSearch").bind('click',function(){
   	var searchTxt =  encodeURIComponent(document.getElementById("searchinput").value); 
    var Num; 
    if (getItem(engine) == null) //第一次默认google 搜索，之后有记忆功能
      Num = 0;
    else 
      Num = getItem(engine);
		if (searchTxt!=""){
      var select = searchUrl[Num];
		  var adres= select +searchTxt;
		  window.open(adres);
		}
   })

  $(window).bind("keydown" ,function(e){
  	if(e.keyCode == 13)
  		if(searchUrl != "")
  		$("#clickToSearch").click();
  })

  $("#fronter").click(function(){
    $(".engine").hide();
  })

})


function setItem(key, value) {
    try {
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, value);
    }catch(e) {
    }
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


function setIcon(){
   var searchNum;
   if (getItem(engine) == null) 
    searchNum = 0;
  else
    searchNum = getItem(engine);
    $("#selected").removeClass();
    if (searchNum == 0) $("#selected").addClass("icon google");
      else if (searchNum == 1) $("#selected").addClass("icon baidu");
        else if (searchNum == 2)  $("#selected").addClass("icon bing");
          else  $("#selected").addClass("icon taobao");

}