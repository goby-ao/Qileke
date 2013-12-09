// $("#qileke_back").live("click",function(){
//   var fmark=$("#fback").attr("fmark");
//   if(fmark==0){
//     $("#qileke_back").hide();
//     $("#qilekefolder_list").show();
//     $("#qilekelist_show").hide();
//   }
//   if(fmark==1){
//     $("#fback").attr("fmark",0);
//     $("#qilekefolder_list").hide();
//     $("#qilekelist_show").show();
//     $("#qilekecontent_show").hide();
//   }
// })


//the function of content page button 
$("#contentback").live("click",function(){
    $("#iframe_video").remove();
    $("#qileke_favlist").show();
    $("#qilekecontent_show").hide();
    qilekesliden("favlist-container",sliden_qileke_list);

});

//the function of favlist page button 
$("#listback").live("click",function(){  
    $("#qilekefolder_list").show();
    $("#qileke_favlist").hide();
    qilekesliden("page_list_qileke",sliden_qileke);
 
});

//get qileke folders array

var arrayFolders=[];
var arrayFolders_length=[];
var Folders_amount=0;
function qilekeshow(){
    $("#loginye").hide();
    var getUID = { "userId": userID };
    visitamount=2;
    $("#qilekefolder_list").show();
    arrayFolders=[];
    arrayFolders_length=[];
    $.getJSON(siteDomain + "index.php?app=service&mod=Fold&act=getFolderData", getUID ,function (data) {
        //console.log(data);
        for (var j = 0; j < data.length; j++) {
            Folders_amount=data.length;
            arrayFolders_length.push(data[j].list.length);
            for (var i = 0; i < data[j].list.length; i++) {
                arrayFolders.push(data[j].list[i]);
            }
        }
       //console.log(arrayFolders_length);
        qilekefolderlist();
    })
}


var qilekefolder=0; //folder numbers
var qilekefoldercount=0;
var qileke_folder_amount=0;

//set the width of qileke folder list
function qilekefolderlist(){
    var length_b=0;
  	qilekefoldercount=0;
    qilekefolder=arrayFolders.length;
    //console.log("screenwidth:"+screenwidth)
    qileke_folder_amount=Math.floor(window.innerHeight/212)-1;
    if(qileke_folder_amount<2){
      qileke_folder_amount=2;
    }
    // console.log("dfase:"+window.innerHeight/212)
    //console.log("qileke_folder_amount:"+qileke_folder_amount);
    //var b=Math.ceil(qilekefolder/qileke_folder_amount);
    var b=0;
    for (var i = 0; i < Folders_amount; i++) {
       b=b+Math.ceil(arrayFolders_length[i]/qileke_folder_amount);
    };
    
    var qileke_list_width=b*180+50+Folders_amount*60;

    $("#qileke_show").remove();
    var qileke_list_div;
    qileke_list_div=document.createElement('div');
    qileke_list_div.id='qileke_show';
    qileke_list_div.style.marginLeft = '50px';
    qileke_list_div.style.marginTop = '85px';
    qileke_list_div.style.width=qileke_list_width+'px';
    document.getElementById("qilekefolder_list").appendChild(qileke_list_div);

    $("#qileke_show").animate({scrollLeft:0},0);
    key("qilekefolder_list");
    //console.log("client_height:"+client_height);
    var ff=0;
    for (var i = 0; i < Folders_amount; i++) {
        var a=Math.ceil(arrayFolders_length[i]/qileke_folder_amount);
        addqilekefolder(ff,a+ff,arrayFolders_length[i]);
        ff=ff+a;
    }
    //addqilekefolder(0,b);
  
}

//add qileke folder moudule
// odder
// function addqilekefolder(init,all){
// 	  for(var i=init;i<all;i++){
//       var bookmarkblock;
//       bookmarkblock=document.createElement("div");
//       bookmarkblock.id="qilekefolder_"+i;
//       bookmarkblock.className="blockqileke"; 
//       bookmarkblock.style.height=214*qileke_folder_amount+'px';

//       // window.onresize = onResize_qileke;
//       // onResize_qileke();
//       window.onresize = autoAdapt;
//       autoAdapt();  

//       document.getElementById("qileke_show").appendChild(bookmarkblock);
//       var Div = document.getElementById("qilekefolder_"+i);
   
