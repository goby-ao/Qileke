var TOOL;
var ToolMark;

function Toolsdialog(){

  var edit = $('<div id="toolshow"><div class="tool_hide"><div class="bar_name" >书签</div><div class="tool_pic"><img id="tool_0" src="image/'+TOOL.charAt(0)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">应用程序</div><div class="tool_pic"><img id="tool_1" src="image/'+TOOL.charAt(1)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">常去网站</div><div class="tool_pic"><img id="tool_2"  src="image/'+TOOL.charAt(2)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">浏览历史</div><div class="tool_pic"><img id="tool_3" src="image/'+TOOL.charAt(3)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">最近关闭</div><div class="tool_pic"><img id="tool_4" src="image/'+TOOL.charAt(4)+'.png" style="height:28px;width:65px;"></div></div></div>');
  $('#tools').bind('click',function() {
    $('#toolsdialog').empty().append(edit).dialog({autoOpen: false,
      closeOnEscape: true, title: '功能设置', modal: true, width: 420,height: 330,
      buttons: {
      '确认' : function() {
        console.log("TOOL:"+TOOL)
        localStorage["toolmark"] = TOOL;
        showbar();
        $(this).dialog('destroy');24
        autoAdapt();
       },
      '取消': function() {

        TOOL=localStorage["toolmark"];
        edit = $('<div id="toolshow"><div class="tool_hide"><div class="bar_name" >书签</div><div class="tool_pic"><img id="tool_0" src="image/'+TOOL.charAt(0)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">应用程序</div><div class="tool_pic"><img id="tool_1" src="image/'+TOOL.charAt(1)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">常去网站</div><div class="tool_pic"><img id="tool_2"  src="image/'+TOOL.charAt(2)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">浏览历史</div><div class="tool_pic"><img id="tool_3" src="image/'+TOOL.charAt(3)+'.png" style="height:28px;width:65px;"></div></div><div class="tool_hide"><div class="bar_name">最近关闭</div><div class="tool_pic"><img id="tool_4" src="image/'+TOOL.charAt(4)+'.png" style="height:28px;width:65px;"></div></div></div>') ;

         $(this).dialog('destroy');
      },
    }}).dialog('open');
  });
}



function Tools(){
  if(localStorage["toolmark"]==undefined){
    localStorage["toolmark"] = "11111111";
  }
  TOOL=localStorage["toolmark"];
  showbar();
  for (var i = 0; i < 5; i++) {
    changemark(i);
  }
  Toolsdialog();
}


function showbar(){
  for (var i = 0; i < 5; i++) {
    if(TOOL.charAt(i)==1){
      $("#dot-"+i).show();
    }
    else{
      $("#dot-"+i).hide();
    }
  }
}


function changemark(i){
  
    $("#tool_"+i).live("click",function(){
      if(TOOL.charAt(i)==0){
        // console.log("TOOL.substring(0,i-1):"+TOOL.substring(0,i-1))
        TOOL=TOOL.substring(0,i)+"1"+TOOL.substring(i+1,8);
        $("#tool_"+i).attr("src","image/1.png");
      }
      else{
        TOOL=TOOL.substring(0,i)+"0"+TOOL.substring(i+1,8);
        $("#tool_"+i).attr("src","image/0.png");
      }
      // console.log("TOOL:"+TOOL);
    })

  // $("#tool_0").live("click",function(){
  //   if(TOOL.charAt(0)==0){
  //     TOOL="1"+TOOL.substring(1,8);
  //     $("#tool_0").attr("src","image/edit.png");
  //   }
  //   else{
  //     TOOL="0"+TOOL.substring(1,8);
  //     $("#tool_0").attr("src","image/delete.png");
  //   }
  //   console.log("TOOL:"+TOOL);
  // })


// $("#tool_1").live("click",function(){
//   var i=1;
//   if(TOOL.charAt(i)==0){
    
//     TOOL=TOOL.substring(0,i)+"1"+TOOL.substring(i+1,8);
//     $("#tool_1").attr("src","image/edit.png");
//   }
//   else{
//     TOOL=TOOL.substring(0,i)+"0"+TOOL.substring(i+1,8);
//     $("#tool_1").attr("src","image/delete.png");
//   }
//   console.log("TOOL:"+TOOL);
  
// })

}

