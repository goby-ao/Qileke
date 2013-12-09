//init
function initDailer() {  
  AddBookmarks();
  qileke.webdb.open();
  qileke.webdb.createTable();
  qileke.webdb.getAllBookmarkItems(loadBookmarksItems); 
  
}

$(function() {
  console.log("window.innerWidth:"+window.innerWidth)
  $("#demo").bind("click",function(){
      $("#selection").css("display","block");
      $("#ss").css("display","block");       //add link
  });
  
  $( "#tabs" ).tabs({
    collapsible: true
  });

  $("#back").bind("click",function(){
     $("#selection").hide();
     $("#ss").hide();
  });

  $("#selection").bind("click",function(){
     $("#selection").hide();
     $("#ss").hide();
  });

// get element id of class automark
  $(".automark").live("click",function selectOperation(e){
      e = e || window.event;
      var elementtitle = (e.target || e.srcElement).title;
      var elementid = (e.target || e.srcElement).id;
      $("#show").html("\""+elementtitle+"-"+elementid+"\""+"已经添加到了您的收藏中");
       qileke.webdb.addBookmarks(elementid,elementtitle); 
    });
});

//创建数据库
var qileke = {};
qileke.webdb = {};
qileke.webdb.db = null;


qileke.webdb.open = function() {
  var qilekedbSize = 5 * 1024 * 1024; // 5MB
  qileke.webdb.db = openDatabase("qileke", "1.0", "qileke database", qilekedbSize);
}

qileke.webdb.createTable = function() {
  var db = qileke.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(ID INTEGER PRIMARY KEY ASC, url TEXT, title TEXT,visits INTEGER , position INTEGER , userid INTEGER, added_on DATETIME)", []); 
  });

 db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS MostVisit(ID INTEGER PRIMARY KEY ASC, url TEXT, title TEXT,visits INTEGER , position INTEGER , userid INTEGER, added_on DATETIME)", []); 
  });

  // db.transaction(function(tx) {
  //   tx.executeSql("CREATE TABLE IF NOT EXISTS ImageQileke(url INTEGER PRIMARY KEY ASC, usecount INTEGER DEFAULT 0, imageqileke TEXT)", []); 
  // });

  // db.transaction(function(tx) {
  //   tx.executeSql("CREATE TABLE IF NOT EXISTS QilekeUser(userid INTEGER PRIMARY KEY ASC, usecount INTEGER DEFAULT 0, tools INTEGER )", []); 
  // });
}

qileke.webdb.addBookmarks = function(urlText,titleText) {
  var db = qileke.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    var visits=0;
    var position=0;
    var userid=0;
    tx.executeSql("INSERT INTO bookmarks(url, title, visits, position, userid, added_on) VALUES (?,?,?,?,?,?)",
        [urlText, titleText, visits, position, userid, addedOn],
        qileke.webdb.onSuccess,
        qileke.webdb.onError);
   });
    
 //  db.transaction(function(tx){
 //    var usecount=0;
 //    var thumbnail
 //    tx.executeSql("INSERT INTO thumbnails(url, usecount, thumbnail) VALUES (?,?,?)",
 //      [urlText, usecount, thumbnail],
 //      qileke.webdb.onSuccess,
 //      qileke.webdb.onError);
 // });
} 

qileke.webdb.addMostVisit = function(urlText,titleText,counts) {
  var db = qileke.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    // var visits=0;
    var position=0;
    var userid=0;
    tx.executeSql("INSERT INTO MostVisit(url, title, visits, position, userid, added_on) VALUES (?,?,?,?,?,?)",
        [urlText, titleText, counts, position, userid, addedOn],
        null,qileke.webdb.onError);
   });
}

qileke.webdb.editBookmarks = function(urlText,titleText,id) {
  var db = qileke.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("UPDATE bookmarks SET url=?,title=? WHERE ID=?",//where 之前没有逗号
      [urlText, titleText, id],
        qileke.webdb.onSuccess,
        qileke.webdb.onError);
    });
}

