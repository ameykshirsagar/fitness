//1,2,4,10,3,5,6,7,8 implmented

var appdb = new Lawnchair({
    adapter: "dom",
    name: "yfsn"
},function (yfsn) {
	console.log("DB is initiated.")
});
var today = moment().format('ddd').toLowerCase();
var currmnth = moment().format('MMM').toLowerCase();
var ach = {'ach_1':false,'ach_2':false,'ach_3':false,'ach_4':false,'ach_5':false,'ach_6':false,'ach_7':false,'ach_8':false,'ach_9':false,'ach_10':false};
var ach_s = {'ach_1':{head:'Healthy Day!',s:'First day of good health'},'ach_2':{head:'Health Streak!',s:'First week of good health'},'ach_3':{head:'Big Loser?',s:'Lost 10 kilograms / 22 pounds'},'ach_4':{head:'Something good!',s:'Filled out info'},'ach_5':{head:'No lactose?',s:'No dairy for the week'},'ach_6':{head:'Tanned!',s:'Week of sun time'},'ach_7':{head:'Clean streak!',s:'Week of bathing'},'ach_8':{head:'Mr. Fantastic',s:'Streching for a week'},'ach_9':{head:'Happy days!',s:'Positive mental attitude for a week'},'ach_10':{head:'Bookworm',s:'Purchased a book'}};
var Model = {
	init:function () {
		appdb.exists(currmnth,function (really) {
			if (!really) {
				appdb.save({key:currmnth})
			};
		});
		appdb.exists(today,function (really) {
			if (!really) {
				appdb.save({key:today})
			};
		});

		appdb.exists('achs',function (really) {
			if (!really) {
				appdb.save({key:'achs',value:ach})
			};
		});
		appdb.exists('ach_s',function (really) {
			if (!really) {
				appdb.save({key:'ach_s',value:ach_s})
			};
		});
		appdb.exists('entries',function (really) {
			if (!really) {
				appdb.save({key:'entries',value:0})
			};
		});
		appdb.exists('wt_loss',function (really) {
			if (!really) {
				appdb.save({key:'wt_loss',value:0})
			};
		});
	},
	addEntries:function (s) {
		appdb.save({key:'entries',value:s});
	},
	getEntries:function (cb) {
		appdb.get('entries',function (dt) {
	        cb(dt.value)
	    })
	},
	addMyInfo:function (data,callback){
		appdb.save({key:'my_info',value:data});
		callback();
	},
	getMyInfo:function (callback) {
		appdb.get('my_info',function (data) {
			callback(data.value);
		});
	},
	isMyInfo:function (callback) {
		appdb.exists('my_info',function (doesit) {
			callback(doesit)
		})
	},
	getWtType:function (cb) {
		appdb.get('my_info',function (d) {
			cb(d.value.weight_type);
		})
	},
	getWtCt:function (cb) {
		appdb.get('wt_loss',function (d) {
			cb(d.value)
		})
	},
	addWtCt:function (d) {
		appdb.save({key:'wt_loss',value:d})
	},
	addAch:function(ach,cb) {
		appdb.exists('achs',function (really) {
			if (really) {
				appdb.get('achs',function (dt) {
					var p = dt.value;
					for (var key in p) {
					  if (p.hasOwnProperty(key)) {
					    if(key == ach){
					    	p[key]=true
					    	appdb.save({key:'achs',value:p});
					    	if (cb!==undefined||cb!==null) {
					    		cb();
					    	};
					    }
					  }
					}
				});
			};
		});
	},
	getAllAch:function(cb) {
		appdb.exists('achs',function (really) {
			if (really) {
				appdb.get('achs',function (dt) {
					cb(dt.value)
				});
			};
		});
	},
	getAch:function(ach,cb) {
		appdb.exists('achs',function (really) {
			if (really) {
				appdb.get('achs',function (dt) {
					var p = dt.value;
					for (var key in p) {
					  if (p.hasOwnProperty(key)) {
					    if(key == ach){
					    	cb(p[key]);
					    };
					  };
					};
				});
			};
		});
	},
	getAchS:function(ach,cb) {
		appdb.exists('ach_s',function (really) {
			if (really) {
				appdb.get('ach_s',function (dt) {
					var p = dt.value;
					for (var key in p) {
					  if (p.hasOwnProperty(key)) {
					    if(key == ach){
					    	cb(p[key]);
					    };
					  };
					};
				});
			};
		});
	},
	getTodayData:function(dat,callback){
	         //  console.log( $("label.fri")[4].html());
			  //  $("label.fri")[4].text("Hello World");
			  // $("input.fri")[4].html("Hello World");
			  // document.getElementById(today+"lb4").innerHTML ="Yes"
			   var values;
			   console.log("exec")
			   appdb.get(today,function (data) {
				   var chkData = data.value.chkData;
				   var a = -1;
		           $("#"+$("label."+today)[0].id).text(data.value.startwt);
		           $("#"+$("label."+today)[20].id).text(data.value.end_wt);
		           $("#"+$("label."+today)[21].id).text(data.value.score);
		           if (data.value.gen_feel=="E") {
		             $("#"+$("label."+today)[1].id).css('background-color','red')
		           }
		           if(parseInt(data.value.gen_feel)==-1){
		             $("#"+$("label."+today)[1].id).css('background-color','white')
		           }
		           if (parseInt(data.value.gen_feel)==1){
		             $("#"+$("label."+today)[1].id).css('background-color','green')
		           };
		           if (parseInt(data.value.gen_feel)==0) {
		             $("#"+$("label."+today)[1].id).css('background-color','red')
		           };
		           if (data.value.gen_app=="E") {
		             $("#"+$("label."+today)[2].id).css('background-color','red')
		           }
		           if(parseInt(data.value.gen_app)==-1){
		             $("#"+$("label."+today)[2].id).css('background-color','white')
		           }
		           if (parseInt(data.value.gen_app)==1){
		             $("#"+$("label."+today)[2].id).css('background-color','green')
		           };
		           if (parseInt(data.value.gen_app)==0) {
		             $("#"+$("label."+today)[2].id).css('background-color','red')
		           };
					   for(var i=4;i<21;i++){
						    if(chkData.charAt(i-4)=='1'){
								$("#"+$("label."+today)[i-1].id).addClass('icon check');
	              $("#"+$("input."+today)[i-1].id).attr('checked',true)
							    //document.getElementById(today+"lb"+i).innerHTML ="Yes";
							}
							else{
							  	//a+= "no";
							 	$("#"+$("label."+today)[i-1].id).addClass('icon close');
	               $("#"+$("input."+today)[i-1].id).attr('checked',false)
								// document.getElementById(today+"lb"+i).innerHTML ="No";
							}
							a+=i;
					   }
		      });

	},

	getWeekData:function(callback){

			   var values;
			   var week= ["sun","mon","tue","wed","thu","fri","sat"];
			   var score =0;
			   var index=0;
			   for(var j=0;j<week.length;j++){
				   if(today==week[j]){
					   index =j;
					   break;
				   }
			   }

			   for( var k=index;k>=0;k--) {
			   appdb.get(week[k],function (data) {
			   		var a = "";
			       if( data!=undefined && data!=null  && data!="" &&data.value != undefined) {
				   console.log(data)
			   		 var chkData = data.value.chkData;
			   		 score = parseInt(score)+parseInt(data.value.score);

				   // population of weight values in the form by the data
				    document.getElementById("start_wt_ip").value=data.value.startwt;
					 document.getElementById("end_wt_ip").value=data.value.end_wt;
				   document.getElementById("gfeel").value = data.value.gen_feel;
				   document.getElementById("gappe").value = data.value.gen_app;
				   //   population of radiobutton values in the form by the data
				   // Start
				      for(var i=4;i<21;i++){

							     if(chkData.charAt(i-4)=='1'){

								    document.getElementById("radio"+(2*i-4)).checked = true;
									document.getElementById("radio"+(2*i-3)).checked = false;
								  }
								  else{

									document.getElementById("radio"+(2*i-4)).checked = false;
									document.getElementById("radio"+(2*i-3)).checked = true;
								  }
						    }

				   // ----  End

			       		if (data.key==today) {

			       			Model.getTodayData()
			       		} else{
			       			for(var i=4;i<21;i++){
							   	a+=i;
							     if(chkData.charAt(i-4)=='1'){
									$("#"+$("label."+week[k])[i-1].id).addClass('icon check')
								  	$("#"+$("input."+week[k])[i-1].id).attr('checked',true)
								  }
								  else{

								  $("#"+$("label."+week[k])[i-1].id).addClass('icon close')

								  }
						    }
                 $("#"+week[k]+"lb1").text(data.value.startwt);
                 $("#"+week[k]+"lb21").text(data.value.end_wt);
                 $("#"+week[k]+"lb22").text(data.value.score);
			       		};
					}
		      });
		}
	},

	addAppSettings:function (){
		appdb.save({key:'app_settings',value:{'is_first':false,installed_on:new Date()}})
	},
	getAppSettings :function (callback) {
		appdb.get('app_settings',function (data) {
			callback(data.value)
		});
	},
	checkFirstRun : function (callback) {
		appdb.get('app_settings',function (data) {
			if (data==null) {
				callback(false)
			} else{
				callback(true)
			};
		})
	},
	getStartDate:function (callback) {
		appdb.get('app_settings',function (data) {
			callback(data.value.installed_on);
		});
	},
	addTodayData:function (data,callback) {
		appdb.exists(today,function (doesit) {
			if (!doesit) {
				appdb.save({key:today,value:data});
				callback()
			} else{
				appdb.get(today,function (dat) {
					if (dat.value!=undefined) {
						var olds = dat.value.score;
						appdb.exists(currmnth,function (doesit) {
							if (!doesit) {
								appdb.save({key:currmnth,value:olds})
								appdb.exists('mnth_usage',function (doesit) {
									if (doesit) {
										appdb.get('mnth_usage',function (dt) {
											if (dt.value!=undefined && dt.value!=null  && dt.value!="") {
												var usg_str = dt.value+","+currmnth;
												appdb.save({key:'mnth_usage',value:usg_str})
											} else{
												appdb.save({key:'mnth_usage',value:currmnth})
											};

										})
									} else{
										appdb.save({key:'mnth_usage',value:currmnth})
									};
								});

							} else{
								appdb.get(currmnth,function (dats) {
									var news;
									if (dats.value!=undefined && dats.value!=null  && dats.value!="") {
										news = parseInt(dats.value)+parseInt(olds)
										appdb.save({key:currmnth,value:news})
									} else{
										appdb.save({key:currmnth,value:olds})
									};
								})
							};
						})
					} else{
						appdb.save({key:today,value:data});
						callback();
					};
				})
			};
		})
		//callback()

	},
	getMonthData:function () {
		appdb.exists('mnth_usage',function (doesit) {
			var mnth_sc = 0;
			if (doesit) {
				appdb.get('mnth_usage',function (dt) {
					var mnth_ar = dt.value.split(",");
					if (mnth_ar.length>0) {
						for (var i = 0; i < mnth_ar.length; i++) {
							appdb.get(mnth_ar[i],function(d){
								mnth_sc = parseInt(d.value)+score;
							})
						};
					}else{
						appdb.get(mnth_ar[i],function(d){
							mnth_sc = parseInt(d.value)+score;
						})
					};
				});
				if (mnth_sc>0) {
					$("#all_month_score").html(mnth_sc)
				};
			};
		})
	},
	checkTodaysData:function (callback) {
		appdb.exists(today,function (isit) {
			if (isit) {
				appdb.get(today,function (dt) {
					var enter_data = dt.value.added_on;
					if (moment(enter_data),format('LL')==moment(new Date()).format('LL')) {
						callback(true)
					} else{
						callback(false)
					};
				})
			} else{
				callback(false)
			};
		})

	}
}
