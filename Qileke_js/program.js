//isApp && enabled
function appstart(){
	chrome.management.getAll(function(info) {
    var appCount = 0;
    for (var i = 0; i < info.length; i++) {
      if (info[i].isApp && info[i].enabled) {
        appCount++;
      }
    }
    completeList = info.sort(compareByName);
    rebuildAppList();
    context_init_program_qileke();
   });	
}


function getIconURL(app) {
  if (!app.icons || app.icons.length == 0) {
    return chrome.extension.getURL('icon.png');
  }
  var largest = {size:0};
  for (var i = 0; i < app.icons.length; i++) {
    var icon = app.icons[i];
    if (icon.size > largest.size) {
      largest = icon;
    }
  }
  return largest.url;
}

function launchApp(id) {
  chrome.management.launchApp(id); 
  window.close(); 
}

var completeList = [];   
var appList = [];       
var booList = [];  
function rebuildAppList() {
  appList = [];
  // add Chrome Web store first
  var appWebStore = {};
  appWebStore.name = "Web store";
  appWebStore.url = "chrome://extension-icon/ahfgeienlihckogmohjhadlkjgocpleb/128/1" ; 
  appList.push(appWebStore);
  for (var i = 0; i < completeList.length; i++){
    var item = completeList[i];
    if (!item.isApp || !item.enabled) {
     continue;
    }
    appList.push(item);
  }
}

function compare(a, b) {
  return (a > b) ? 1 : (a == b ? 0 : -1);
}
function compareByName(app1, app2) {
  return compare(app1.name.toLowerCase(), app2.name.toLowerCase());
}

function addApp(appsDiv, app,k) {
  var div = document.createElement('div');
  div.className = 'app';
  div.title = app.name;
  if(k == 0)
    div.onclick = function(){
      // window.location = "https://chrome.google.com/webstore";
       window.open("https://chrome.google.com/webstore", "_blank");
    }
    else
    div.onclick = function() {
  launchApp(app.id);
  };

  var img = document.createElement('img'); 
  img.className = "appImg"
  if (k == 0)
    img.src = app.url;
  else
    img.src = getIconURL(app);  // app image
  div.appendChild(img);  

  var title = document.createElement('div');
  title.className = 'app_title';
  title.innerText = app.name; 
  div.appendChild(title);
  appsDiv.appendChild(div);

}

function context_init_program_qileke(){
	var n=appList.length;
	var a=Math.ceil(n/2)
	var width_j=a*155+50;
	var div_context_qileke;
	var div_title_qileke;
	var div_blank;
	var Element_qileke = document.getElementById("program_show");
	if(Element_qileke != null){
		$("#program_show").remove();
		}
	div_context_qileke = document.createElement("div");
	div_context_qileke.id = "program_show";
  div_context_qileke.style.marginLeft = '50px';
	div_context_qileke.style.width = width_j+"px";
	document.getElementById("page_list_program").appendChild(div_context_qileke);

	var k=0;
	for(var i=1;i<=a;i++){
		div_title_qileke=document.createElement("div");
		div_title_qileke.id="block_"+i;
		div_title_qileke.className = "module_app";
        //自适应
		window.onresize = onResizeApp;
		onResizeApp();
		window.onresize = autoAdapt;
		autoAdapt();  

		document.getElementById("program_show").appendChild(div_title_qileke);
		var appsDiv = document.getElementById("block_"+i);//用这个获取id
		for (var j = k; j < appList.length; j++) {
    		var item = appList[j];
    		addApp(appsDiv, item, k); 
			k++;
			if(k>1&&k%2==0)
				break; 
 		}	
	}
}