qileke.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

qileke.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  qileke.webdb.getAllBookmarkItems(loadBookmarksItems);
}

qileke.webdb.getAllBookmarkItems = function(renderFunc) {
  var db = qileke.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM bookmarks", [], renderFunc,
        qileke.webdb.onError);
  });
}

qileke.webdb.deleteBookmarks = function(id) {
  var db = qileke.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM bookmarks WHERE ID=?", [id],
        qileke.webdb.onSuccess,
        qileke.webdb.onError);
    });
}


var linkn=0;
var dailerlength=0;
var daileramount=0;

function loadBookmarksItems(tx, rs) {
  linkn=0;
  dailerlength=rs.rows.length;
  daileramount=Math.floor(window.innerHeight/165)-2;
  if(daileramount<2) {daileramount=2;}
  // console.log(window.innerHeight)
  // console.log("daileramount:"+daileramount)
  var L=Math.ceil((dailerlength+1)/daileramount);
  // var L=Math.ceil((dailerlength+1)/2);
 // console.log("L:"+L)
  var LINK_show_width=L*250+60;
  $('#LINK_show').remove();
  var LINK_show;
  LINK_show=document.createElement('div');
  LINK_show.id='LINK_show';
  LINK_show.style.width=LINK_show_width+'px';
  LINK_show.style.marginLeft = '50px';
  document.getElementById("page_list_dailer").appendChild(LINK_show);
  additemlink(0,L,rs);

  //add addbutton
  // var addempty_qileke;
  // addempty_qileke=document.createElement("div");
  // addempty_qileke.id="addlink";
  // addempty_qileke.className="AddLink";
  // addempty_qileke.innerHTML='<img src="image/add.png">';
  // document.getElementById("LINK_show").appendChild(addempty_qileke);

}


     
function additemlink(init,all,rs){
    for (var i = init; i < all; i++) {
    var Module_LINK;
    Module_LINK=document.createElement("div");
    Module_LINK.id="module_link"+i;
    Module_LINK.className="Module_LINK"; 
    Module_LINK.style.height=165*daileramount+'px';
    window.onresize = onResize_addlink;  
    onResize_addlink();  
    document.getElementById("LINK_show").appendChild(Module_LINK);
    //var Div = document.getElementById("mark_"+i);
      for (j=linkn; j < dailerlength+1; j++) {
        if (linkn==dailerlength) {
          var addempty_qileke;
          addempty_qileke=document.createElement("div");
          addempty_qileke.id="addlink";
          addempty_qileke.title="添加新网址";
          addempty_qileke.className="AddLink";
          addempty_qileke.innerHTML='<img src="image/add.png"  style="margin-top: 55px;">';
          $("#module_link"+i).append(addempty_qileke);
          // document.getElementById("LINK_show").appendChild(addempty_qileke);

        }
        else{
          var item=rs.rows.item(j);
          renderBookmarks(i,item);
          linkn++;
          if(linkn>0&&linkn%daileramount==0)
          break;     
        }
          
      }
      //add addbutton
      
  };
}


