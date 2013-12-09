function bookmarkstart(){
  $('#bookmark_back').remove();
  var div_buttom=document.createElement('div');
  div_buttom.id="bookmark_back";
  div_buttom.className="button_back";
  document.getElementById("bar").appendChild(div_buttom);
  //get root(1) bookmarks
  GetChildren('1'); 

  //search
  $('#bookmarks-search').keyup(function(e){
    if (e.keyCode == 27) { 
      GetChildren('0');
      $(this).val('');
      return false 
    }
    query = $(this).val();
    if ( query.length < 2 ) 
      return false;

    //$('#bookmarks div').html('');
    // $('#bookmark_show').remove();
    $("#back").remove();
    back_set(0);
        
    chrome.bookmarks.search( query, function(result) {
      setlength(result);
    });
  }) 
}

var amount=0;
var FolderLisrt=[];
var LinkList=[];
var CompareList=[];
var kk=0;
var yy=0;
var Folderlength=0;
var Linklength=0;
var bl=0;
var bookmarksamount=0;
var Folderlength_a=0;

//select bookmarks
function RebuildBookMarkList() {
  FolderLisrt=[];
  LinkList=[];
  Folderlength=0;
  Linklength=0;
  for (var i = 0; i < amount; i++){
    var item = CompareList[i];
    if(item.url && item.url.indexOf("javascript:") == -1){
      LinkList.push(item);
    }
    if(!item.url)
    {
      FolderLisrt.push(item);
    }
  }
}


function compareBookMark(a, b) {
  return (a < b) ? 1 : (a == b ? 0 : -1);
}

//按title排序(需要把a<b改成a>b)
// function CompareByTitle(markbook1, markbook2) {
//   return compare(markbook1.title.toLowerCase(), markbook2.title.toLowerCase());
// }

//按创建时间排序
function CompareBydateAdded(markbook1, markbook2) {
  return compareBookMark(markbook1.dateAdded, markbook2.dateAdded);
}

//按修改时间排序
function CompareBydateGroupModified(markbook1, markbook2) {
  return compareBookMark(markbook1.dateGroupModified, markbook2.dateGroupModified);
}


//get children by rootid and set the width of page_list_bookmark
function GetChildren(Folder) {
  if (Folder>=0) 
  {
    chrome.bookmarks.get(Folder, function(result) 
    {
      $("#back").remove();
      if (result[0].parentId > -1) {
        back_set(result[0].parentId);
      }
    });
  
  // $('#bookmark_show').remove();
  chrome.bookmarks.getChildren(Folder, function(result) {
    setlength(result);
    })
  }
}

function setlength(result){
  CompareList=[];
    amount=result.length;
    lunx=0;
    luny=10;
    kk=0;
    yy=0;
    for (var i = 0; i < amount; i++) {
    if (result[i].title == '')
      result[i].title = result[i].url;
    }
   // CompareList = result.sort(CompareBydateAdded);
    CompareList=result;
    RebuildBookMarkList();
    Linklength=LinkList.length;
    Folderlength=FolderLisrt.length;
    $('#bookmark_show').remove();

    // var screenchange = screenheight-300;
    bookmarksamount=Math.floor(window.innerHeight/140-1.5);
    if(bookmarksamount<2){
      bookmarksamount=2;
    }

    var Linklength_a=Math.ceil(Linklength/bookmarksamount);
    Folderlength_a=Math.ceil(Folderlength/bookmarksamount);
    var b=Linklength_a+Folderlength_a;
    // var b=Math.ceil(Linklength/bookmarksamount)+Math.ceil(Folderlength/bookmarksamount);
    bl=b;

    var margin_amount=Math.ceil(Linklength_a/4)+Math.ceil(Folderlength_a/4);
    var bookmart_list_width=b*242+50+margin_amount*60;

    var bookmarkNode_list_div;
    var bookmarkblock;
    bookmarkNode_list_div=document.createElement('div');
    bookmarkNode_list_div.id='bookmark_show';
    bookmarkNode_list_div.style.marginTop = '100px';
    bookmarkNode_list_div.style.marginLeft = '50px';
    bookmarkNode_list_div.style.width=bookmart_list_width+'px';
    document.getElementById("page_list_bookmark").appendChild(bookmarkNode_list_div);
    if(b<=10)
      additem(0,b);
    else{
      additem(0,10);
    }  
}