//       for (var j = qilekefoldercount; j < qilekefolder; j++) {
//         var item=arrayFolders[j];
//         showqilekefolder(Div,item);
//         qilekefoldercount++;
//         if(qilekefoldercount>0&&qilekefoldercount%qileke_folder_amount==0)
//           break;   
//       }
//       // if(i==all-1) {
//       //   Div.style.marginRight = '60px';
//       } 
//     }
// }

function addqilekefolder(init,all,le){
  //console.log("le:"+le);
  var le_amount=0;

    for(var i=init;i<all;i++){
      var bookmarkblock;
      bookmarkblock=document.createElement("div");
      bookmarkblock.id="qilekefolder_"+i;
      bookmarkblock.className="blockqileke"; 
      bookmarkblock.style.height=214*qileke_folder_amount+'px';

      // window.onresize = onResize_qileke;
      // onResize_qileke();
      window.onresize = autoAdapt;
      autoAdapt();  

      document.getElementById("qileke_show").appendChild(bookmarkblock);
      var Div = document.getElementById("qilekefolder_"+i);
      
      for (var j = 0; j < qileke_folder_amount; j++) {
         //console.log("j:"+j)
        var item=arrayFolders[qilekefoldercount];
        showqilekefolder(Div,item);
        qilekefoldercount++;
        le_amount++;
        if(le_amount==le){break;}
        //console.log(qileke_folder_amount);
        // if(j>0 && (j+1)%qileke_folder_amount==0)
        //   break;   
      }
      if(i==all-1) {
        Div.style.marginRight = '60px';
      } 
    }
}


//show folders
function showqilekefolder(markdiv,items)
{
	var div;
	if(items.thumbUrl!=""){
		div = document.createElement("div");
		div.className="sy-light-bg0 folder";
		div.id="qfolder-"+items.folderId;

    var img=document.createElement("img");
    img.src=items.thumbUrl;
    img.style.height="200px";
    img.style.width="160px";
		//div.style.backgroundImage="url("+items.thumbUrl+")";
    div.appendChild(img);
		
		divM = document.createElement('div');
		// divM.style.backgroundImage = 'url("http://www.qileke.com/images/bg/item-shade.png")';
		divM.className='changeimage';

		var h2 = document.createElement('h2');
		h2.innerHTML=items.title;
		h2.className="title2";

		var p = document.createElement('p');
		p.className="description";
		p.innerHTML=items.description;

		divM.appendChild(h2);
		divM.appendChild(p);
		divM.width=110+"px";
		divM.height=80+"px";
		div.appendChild(divM);
	}
	else
	{
		div = document.createElement('div');
		div.className="sy-light-bg10 folder";
		div.id="qfolder-"+items.folderId;
    //div.style.cssText="position:r"

    var divs=document.createElement('div');
    divs.className="changecolor";


		var h2 = document.createElement('h2');
		h2.innerHTML=items.title;
		h2.className="title";

		var p = document.createElement('p');
		p.className="description";
		p.innerHTML=items.description;

		divs.appendChild(h2);
		divs.appendChild(p);
    div.appendChild(divs);
	}
	div.onclick=function(){
			getFavList(items);
	}
	markdiv.appendChild(div);
}


var arrayFavList = [];
var arrayFavList_length = [];
var FavList_amount=0;


//get favlist array
function getFavList(items){
	var getFolderId={ "folderId": items.folderId };
	$.getJSON(siteDomain + "index.php?app=service&mod=Favorite&act=getFavList", getFolderId ,function (data) {
      console.log(data);
      arrayFavList=[];
      arrayFavList_length=[];
      for (var j = 0; j < data.areaList.length; j++) {
        FavList_amount=data.areaList.length;
        arrayFavList_length.push(data.areaList[j].list.length);
  			for (var k = 0; k < data.areaList[j].list.length; k++) {
          
  				arrayFavList.push(data.areaList[j].list[k]);
  			}
  		}
  		//console.log(arrayFavList);
      $("#qilekefolder_list").hide();
      $("#folder_title_qileke").html(items.title);
      qilekefavlist();
    });
  //console.log(arrayFavList_length);
}