//show the dailers.if logo is not gotten,then show up the title. 
function renderBookmarks(i,row) {
  var Addlink_qileke;
  Addlink_qileke=document.createElement("a");
  Addlink_qileke.id=row.ID;
  Addlink_qileke.setAttribute("target","_blank");
  // Addlink_qileke.setAttribute("href","http:\/\/"+row.url);
  Addlink_qileke.setAttribute("href",row.url);
  Addlink_qileke.innerHTML= '<div class="AddLink" title="'+row.title+'"><div class="LinkImage"><div class="ImageLimit" id="imagediv'+row.ID+'"></div><div class="LinkTitle_qileke"><div class="thumbLeft"><p id="p'+row.ID+'" class="Titleshow">'+row.title+'</p></div></div></div><div class="change_Link"><a id='+"editID"+row.ID+' class="editlink" href="#"  title="修改"><img src="image/edit.png"></a> <a href="#" class="deletelink" id='+"deleteID"+row.ID+' title="删除" ><img src="image/delete.png"></a></div></div>';
  $("#module_link"+i).append(Addlink_qileke);
  
  var imageurl=getUrl2(row.url);
  var img = document.createElement("img");
  img.className = "ImageCss";  
  img.id="image"+row.ID;
  img.src = imageurl; 
  img.onerror =  function(){ 
    var imageurl2=getUrl(row.url);   
    img.src = imageurl2;
      img.onerror = function(){
        img.src = "image/error1.png";   
        var BookMark_P = document.createElement('p');   //logo 不存在时 显示title
        BookMark_P.innerHTML = row.title;//getDomain(row.url)
        $("#p"+row.ID).text(getDomain(row.url));
        BookMark_P.className = "dailer_P";
        $("#imagediv"+row.ID).append(BookMark_P);
      }
  }
  $("#imagediv"+row.ID).append(img);
  DBookmarks(row);
}


function DBookmarks(row){
  //delete the dailer
  var Dedit = $('<div class="dailertitle" style="width:250px"></div>');
  $("#deleteID"+row.ID).bind('click',function() {
    Dedit.text(row.title);
    $('#deletedialog').empty().append(Dedit).dialog({
       autoOpen: false,
       title: '删除',
       resizable: false,
       height: 200,
       modal: true,
       width: 300,
       
       overlay: {
       backgroundColor: '#000',
       opacity: 0.5
       },
       buttons: {
         '确认删除!': function() {
            qileke.webdb.deleteBookmarks(row.ID);
            $(this).dialog('destroy');
          },
          "取消": function() {
            $(this).dialog('destroy');
          }
       }
     }).dialog('open');
   });

  //edit bookmark
  var Eedit = $('<table><tr><td>URL</td><td>' +
      '<input type="text" style="width: 250px;" id="editurl" value="'+row.url+'"></td></tr><tr><td>Name</td><td><input id="edittitle" type="text" style="width: 250px;"  value="'+row.title+'">' +
      '</td></tr></table>') ;
  $("#editID"+row.ID).bind('click',function() {
    $('#editdialog').empty().append(Eedit).dialog({autoOpen: false,
      closeOnEscape: true, title: '编辑', modal: true, width: 350,
      buttons: {
      '保存' : function() {
       // console.log(row.ID)
        qileke.webdb.editBookmarks($('#editurl').val(), $('#edittitle').val(), row.ID);
         $(this).dialog('destroy');
       },
      '取消': function() {
         $(this).dialog('destroy');
      }
    }}).dialog('open');
  });
}


//add bookmark by manual operation
function AddBookmarks(){
  $('#addlink').live('click',function() {
        qileke.webdb.addBookmarks($('#addurl').val(),$('#addtitle').val());      
         $('#addurl').val("http://");
         $('#addtitle').val("请输入标题");
         $(this).dialog('destroy');
  });
}

//add bookmark by addbutton
function AddBookmarks(){
  var edit = $('<table><tr><td>网址</td><td>' +
      '<input type="text" style="width: 250px;" id="addurl" value="http://"></td></tr><tr><td>标题</td><td><input id="addtitle" type="text" style="width: 250px;">' +
      '</td></tr></table>') ;
  $('#addlink').live('click',function() {
    $('#adddialog').empty().append(edit).dialog({autoOpen: false,
      closeOnEscape: true, title: '添加新网址', modal: true, width: 350,
      buttons: {
      '确认' : function() {
        qileke.webdb.addBookmarks($('#addurl').val(),$('#addtitle').val());
         $('#addurl').val("http://");
         $('#addtitle').val("请输入标题");
         $(this).dialog('destroy');
       },
      '取消': function() {
         $(this).dialog('destroy');
      }
    }}).dialog('open');
  });
}



