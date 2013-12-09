
var yao = 1;
function getVersion(){
	 return "1.1.23"
}

$(function(){
        $("#boo").hide();
        $("#his").hide();
        $("#bgTips").hide();
        if (localStorage['Qileke-version'] != getVersion() ) {
        $("#notification").show().animate({ top: "22px" }, "slow");
        // $("#thu").show().animate({ bottom: "98px" }, "slow");

        $("#clo1").bind('click', function () {
            $("#notification").css("display", 'none');
        });
/*        $("#clo2").bind('click', function () {
            $("#thu").css("display", 'none');
            yao = 0;
        });*/
        localStorage['Qileke-version'] = getVersion();
    }
    else {
        $("#notification").css("display", "none");
        // $("#thu").css("display", "none");
    }
})