var qilekefavcount=0;
var qilekefav=0;
var qileke_fav_amount=0;
//set the width of qileke favlist
function qilekefavlist(){
    var length_c=0;
    $("#qileke_favlist").show();
    qilekefavcount=0;
    qilekefav=arrayFavList.length;

    client_height=document.documentElement.clientHeight-175;
    qileke_fav_amount=Math.floor(client_height/130);
    if(qileke_fav_amount<2){qileke_fav_amount=2;}
    //var b=Math.ceil(qilekefav/qileke_fav_amount);
    var b=0;
    for (var i = 0; i < FavList_amount; i++) {
      b=b+Math.ceil(arrayFavList_length[i]/qileke_fav_amount);
    };

    var qileke_list_width=b*234+50+FavList_amount*60;
    var qileke_list_div;
    $("#qilekelist_show").remove();
    qileke_list_div=document.createElement('div');
    qileke_list_div.id='qilekelist_show';
    qileke_list_div.style.marginLeft = '50px';
    qileke_list_div.style.width=qileke_list_width+'px';
    document.getElementById("favlist-container").appendChild(qileke_list_div);
    //自适应
    // window.onresize = onResize_qlk;
    // onResize_qlk();

    qilekesliden("favlist-container",sliden_qileke_list);
    $("#favlist-container").animate({scrollLeft:0},0);
    key("favlist-container");
    //addqilekefolderfav(0,b);
    var ff=0;
    for (var i = 0; i < FavList_amount; i++) {
      var a=Math.ceil(arrayFavList_length[i]/qileke_fav_amount);
      addqilekefolderfav(ff,a+ff,arrayFavList_length[i]);
      ff=ff+a;
    }
}

//add qileke favlist moudule
// function addqilekefolderfav(init,all){
//     for(var i=init;i<all;i++){   
//       var bookmarkblock;
//       bookmarkblock=document.createElement("div");
//       bookmarkblock.id="qilekelist_"+i;
//       bookmarkblock.className="blocklistqileke"; 
//       bookmarkblock.style.height=132*qileke_fav_amount+'px';
//       document.getElementById("qilekelist_show").appendChild(bookmarkblock);

//       var Div = document.getElementById("qilekelist_"+i);
//       for (var j = qilekefavcount; j < qilekefav; j++) {
//           var item=arrayFavList[j];
//           showqilekefavlist(Div,item);
//           qilekefavcount++;
//           if(qilekefavcount>0&&qilekefavcount%qileke_fav_amount==0)
//             break;   
//       }  
//     }
// }
function addqilekefolderfav(init,all,le){
  var le_amount=0;
  //console.log("le:"+le)
    for(var i=init;i<all;i++){   
      var bookmarkblock;
      bookmarkblock=document.createElement("div");
      bookmarkblock.id="qilekelist_"+i;
      bookmarkblock.className="blocklistqileke"; 
      bookmarkblock.style.height=132*qileke_fav_amount+'px';
      document.getElementById("qilekelist_show").appendChild(bookmarkblock);

      var Div = document.getElementById("qilekelist_"+i);
      for (var j = 0; j < qileke_fav_amount; j++) {
         //console.log("j:"+j)
        var item=arrayFavList[qilekefavcount];
        showqilekefavlist(Div,item);
        qilekefavcount++;

        le_amount++;
        if(le_amount==le){break;}
        
        //console.log(qileke_folder_amount);
        // if(j>0 && (j+1)%qileke_folder_amount==0)
        //   break;   
      }
      if(i==all-1) {
        Div.style.marginRight = '60px';
      } 
      
    }
}



