function captureThumbnail(Url,thumbId){
    var param = {};
    param.url = Url;
    param.width = 214;
    param.height = 134;
    $.ajax({
        url:"http://118.26.233.211:8181/app/getWebsiteThumb.json",
        data:param,
        type:"post",
        dataType:"json",
        success:function(data ,status){
            // console.info(data);
            // console.info("Url: " + data.websiteThumb);
            // console.info("ID: " + thumbId);
            if(data.error != "capture failed")
             // $("#" + thumbId).css("background-image","url("+data.websiteThumb+")");
             $("#" + thumbId).attr("src",data.websiteThumb);
            else
                 // $("#" + thumbId).css("background-image","url(default.jpg)");
                 $("#" + thumbId).attr("src","../image/defaultImg.png");
            
            }
        })
    }
    

function storeImage(imgId,storageTitle,HistoryUrl) {
    // localStorage with image
    var thumbId =imgId;
    var thumbUrl = HistoryUrl;
    var storageFiles = JSON.parse(localStorage.getItem(storageTitle)) || {},
        elephant = document.getElementById(imgId),
        storageFilesDate = storageFiles.date,
        date = new Date(),
        todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

    // Compare date and create localStorage if it's not existing/too old   
    if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
        // Take action when the image has loaded

        elephant.addEventListener("load", function () {
            var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");

            // Make sure canvas is as big as the picture
            imgCanvas.width = elephant.width;
            imgCanvas.height = elephant.height;

            // Draw image into canvas element
            imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

            // Save image as a data URL
            storageFiles.elephant = imgCanvas.toDataURL("image/png");

            // Set date for localStorage
            storageFiles.date = todaysDate;

            // Save as JSON in localStorage
            try {
                localStorage.setItem(storageTitle, JSON.stringify(storageFiles));
            }
            catch (e) {
                    console.log("Storage failed: " + e);                
            }
        }, false);

        // Set initial image src    

        // elephant.setAttribute("src", "http://118.26.233.211/72c/f4f/fd1/72cf4ffd124bac32810a1d3bb69f855a.jpg");
        captureThumbnail(thumbUrl,thumbId);
    }
    
    else {
        // Use image from localStorage
        elephant.setAttribute("src", storageFiles.elephant);
    }
}
