var siteDomain="http://www.qileke.com/";
var arrayFolders = new Array();
var count = 0;
var visitamount=0;
var userID;
var backgroundimageStorage;

//open new page, set background-iamge by localstorage record firstly
$(function(){
  backgroundimageStorage = localStorage.getItem("backgroundimage");
  if(backgroundimageStorage){
    $('#fronter').css("background-image","url("+backgroundimageStorage+")");
  }
  start();
})

//check user login status
function start(){  
	$.getJSON(siteDomain + "index.php?app=service&mod=Home&act=isLogged", function (data) {
		 //console.log(data)
      if (data.success) {
        visitamount=1;
        isLogin = true;
        userID = data.memberId;
        UserInformation();            
      }
      else {
        isLogin = false;
        visitamount=0;
        $("#User_Information").hide();
        getlocalbackground(); 
      }
  });
}

function getlocalbackground(){
    $('#fronter').css("background-image","-webkit-gradient(linear, left bottom, right top, color-stop(0%,rgba(0,87,111,1)), color-stop(80%,rgba(85,202,231,1)), color-stop(100%,rgba(0,201,255,0)));");

}

//storge background-image by localstorage 
function background_img(BackgroundId,BackgroundURL){
    var ImageURLStorage=localStorage.getItem("ImageURL");
    var backgroundimageStorage = localStorage.getItem("backgroundimage");
    if(ImageURLStorage==BackgroundURL && backgroundimageStorage){
      $('#'+BackgroundId).css("background-image","url("+backgroundimageStorage+")");
    }
  
    else {
        // Create XHR, BlobBuilder and FileReader objects
        var xhr = new XMLHttpRequest(),
            blobBuilder = new (window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.OBlobBuilder || window.msBlobBuilder),
            blob,
            fileReader = new FileReader();

        xhr.open("GET", BackgroundURL, true);
        // Set the responseType to arraybuffer. "blob" is an option too, rendering BlobBuilder unnecessary, but the support for "blob" is not widespread enough yet
        xhr.responseType = "arraybuffer";
        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                // Append the response to the BlobBuilder
                blobBuilder.append(xhr.response);
                // Create a blob with the desired MIME type
                blob = blobBuilder.getBlob("image/png");
                // onload needed since Google Chrome doesn't support addEventListener for FileReader
                fileReader.onload = function (evt) {
                    // Read out file contents as a Data URL
                    var result = evt.target.result;
                    // Set image src to Data URL
                    $('#'+BackgroundId).css("background-image","url("+result+")");
                    // Store Data URL in localStorage
                    try {
                        localStorage.setItem("ImageURL", BackgroundURL);
                        localStorage.setItem("backgroundimage", result);
                    }
                    catch (e) {
                        console.log("Storage failed: " + e);
                    }
                };
                // Load blob as Data URL
                fileReader.readAsDataURL(blob);
            }
        }, false);
        // Send XHR
        xhr.send();
    }
}


//get user information
function UserInformation(){
    var getUID = { "userId": userID };
    $("#User_Information").show();
    $.getJSON(siteDomain + "index.php?app=service&mod=Home&act=getUserData", getUID ,function (data) {
        //console.log(data)
        var Background=data.background;
        if(Background!=""){
          //$('#fronter').css("background-image","url("+Background+")");
          background_img("fronter",Background);
          $("#UserName").text(data.userName);
          $("#UserImage").attr("src",data.avatar);
        }
        else{

          $('#fronter').css("background-image","-webkit-gradient(linear, left bottom, right top, color-stop(0%,rgba(0,87,111,1)), color-stop(80%,rgba(85,202,231,1)), color-stop(100%,rgba(0,201,255,0)));");
          $("#UserName").text(data.userName);
          $("#UserImage").attr("src",data.avatar);
        }
    });
}

//login
function userLogin() {
    $(".sy-loading").removeClass("hidden-loading");
    //$(".hidden-loading").css("visibility","auto");
    var username = $("#email").val();
    var userpwd = $("#password").val();
    var loginInfo = { "email": username, "password": userpwd };
    $.ajax({
        type: "POST",
        url: siteDomain + "index.php?app=home&mod=Public&act=doAjaxLogin",
        data: loginInfo,
        dataType: "json",
        async: false,
        success: function (msg) {
            if (msg.status == 1) {
                //console.log(msg);
                UserInformation();  
                qilekeshow();
            }
            else {
                //$("#email").val("");
                $("#password").val("");
                //alert("用户名和密码输入不正确,请重新输入");
                //Loginfalse();
            }
        }
    }).complete(function(){
        $(".sy-loading").addClass("hidden-loading");
      })
}

var email_check = false;
var password_check = false;
//验证email格式的正确性
 