//show favlist
function showqilekefavlist(markdiv,item){
  var div;
  div = document.createElement("div");
  div.className="x-container usa-thumb-wrap x-container-default";
  div.id="favlist-"+item.favId;

  var showdiv;
  showdiv = document.createElement("div");
  showdiv.className="usa-thumb sy-light-bg0";

  var resourceType=item.resourceType;

  if(resourceType=="IMAGE"){
    div.onclick=function(){
      getFavDetail(item,imagelist);
    }
    var title=item.title;
    if(title==null)
      title="图片";
    showdiv.innerHTML='<div class="mask" style="opacity: 0.15; "></div><img src="'+item.cover+'"><div class="shade"><h2 class="title"><span class="title-icon photo-icon-small"></span>'+title+'</h2></div>';
  }

  if(resourceType=="WEB_SITE"){
    if(item.cover!=""){
      showdiv.innerHTML='<div class="mask" style="opacity: 0.15; "></div><div class="website website-icon"></div><div class="web-logo-wrap"><div class="web-logo"><p><img src="'+item.cover+'"></p></div></div>';
    }
    else{
      showdiv.innerHTML='<div class="borders" style="opacity: 0; " ></div><div class="website website-icon"></div><h2 class="title noimg">'+item.title+'</h2>';
    }
    div.onclick=function(){
      $("#qileke_back").show();
      window.open(item.link);
    }
  }

  if(resourceType=="VIDEO"){
    div.onclick=function(){
      getFavDetail(item,videolist);
    }
    showdiv.innerHTML='<div class="mask video" style="opacity: 0.1; "></div><span class="play-btn play-icon" style="opacity: 0.4; " id="ext-gen2095"></span><img src="'+item.cover+'"><div class="shade"><h2 class="title">'+item.title+'</h2></div>';
  }

  if(resourceType=="CONTENT_PAGE"){
    if(item.cover==null){
      showdiv.innerHTML='<div class="borders" style="opacity: 0; "></div><h2 class="title noimg">'+item.title+'</h2>';
    }
    else{
      showdiv.innerHTML='<div class="mask" style="opacity: 0.15; " id="ext-gen1590"></div><img src="'+item.cover+'"><div class="shade"><h2 class="title">'+item.title+'</h2></div>';
    }
     div.onclick=function(){
      getFavDetail(item,contentlist);
    }
  }

  var changediv;
  changediv = document.createElement("div");
  changediv.className="tools";
  changediv.innerHTML='<a class="btn delete sy-hide" href="#"><div class="btn view-delete-icon"><div class="icon-cover delete-btn" data-qtip="删除"></div></div></a><a class="btn edit sy-hide" href="#"><div class="btn view-edit-icon"><div class="icon-cover edit-btn" data-qtip="修改"></div></div></a>';
  showdiv.appendChild(changediv);
  div.appendChild(showdiv);
  markdiv.appendChild(div);
}

//choose and get FavDetail
function getFavDetail(getitem,functionname){
  $("#qilekecontent_show").remove();
  var qileke_list_div;
  qileke_list_div=document.createElement('div');
  qileke_list_div.id='qilekecontent_show';
  document.getElementById("page_list_qileke").appendChild(qileke_list_div);
  
  var getcontextId={ "favId": getitem.favId };
  $.getJSON(siteDomain + "index.php?app=service&mod=Favorite&act=getFavDetail", getcontextId ,function (data) {
    //console.log(data);
    $("#content_show").animate({scrollLeft:0},0);
    key("content_show");
    functionname(data);
    qilekesliden("content_show",sliden_qileke_content);
  });
}


function videolist(items){
    var videomodule='<div class="x-container tbar article-tbar x-container-default" style="height:70px;" id="article-header-1220"><a class="article-icon left" id="contentback" href="#"><div class="btn article-back-icon" data-qtip="返回 (Esc)"></div></a><a class="title fav-title" href="'+items.link+'" target="_blank" data-qtip="'+items.title+'">'+items.title+'</a></div><div class="x-container fav-page x-box-item x-container-default" id="container-1144" style="background: #F8F8F8;left: 0px;  margin: 0px; height: 100%; width: 100%; "><div id="content_show" class="scroll-wrap"><div class="scroll" style="width: 1400px; "><div class="section info"><div class="item"><span class="label">收藏者 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;desktop=Widget">'+items.userName+'</a></span></div><div class="item"><span class="label">所属收藏夹 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;folder=34225">'+items.folderName+'</a></span></div><div class="item"><span class="label">来自 : </span><span class="input">'+items.domain+'</span></div><div class="item"><span class="label">视频地址 : </span><span class="input"><a class="a_link" href="'+items.link+'" target="_blank">'+items.link+'</a></span></div><div class="item"><span class="label">描述 : </span><p class="input description">'+items.metaDescription+'</p></div></div><div class="video"><iframe  id="iframe_video" src="'+items.videoContent+'" style="width: 750px;height: 450px;border-width:0"></iframe></div></div></div></div>'
    document.getElementById("qilekecontent_show").innerHTML=videomodule;
    $("#qileke_favlist").hide();  
}

