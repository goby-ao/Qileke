function getDomain(url) {
  var protocolIndex = url.indexOf("://");
  var tempUrl = url;
  if(-1 != protocolIndex && 10 >= protocolIndex){
    tempUrl = url.substring(protocolIndex+3);
  }
  if(-1 != tempUrl.indexOf("/")){
    tempUrl = tempUrl.substring(0 , tempUrl.indexOf("/"));
  }
  var urlParts = tempUrl.split(".");
  if(0 == urlParts.length){
    return null;
  }
  if(1 == urlParts.length){
    return urlParts[0];
  }
  if(2 == urlParts.length){
    return tempUrl;
  }
  if(2 == urlParts[urlParts.length-1].length){
    return urlParts[urlParts.length-3]+"."+urlParts[urlParts.length-2]+"."+urlParts[urlParts.length-1];
  }
  if(3 == urlParts.length && -1 == urlParts.indexOf("www")){
    return tempUrl;}
  else{
    return urlParts[urlParts.length-2]+"."+urlParts[urlParts.length-1]
  }

}

function getUrl(url){
  var SITE_URL = "http://www.qileke.com";
  var Url = "http://www." + getDomain(url);
  var fileHash = hex_md5(Url) + '.png';
  var fileHash1 = hex_md5(Url);
  var hashPath = fileHash1.substr(0, 2) + '/' + fileHash1.substr(2, 2) + '/';
  var thumbDir = SITE_URL + "/data/sitelogo/" +hashPath;
    var thumbFile = thumbDir + fileHash;
      return SITE_URL + '/data/sitelogo/' + hashPath + fileHash;
    } 
     
function getUrl2(url){
  var SITE_URL = "http://www.qileke.com";
  var Url = "http://" + getDomain(url); 
  var fileHash = hex_md5(Url) + '.png';
  var fileHash1 = hex_md5(Url);
  var hashPath = fileHash1.substr(0, 2) + '/' + fileHash1.substr(2, 2) + '/';
  var thumbDir = SITE_URL + "/data/sitelogo/" +hashPath;
    var thumbFile = thumbDir + fileHash;
      return SITE_URL + '/data/sitelogo/' + hashPath + fileHash;
    }  