	var siteDomain="http://www.qileke.com/";

	var email_check = false;
	var password_check = false;
	//验证email格式的正确性
	function isEmailChecked()
	{
		var email = $.trim($("#email").val());
	    var reg=/^[_A-Za-z0-9.]{3,}@\w+(\.\w+)+$/;   
        if(!reg.test(email)){  
			alert("请重新输入用户名");  
        }else{   
			email_check = true;

        }   
	}
	//验证密码的长度以及一些规定（出于安全方面的考虑）
	function isPasswordChecked()
	{
		var password = $.trim($("#password").val());
		if(password.length>=6&&password.length<16)
		{
			password_check = true;
		}
		else
		{
			alert("密码输入长度在6和16之间");
		}
	}
	//数据交互事件的监听，及状态的切换
	function verifyUser()
	{
		$(".sy-loading").removeClass("hidden-loading");
		console.log("get email_check"+email_check+","+"get password_check"+password_check);
		if((email_check==true)&&(password_check==true))
		{
			console.log("开始向后台请求数据");
			$.post("http://test.qilek.com/index.php?app=home&mod=Public&act=doAjaxLogin",
			{email:$.trim($("#email").val()),password:$.trim($("#password").val()),from_mobile:"newbie"},
			function(data){
				console.log(data)
				saveInfo($.trim($("#email").val()),$.trim($("#password").val()),data.cookie,data.memberId);
				if(data.status==1)
				{
					setTimeout("goTo('main.html')",1000);
				}
				else if(data.status==0)
				{
					 $("#email").val("");
					 $("#password").val("");
					 alert("用户名和密码输入不正确,请重新输入");
				}
			},"json")
			.success(function(){
				console.log("get login message ok")
			})
			.error(function(){
				 alert("获取数据失败")
			})
			.complete(function(){
				printInfo();
			})
		}
		else
		{
			alert("请输入正确的密码和邮箱");
		}
	}
	//增加数据存储，暂时没考虑安全的问题

	function saveInfo(email,password,cookie,userId)
	{
			window.localStorage.setItem("email",email);
			window.localStorage.setItem("password",password);
			window.localStorage.setItem("cookie",cookie);
			window.localStorage.setItem("userId",userId);
	}

	//页面之间的跳转
	function goTo(url)
	{
		window.location.href=url;
	}

$("#submit").live("click",userLogin);
$("#email").live("blur",isEmailChecked);
$("#password").live("blur",isPasswordChecked);