function imagelist(items){
    var rawImageSize=items.rawImageSize;
    var index1 = rawImageSize.indexOf("x");
    var index2=rawImageSize.length;
    var imagewidth= rawImageSize.substring(0,index1);
    var imagelength=rawImageSize.substring(index1+1,index2);
    var i=window.screen.width-400;
    var imagemodule='<div class="x-container tbar article-tbar x-container-default" style="height:70px;" id="article-header-1220"><a class="article-icon left" id="contentback" href="#"><div class="btn article-back-icon" data-qtip="返回 (Esc)"></div></a><a class="title fav-title" href="'+items.link+'" target="_blank" data-qtip="'+items.title+'">'+items.title+'</a></div><div class="x-container fav-page x-box-item x-container-default" id="container-1219" style="background: #F8F8F8;left: 0px;  margin: 0px; height: 100%; width: 100%; "><div id="content_show" class="scroll-wrap"><div class="scroll" style="width:'+screenwidth+'px;"><div class="section info"><div class="item"><span class="label">收藏者 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;desktop=Widget">'+items.userName+'</a></span></div><div class="item"><span class="label">所属收藏夹 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;folder='+items.folderId+'">'+items.folderName+'</a></span></div><div class="item"><span class="label">来自 : </span><span class="input">'+items.domain+'</span></div><div class="item"><span class="label">图片尺寸 : </span><span class="input">'+items.rawImageSize+'</span></div><div class="item"><span class="label">图片地址 : </span><span class="input"><a class="a_link" href="'+items.link+'" target="_blank">'+items.link+'</a></span></div><div class="item"><span class="label">描述 : </span><p class="input description">'+items.description+'</p></div><div class="item btn"><a class="label setbg" href="#" id="ext-gen1696" style="display:none">设为首页背景</a></div></div><div class="img-section" style="height:2000px; width:'+i+'px"><div class="img-wrap"><a href="'+items.rawImage+'" target="_blank"><img class="picture_fav" src="'+items.rawImage+'" title="点击查看原图"></a></div></div></div></div>';
    document.getElementById("qilekecontent_show").innerHTML=imagemodule;
    
    // if(imagewidth>800 || imagelength>500){
    //   if(imagewidth>=imagelength*1.6){
    //     $(".picture_fav").addClass("picture_fav_w");
    //   }
    //   else{
    //     $(".picture_fav").addClass("picture_fav_l");
    //   }
    // }

    client_height=document.documentElement.clientHeight-175;
    //console.log("client_height:"+client_height)
    if(imagelength>client_height){
        $(".picture_fav").addClass("picture_fav_l");
        $(".picture_fav_l").css("height",client_height);
      
    }
    $("#qileke_favlist").hide();  
}

function contentlist(items){
  var screenlist=window.innerHeight-175;
    var contentmodule='<div class="x-container tbar article-tbar x-container-default" style="height:70px;" id="article-header-1220"><a class="article-icon left" id="contentback" href="#"><div class="btn article-back-icon" data-qtip="返回 (Esc)"></div></a><a class="title fav-title" href="'+items.link+'" target="_blank" data-qtip="'+items.title+'">'+items.title+'</a></div>'+'<div class="x-container article-page x-container-default " id="container-1219" style="height: 100%; "><div id="content_show" class="scroll-wrap" style="max-height:'+screenlist+'px;"><div class="scroll"><div class="content" style="max-height:'+screenlist+'px;"><div class="item"><span class="label">收藏者 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;desktop=Widget">'+items.userName+'</a></span></div><div class="item"><span class="label">所属收藏夹 : </span><span class="input"><a target="_blank" class="username" href="'+siteDomain+'home#uid='+items.userId+'&amp;folder='+items.folderId+'">'+items.folderName+'</a></span></div><div class="item"><span class="label">来自 : </span><span class="input">'+items.domain+'</span></div><div class="item" style="height: 24px;"><span class="label">原文地址 : </span><span class="input"><a class="a_link" href="'+items.link+'" target="_blank" style="width: 500px;">'+items.link+'</a></span></div><div class="item item-area"><span class="label">描述 : </span><span class="description">'+items.description+'</span><div style="margin-bottom:50px"></div></div>'+items.articleContent+'<div class="end-mark" id="ext-gen2102"></div></div></div></div></div>';
    document.getElementById("qilekecontent_show").innerHTML=contentmodule;
    $('.content img').removeAttr('width').removeAttr('height').css({
      width: 'auto',
      height: 'auto'
    });

    $("#qileke_favlist").hide();  
}

//change color
//  $(".sy-light-bg0").live("mouseover",function(){
//  $(".changeimage" ).animate({
//          backgroundColor: "#aa0000",
//          color: "#fff"
//        }, 1000 );
// })

