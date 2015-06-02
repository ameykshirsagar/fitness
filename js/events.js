var parameters = ['Start weight','General feeling','General appearance','Stretched','Hyrdrated','Eliminated','Bathed','Meditated','Sun – Time','Earth – Time','No processed food','Avoided Wheat','Avoided Dairy','Avoided Sugar','Avoided Overeating','Excercised','Focused on Posture','Cleared / Organized','Positive Mental Attitude','Selfless Service','End of the Day weight']
var days_arr = ['sun','mon','tue','wed','thur','fri','sat'];
var a;
var Events = {
	render_chart:function(){
		$.ui.loadContent('charts_home',false,false,'none')
	},
	populateMyInfo:function () {
		Model.isMyInfo(function(data){
			if (data) {
				Model.getMyInfo(function (resp) {
					$("#myname").val(resp.name);
					$("#dob_ip").val(resp.dob);
					$("#wt_info").val(resp.weight);
					$("#wt_type").val(resp.weight_type);
					$("#gender_ip").val(resp.gender);
					$("#issues_ip").val(resp.issues);
					$("#curr_med_ip").val(resp.curr_med);
					$("#gen_ht_ip").val(resp.gen_health);
					$("#morn_ip").val(resp.time_morn);
					$("#aftn_ip").val(resp.time_aftn);
					$("#evng_ip").val(resp.time_evng);
					$("#my_info_add").text('Update');
					$.ui.loadContent('my_info_edit')	;
					$.ui.hideMask();
				});
			} else{
				$.ui.loadContent('my_info_edit')	;
				$.ui.hideMask();
			};
		})
	},
	addMyInfo:function () {
		Model.addMyInfo({
			name:$("#myname").val(),
			dob:$("#dob_ip").val(),
			weight:$("#wt_info").val(),
			weight_type:$("#wt_type").val(),
			gender:$("#gender_ip").val(),
			issues:$("#issues_ip").val(),
			curr_med:$("#curr_med_ip").val(),
			gen_health:$("#gen_ht_ip").val(),
			time_morn:$("#morn_ip").val(),
			time_aftn:$("#aftn_ip").val(),
			time_evng:$("#evng_ip").val()
		},function () {
			alert("Data is saved");
			Events.triggerAch('ach_4');
		})
	},
	addTodayData:function () {
		var chkbx = [];
		var radioString="";
		var score=0;
		var startwt = $("#start_wt_ip").val();
		var gen_feel = $("#gfeel").val();
		var gen_app = $("#gappe").val();
		var end_wt = $("#end_wt_ip").val();

		score+=parseInt(gen_feel);
		score+=parseInt(gen_app);
		score+=parseInt((end_wt-startwt)/3);
		console.log("prev data score: "+score)
		for (var i = 4; i < 21; i++) {
			//var el = $(".lb"+i).is(':checked')
			if(document.getElementsByName("lb"+i)[0].checked){
			   radioString=radioString+1;
			   score=parseFloat(score+1);
			}
			else{
			 radioString=radioString+0;
			 score=parseFloat(score-1);
			}
		};
		score+=score+3
		console.log("new data score: "+score)
		var data = {
			startwt:$("#start_wt_ip").val(),
			gen_feel:$("#gfeel").val(),
			gen_app:$("#gappe").val(),
			end_wt:$("#end_wt_ip").val(),
			score:score,
			chkData:radioString,
			added_on:new Date
		};
		Model.getEntries(function (vl) {
			var v = vl;
			v++;
			Model.addEntries(v);
			if (v==7) {
				Events.triggerAch('ach_2');
			};
		});
		function checkWeightLoss() {
			var fw;
			Model.getWtType(function (d) {
				if (d==1) {
					Model.getWtCt(function(w){
						if (parseInt($("#start_wt_ip").val())-parseInt($("#end_wt_ip").val())>0) {
							fw = w + Math.abs(parseInt($("#start_wt_ip").val())-parseInt($("#end_wt_ip").val()))
							console.log("lbs: "+fw)
							if(fw>=22){
								Events.triggerAch('ach_3');
							}
						} 						
					})
						
				} else{
					Model.getWtCt(function(w){
						fw = w + Math.abs(parseInt($("#start_wt_ip").val())-parseInt($("#end_wt_ip").val()))
						console.log("KG: "+fw)
						if(fw>=10){
							Events.triggerAch('ach_3');
						}
					})
				};

			})
		}
		checkWeightLoss();
		Model.addTodayData(data,function () {
			Model.getTodayData();
		});
		a = 0;
		for (var i = 0; i < days_arr.length; i++) {
			if($("'#"+days_arr[i]+"lb13'").hasClass('check')){
				a++;
			};
		}
		if(a>6){
			Events.triggerAch('ach_5');
		}
		a = 0;
		for (var i = 0; i < days_arr.length; i++) {
			if($("'#"+days_arr[i]+"lb14'").hasClass('check')){
				a++;
			};
		}
		if(a>6){
			Events.triggerAch('ach_6');
		}
		a = 0;
		for (var i = 0; i < days_arr.length; i++) {
			if($("'#"+days_arr[i]+"lb7'").hasClass('check')){
				a++;
			};
		}
		if(a>6){
			Events.triggerAch('ach_7');
		}
		a = 0;
		for (var i = 0; i < days_arr.length; i++) {
			if($("'#"+days_arr[i]+"lb4'").hasClass('check')){
				a++;
			};
		}
		if(a>6){
			Events.triggerAch('ach_8');
		}
		a = 0;
		for (var i = 0; i < days_arr.length; i++) {
			if($("'#"+days_arr[i]+"lb19'").hasClass('check')){
				a++;
			};
		}
		if(a>6){
			Events.triggerAch('ach_9');
		}
	},
	triggerAch:function (ach) {
		Model.addAch(ach,function () {
			$("'#"+ach+"'").addClass('ach')
            Model.getAchS(ach,function (dt) {
                cordova.plugins.notification.local.schedule({title: dt.head,text: dt.s,icon:'not-icon.png'});
            })
        })
	}
}