//add blockmark
function additem(init,all){

  for(var i=init;i<all;i++){   
      var tag=0;
      bookmarkblock=document.createElement("div");
      bookmarkblock.id="mark_"+i;
      bookmarkblock.className="blockmark"; 
      bookmarkblock.style.height=141*bookmarksamount+'px';


      // window.onresize=onResize_bookmark;
      // onResize_bookmark();
      window.onresize = autoAdapt;
      autoAdapt();

      document.getElementById("bookmark_show").appendChild(bookmarkblock);
      var Div = document.getElementById("mark_"+i);
      if (kk!=Folderlength) {
        for (var j = kk; j < Folderlength; j++) {
          var item=FolderLisrt[j];
          ShowChildren(Div,item);
          kk++;
          if(i>0&&(i+1)%4==0){
            Div.style.marginRight = '60px';
          }
          if (kk==Folderlength) {
            tag=1;
            Div.style.marginRight = '60px';
            break;
          };
          if(kk>1&&kk%bookmarksamount==0)
            break;   
        }  
      }
      if(tag) continue;
      if(kk==Folderlength){
        for (var j = yy; j < Linklength; j++) {
          var item=LinkList[j];
          ShowChildren(Div,item);
          yy++;
          if(i>Folderlength_a&&(i-Folderlength_a+1)%4==0){
            Div.style.marginRight = '60px';
          }
          if(yy>1&&yy%bookmarksamount==0)
          break;   
        };
      }
    }
}

function ShowChildren(markdiv,items) {
  var mdiv = document.createElement('div');
  var a = document.createElement('a');//pss
  var namep=document.createElement('p');
  if (items.url) {
    AddBookmark(markdiv,items);
  } 
  else {
    // Folder
    mdiv.className = 'Bookmark_Folder';
    mdiv.title = items.title;
    mdiv.setAttribute('mark',items.id);
  
    mdiv.innerHTML=('<span class="change_document"><a id='+"edit"+items.id+' class="editlink" href="#"  title="修改"><img src="image/edit.png"></a> <a  ' +
      'href="#" class="deletelink" id='+"delete"+items.id+' title="删除" ><img src="image/delete.png"></a></span>');
    
    var imgdiv=document.createElement('div');
    imgdiv.className='Bookmark_Image';
    imgdiv.addEventListener('click',function(){
      GetChildren(items.id);
    });

    namep.className= 'Folder_name';
    namep.innerHTML = items.title;
    imgdiv.appendChild(namep);
    mdiv.appendChild(imgdiv); 

    var titlediv=document.createElement('div');
    titlediv.className='Bookmark_Title';
    titlediv.innerHTML=items.title;
    mdiv.appendChild(titlediv);
    markdiv.appendChild(mdiv);
    
    ChangeBookmark(items);
  }
  
}

//set back button
function back_set(ParentId){
  var div = document.createElement('div');
  var img = document.createElement('img');
  div.setAttribute('id','back');
  //div.setAttribute('class','bookmark_back');
  div.setAttribute('parent',ParentId);
  div.setAttribute('mark',ParentId);
  div.style.cursor="pointer";
  img.src = "image/back.png";  
  div.appendChild(img);
  $('#bookmark_back').append(div);
}

