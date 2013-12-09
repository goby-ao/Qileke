// function onResize_qileke(onResize_div){  
//          var marginTop = (window.innerHeight - 500)/2 ;
//           var div_height = window.innerHeight ;   
//           $("#fronter").css("height",div_height);
//            if(window.innerHeight >= 400)
//               $("#"+onResize_div).css("margin-top",marginTop);
//             else
//              $("#"+onResize_div).css("margin-top",40);
//      }
function onResize_search(){  //自适应屏幕
         var sWidth = (window.innerWidth - 382 )/2;

            $("#search").css("margin-left",sWidth);
            $("#engine").css("margin-left",sWidth);
        
     }  

function onResize_history(){  //自适应屏幕
         var marginTop = (window.innerHeight - 450)/2 ;
         var div_height = window.innerHeight ;   
          $("#fronter").css("height",div_height);
           if(window.innerHeight >= 400)
              $("#history_show").css("margin-top",100);
            else
            $("#history_show").css("margin-top",40);
     }


function onResize_qlk(){      
         var marginTop = (window.innerHeight - 600)/2 ;
           if(window.innerHeight >= 550)
              $("#qilekelist_show").css("margin-top",marginTop);
            else
             $("#qilekelist_show").css("margin-top","0px");
     }
     
function onResize_qileke(){  
         var marginTop = (window.innerHeight - 500)/2 ;
          var div_height = window.innerHeight  ;   
          $("#fronter").css("height",div_height);
           if(window.innerHeight >= 400)
              $("#qileke_show").css("margin-top",marginTop);
            else
             $("#qileke_show").css("margin-top",40);
     }


// function onResize_bookmark(){  
//          var marginTop = (window.innerHeight - 500)/2 ;
//           var div_height = window.innerHeight  ;   
//           $("#fronter").css("height",div_height);
//            if(window.innerHeight >= 400)
//               $("#bookmark_show").css("margin-top",marginTop);
//             else
//              $("#bookmark_show").css("margin-top",40);
//      }

function onResize_addlink(){  
         var marginTop = (window.innerHeight - 450)/2 ;
          var div_height = window.innerHeight  ;   
          var a = (window.innerWidth - 600)/2;
          $("#fronter").css("height",div_height);
           if(window.innerHeight >= 400)
              $("#LINK_show").css("margin-top",120);
            else
             $("#LINK_show").css("margin-top",40);
           autoAdapt();
     }

function onResizeApp(){ 
         var marginTop = (window.innerHeight - 500)/2 ;
          var div_height = window.innerHeight  ;   
          $("#fronter").css("height",div_height);
           if(window.innerHeight >= 400)
              $("#program_show").css("margin-top",marginTop);
            else
             $("#program_show").css("margin-top",0);
     }

function onResize_mostvisit(){  
    var marginTop = (window.innerHeight - 500)/2 ;
    var div_height = window.innerHeight;   
    $("#fronter").css("height",div_height);
    if(window.innerHeight >= 400)
      $("#mostvisit_show").css("margin-top",marginTop);
    else
     $("#mostvisit_show").css("margin-top",40);
}


function onResize_recent(){  
         var marginTop = (window.innerHeight - 500)/2 ;
         var div_height = window.innerHeight;   
          $("#fronter").css("height",div_height);
           if(window.innerHeight >= 400)
              $("#recent_show").css("margin-top",marginTop);
            else
            $("#recent_show").css("margin-top",40);
     }


// function onResize_mostvisit(){  
//          var marginTop = (window.innerHeight - 500)/2 ;
//          var div_height = window.innerHeight  ;   
//           $("#fronter").css("height",div_height);
//            if(window.innerHeight >= 400)
//            	  $("#mostvisit_show").css("margin-top",marginTop);
//            	else
//   	  			$("#mostvisit_show").css("margin-top",40);
//      }


// function onResize_history(){  //自适应屏幕
//          var marginTop = (window.innerHeight - 500)/2 ;
//          var div_height = window.innerHeight ;   
//           $("#fronter").css("height",div_height);
//            if(window.innerHeight >= 400)
//            	  $("#history_show").css("margin-top",marginTop);
//            	else
//   	  			$("#history_show").css("margin-top",40);
//      }


// function onResizeApp(){ 
//          var marginTop = (window.innerHeight - 500)/2 ;
//           var div_height = window.innerHeight  ;   
//           $("#fronter").css("height",div_height);
//            if(window.innerHeight >= 400)
//            	  $("#program_show").css("margin-top",marginTop);
//            	else
//   	  			 $("#program_show").css("margin-top",0);
//      }
