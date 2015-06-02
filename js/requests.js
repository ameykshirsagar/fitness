var url = "http://localhost:3000/"; 
/*
Actions
1. login
2. 
*/
var org;
var appdb = new Lawnchair({
        adapter: "dom",
        name: "hact"
    },function (hactdb) {
    	console.log("DB is initiated.")
    });
function populateUserDet(data){
	$('.username').html(data.username)
	$('.full-name').html(data.first_name+" "+data.last_name)
}
function sign_inReq (u,p,callback) {
	$.post(url+"login",{username:u,password:p},function (data) {
		if (data.response==4) {
			appdb.exists('user-details',function (resp) {
				appdb.save({key:'user-types',value:['Main Administrator','Site Administrator','Organisation Administrator','Data Collector']});
				appdb.save({key:'permissions-stack',value:[{"perm_name": "take_interview", "id": "open_interview"}, {"perm_name": "add_location", "id": "add_loc"}, {"perm_name": "flag_upload", "id": "flag_up"}, {"perm_name": "flag_qbank", "id": "flag_qb"}, {"perm_name": "flag_question", "id": "flag_ques"}, {"perm_name": "add_user_type", "id": "add_ut"}, {"perm_name": "add_user", "id": "add_user_form"}, {"perm_name": "flag_user_type", "id": "flag_ut"} ]});
				if (!resp) {
					$.ui.showMask('Fetching your details..');
					$.getJSON(url+"getuserdetails/"+u,function (res) {
						var dt = res.data[0];
						appdb.save({
							key:'user-details',
							value:dt
						});
						$.getJSON(url+'/mobile/getfeatures',{org_id:dt.org_id,uname:u},function (data) {
							console.log("req 1")
							var arr = data.data[0].mobileAccess.split(",");
							renderUI(arr);
							renderNav(arr);
						});
						populateUserDet(dt);
						populateProfile(dt.user_type);
					});

				}else{
					appdb.get('user-details',function (data) {
						$.ui.showMask("Rendering the dashboard..");
						if (data.value.username==u)  {
							populateUserDet(data.value);
							populateProfile(data.value.user_type);
						}else{
							$.getJSON(url+"getuserdetails/"+u,function (res) {
								var dt = res.data[0];
								appdb.save({
									key:'user-details',
									value:dt
								});
								populateUserDet(dt);
								populateProfile(dt.user_type);
							});
						}
						$.getJSON(url+'/mobile/getfeatures',{org_id:data.value.org_id,uname:u},function (data) {
							console.log("req 2")
							var arr = data.data[0].mobileAccess.split(",");
							renderUI(arr);
							renderNav(arr);
						});						
					});
				}
			});
			appdb.exists('upload-details',function (res) {
				$.ui.showMask("Adding latest data..");
				if (!res) {
					$('.uploads').html('0');
					$('.flagged_v').html('0');
				};
			});	
			$.ui.hideMask();
			$.ui.loadContent('dash_h',false,false,'fade');
		}
		if (data.response==3) {
			$("#afui").popup('You must be banned. Contact your organisation admin to remove the ban');
		};
		if (data.response==2) {
			$("#afui").popup('Oww snap!! Your account is not activated yet. Contact your organisation admin to reove the ban');
		};
		if (data.response==1) {
			$("#afui").popup('Incorrect password');
		};
		if (data.response==0) {
			$("#afui").popup('Incorrect username');
		};
	});
}
function populateProfile (data) {
	appdb.get('user-types',function (res) {
		var val = res.value;
		$('.user_type').html(val[data])
		console.log(val[data]);
	});
}
function getQbankList () {
	appdb.get('user-details',function (res) {
		$.getJSON(url+'question/getqbankbyorg',{org_id:res.value.org_id},function (resp) {
			$("#qbank_list_wrap").html('<ul id="qbank_list_lwrap" class="qb-list"></ul>')
			for (var i = 0; i < resp.data.length; i++) {
				$("#qbank_list_lwrap").append('<li class="qbank"><a href="#" onclick=show_qbank("'+resp.data[i]._id+'",'+res.value.org_id+')>'+resp.data[i].qb_name+'</a></li>') 
			};
		})
	});
		
}
function show_qbank(id,org) {
	$.getJSON(url+'/question/getqbank',{org_id:org,id:id},function (data) {
		var resp = data.response[0];
		$.ui.hideModal('interview_ques');
		$("#ques_list_wrap").html('<ul id="ques_list_lwrap" class="ques-list"></ul>')
			for (var i = 0; i < resp.q_bank.length; i++) {
				$.getJSON(url+'/getquesbyquesid/'+resp.q_bank[i].ques_id,function (resp) {
					console.log(resp)
					if (resp.data[0].type==2) {
						$("#ques_list_lwrap").append('<li class="qbank"><a href="#">'+resp.data[0].q_string+'<div class="grid" style="padding-top: 5px;padding-bottom: 0px;;"><div class="col2"><a href="#" class="bin-button">Yes</a></div><div class="col2"><a href="#" class="bin-button" style="float:right">No</a></div></a></li>');
					}else{
						$("#ques_list_lwrap").append('<li class="qbank"><a href="#">'+resp.data[0].q_string+'</a></li>');
					}					
				});
				if (i==resp.q_bank.length-1) {
					setTimeout(function () {
						$.ui.showModal('qbank_ques');
					},300)
				};
			};
	})
}