function AddBookmark(historyDiv,HistoryItemSort){
    var title = document.createElement('div');  // 
    var Bookmark_picture = document.createElement('div');// logo 
    title.className = "module_BookMark";    //   
    title.title=HistoryItemSort.title;
    title.id=HistoryItemSort.id;
    Bookmark_picture.className = "Bookmark_picture";  //logo的div
    Bookmark_picture.innerHTML=('<span class="change"><a id='+"transfer"+HistoryItemSort.id+' class="transferlink" href="#"  title="添加到拨号盘"><img src="image/view-bohaot.png"></a><a id='+"edit"+HistoryItemSort.id+' class="editlink" href="#"  title="修改"><img src="image/edit.png"></a> <a  ' +
        'href="#" class="deletelink" id='+"delete"+HistoryItemSort.id+' title="删除" ><img src="image/delete.png"></a></span>');

    var link = document.createElement('a');         //   link 
    link.href = HistoryItemSort.url;
    link.target = "_blank";      
    link.className= "link";
      
    var history_url2 = getUrl2(HistoryItemSort.url);// 获取logo
    var img = document.createElement("img");
    img.className = "Bookmark_img";  
     img.src = history_url2;
     img.onerror =  function(){ 
        var history_url = getUrl(HistoryItemSort.url); 
        img.src = history_url;
        img.onerror = function(){
            img.src = "image/error1.png";             //logo 不存在时 显示title
            var BookMark_P = document.createElement('p');   
            BookMark_P.innerHTML = HistoryItemSort.title;
            BookMark_P.className = "BookMark_P";
            Bookmark_picture.appendChild(BookMark_P);
         }
      };
    Bookmark_picture.appendChild(img);
    title.appendChild(Bookmark_picture);
    link.appendChild(title);
    historyDiv.appendChild(link);
    ChangeBookmark(HistoryItemSort);
}

//edit,delete and add to the dailer
function ChangeBookmark(BookMarkItem){
  var edith = $('<div style="width:250px"></div>');
  $('#'+"delete"+BookMarkItem.id).bind('click',function() {
    edith.text(BookMarkItem.title);
    $('#deletedialog').empty().append(edith).dialog({
       autoOpen: false,
       title: '删除书签或文件夹',
       resizable: false,
       height: 200,
       modal: true,
       width: 300,
       // show: 'slide', 
       overlay: {
       backgroundColor: '#000',
       opacity: 0.5
       },
       buttons: {
         '确认删除!': function() {
            chrome.bookmarks.removeTree(String(BookMarkItem.id));
            //chrome.bookmarks.remove(String(BookMarkItem.id));
            GetChildren(BookMarkItem.parentId);
            // span.parent().remove();
            $(this).dialog('destroy');
          },
          "取消": function() {
            $(this).dialog('destroy');
          }
       }
     }).dialog('open');
   });


    var edit = $('<input style="width:250px">');
    $('#'+'edit'+BookMarkItem.id).bind('click',function() {
    edit.val(BookMarkItem.title);
    $('#editdialog').empty().append(edit).dialog({
    autoOpen: false,
     closeOnEscape: true, 
     title: '修改标题', 
     modal: true,
     width:300,
     height:200,
     // show: 'slide', 
     buttons: {
        '保存': function() {
           chrome.bookmarks.update(String(BookMarkItem.id), {
             title: edit.val()
           });
           //BookmarkDiv.text(edit.val());
           GetChildren(BookMarkItem.parentId);
           $(this).dialog('destroy');
        },
       '取消': function() {
           $(this).dialog('destroy');
       }
   }}).dialog('open');
  });

    var transfer = $('<h style="width:250px"></h>');
    $('#'+'transfer'+BookMarkItem.id).live('click',function() {
    transfer.html(BookMarkItem.title);
    $('#transferdialog').empty().append(transfer).dialog({
    autoOpen: false,
     closeOnEscape: true, 
     title: '添加到拨号盘', 
     modal: true,
     width:300,
     height:200,
     // show: 'slide', 
     buttons: {
        '添加': function() {
           qileke.webdb.addBookmarks(BookMarkItem.url,BookMarkItem.title);
           $(this).dialog('destroy');
        },
       '取消': function() {
           $(this).dialog('destroy');
       }
   }}).dialog('open');
  });
}