$("#submit_qileke").live("click",userLogin);
$("#email").live("blur",isEmailChecked);
//$("#password").live("blur",isPasswordChecked);

function isEmailChecked(){
  var email = $.trim($("#email").val());
    var reg=/^[_A-Za-z0-9.]{3,}@\w+(\.\w+)+$/;   
      if(!reg.test(email)){  
    //alert("请重新输入用户名");  
      }else{   
        email_check = true;
      }   
}
  

// logout
$("#logout_button").live("click",Logout);
function Logout(){
    $.ajax({
        type: "GET",
        url: siteDomain + "index.php?app=service&mod=Home&act=logout",
        dataType: "json",
        async: false,
        success: function (msg) {
          visitamount=0;
          $("#User_Information").hide();
          $("#qilekefolder_list").hide();
          $("#qileke_favlist").hide();
          $("#qilekecontent_show").hide();
          // $("#loginye").show();
          $("#loginye").remove();
          var loginye_div = document.createElement("div");
          loginye_div.id = "loginye";
          loginye_div.className = "displayblock";
          loginye_div.style.width="100%";
          loginye_div.style.height="100%";
          loginye_div.style.backgroundColor="#f3f3f3";
          loginye_div.innerHTML = '<div id="container" ><div id="header"><h1><span class="x-unselectable">收藏点点滴滴|奇乐客</span></h1></div><div id="body"><form id="login" action="" method="post" ><div id="form"><input id="email" name="username" class="text" placeholder="用户名"/><input type="password" id="password" name="password" class="text" placeholder="密码" /><a href="http://www.qileke.com/register" target="_blank" class="sy-btn sy-cancel-btn">注册</a><a class="btn ok-btn" id="submit_qileke" >登录</a><a href="http://www.qileke.com/sendPassword" target="_blank" id="forget" class="sy-link" >忘记密码?</a></div></form></div><div id="footere"><div id="info-bar"><p><span >北京奇乐客科技有限公司</span></p></div></div></div><div class="sy-loading hidden-loading"><span class="sy-wait icon"></span><span class="loading-msg">loading......</span></div>'
          $("#page_list_qileke").append(loginye_div);
          getlocalbackground(); 

          
            // if (msg.status == 1) {
                //console.log(msg);
               console.log("success");
            // }
            // else {
            //     //$("#email").val("");
            //     $("#password").val("");
            //     //alert("用户名和密码输入不正确,请重新输入");
            //     //Loginfalse();
            // }
        }
    })  
}


/*
var sendHover = document.getElementById("User_Information");
sendHover.onmouseover = function () {
    $("#logout").show().animate({ top: "50px" }, "slow");
}
sendHover.onmouseout = function () {
    $("#logout").hide();
} 
*/

$("#User_Information").live('click', function () {
    $("#logout").show().animate({ top: "0px" }, "fast");
    
    var sendHover = document.getElementById("logout");
    sendHover.onmouseout = function () {

        $("#logout").hide();
    }
    var a = document.getElementById("song");
    a.onmouseover = function () {
        $("#logout").show();
    } 

})

$("#fronter").live('click', function () {
    $("#logout").hide();
})


$("#discover_qileke").live('click', function () {
  var link=siteDomain+'home#uid='+userID+'&desktop=Wander';  
  //console.log(link);
    window.open(link);
})

$("#friends_qileke").live('click', function () {
  var link=siteDomain+'home#uid='+userID+'&desktop=Follow';  
  //console.log(link);
    window.open(link);
})

$("#message_qileke").live('click', function () {
  var link=siteDomain+'message';  
  //console.log(link);
    window.open(link);
})

$("#changeBackground").live('click', function () {
  var link="http://www.qileke.com/home#uid=1005131&folder=6442";  
  //console.log(link);
    window.open(link);
})

$("#setting_qileke").live('click', function () {
  var link=siteDomain+'setting';  
  //console.log(link);
    window.open(link);
})

$("#tools_qileke").live('click', function () {
  var link=siteDomain+'tools';  
  //console.log(link);
    window.open(link);
})


$("#help_qileke").live('click', function () {
  var link=siteDomain+'home#uid='+userID+'&help=';  
  //console.log(link);
    window.open(link);
})


//Login false
function Loginfalse(){
    var notice = $('<div style="width:250px">对不起，您登录失败</div>');
    $('#noticedialog').empty().append(notice).dialog({
       autoOpen: false,
       title: '登录失败',
       resizable: false,
       height: 170,
       modal: true,
       width: 300,
       show: 'slide', 
       overlay: {
       backgroundColor: '#000',
       opacity: 0.5
       },
       buttons: {
         "忘记密码": function() {
            window.open("http://www.qileke.com/sendPassword");
            $(this).dialog('destroy');
          },
          "确认": function() {
            $(this).dialog('destroy');
          }
       }
     }).dialog('open');
}