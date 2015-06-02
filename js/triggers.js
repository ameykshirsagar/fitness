var today = moment().format('ddd').toLowerCase();


 $(document).ready(function(){
  $("."+today).css('background-color','#fff');
  $("."+today).css('color','#8bbe40');
  $("."+today+"l").css('background-color','#fff');
  $("."+today+"l").css('padding-right', '0px');
  $("."+today+"l").css('padding-left', '0px');
  $("."+today).css('padding-top', ((document.getElementById('content').clientWidth/24)-10)+'px');
  $("."+today).css('padding-bottom', ((document.getElementById('content').clientWidth/24)-10)+'px');
  $("#"+today).css('text-decoration','underline');
  $("#"+today).css('color','#8bbe40');
  
  $(".close").bind('touchstart',function (e) {
    e.preventDefault()
    $.ui.hideModal()
  })
  //login page
  $('#sign_in').bind('touchend',function (e) {
    e.preventDefault();
    //sign_in();
    $.ui.showMask("Logging in..")
    sign_in()
  });
  $(".custom_back").bind('touchstart',function (e) {
      e.preventDefault()
      $.ui.goBack()
  })
  $('#logout_bt').bind('touchend',function (e) {
    e.preventDefault();
    //sign_in();
    $.ui.showMask("Logging out..")
    setTimeout(function () {
      $.ui.hideMask()
      $.ui.loadContent('login',false,false,'fade');
    },2000)
  });
  $('#profile_bt').bind('touchend',function (e) {
    e.preventDefault();
    //sign_in();
    $.ui.showMask("Loading your profile..")
    $.ui.toggleSideMenu();
    setTimeout(function () {
      $.ui.hideMask()
      $.ui.loadContent('profile',false,false,'fade');
    },2000)
  });
  $('#prof-ctrl-info').bind('touchend',function (e) {
    e.preventDefault();
    $('#prof-ctrl-info').addClass('pressed');
    $('#prof-ctrl-edit').removeClass('pressed');
  });
  $('#open_interview').bind('touchend',function (e) {
    e.preventDefault();
    //getCurrentPosition();
    $.ui.showModal("interview_pre")
  });
  $('#pre_yes').bind('touchend',function (e) {
    e.preventDefault();
    $.ui.hideModal("interview_pre")
   setTimeout(function () {
      $.ui.showModal("interview_start");
    },300);
  });
   $('#pre_no').bind('touchend',function (e) {
    e.preventDefault();
    $.ui.hideModal("interview_pre")
  });
   $('#start_cam_trig').bind('touchend',function (e) {
    e.preventDefault();
    cam()
  });
  $('#prof-ctrl-edit').bind('touchend',function (e) {
    e.preventDefault();
    $.ui.loadContent('profile_edit',false,false,'fade');
  });
  $('input[type=checkbox]').bind('touchend',function (e) {
    e.preventDefault();
    $('input[type=checkbox]').css('width','19px')
    console.log(e.target.id)
  });
   $('.thisday').bind('touchend',function (e) {
    e.preventDefault();
    var ide = '#'+ e.target.id;
    var idi = '#'+ e.target.htmlFor;
    var vals = $(idi).val();
    if (e.target.id==("lb2")||e.target.id==("lb3")) {
      $(ide).css('background-color','#fff')
      if (vals=="E") {
        $(ide).css('background-color','red')
        $("."+e.target.htmlFor).html("Bad")
        $(idi).val(-1);
      }
      if(vals==-1){
        $(ide).css('background-color','white')
        $("."+e.target.htmlFor).html("Neutral")
        $(idi).val(0);
      }
      if (vals==0){
        $(ide).css('background-color','green')
        $("."+e.target.htmlFor).html("Good")
        $(idi).val(1);
      };
      if (vals==1) {
        $(ide).css('background-color','red')
        $("."+e.target.htmlFor).html("Bad")
        $(idi).val(-1);
      };
    };
  });

   $('#charts_bt').bind('touchend',function (e) {
    e.preventDefault();
      Model.isMyInfo(function (is) {
        if (is) {
          Events.render_chart();
        }else{
          alert("First add info about yourself in My Info section");
        };
      })
      
  });
  $("label."+today).bind('touchend',function (e) {
      e.preventDefault();
      $.ui.showModal('thu_modal');
      Model.getWtType(function (w) {
        if (w==1) {
          $(".wt_ip").html("Pounds")
        } else{
          $(".wt_ip").html("Kilograms")
        };
      })
  })
  $("#get_ques_trig").bind('touchend',function (e) {
    e.preventDefault()
    //saveInterviewDetails()
    $.ui.hideModal("interview_start");
    if ($("#interviewee_name").val()!="") {
      setTimeout(function () {
        $.ui.showModal("interview_ques");
      },300);
      getQbankList();
    } else{
      setTimeout(function () {
        $.ui.showModal("interview_start");
      },300);
      $("#error_msg").html('Enter the name of the interviewee.Then the questions will be fetched');
        setTimeout(function () {
        $("#error_msg").empty();
      },3000)
    };
  });
  $('.ques-list').scroller()
});
$(".info_trig").bind('touchstart',function(e){
    e.preventDefault();
    $.ui.showModal("info_m");
    $(".close_modal").bind('touchstart',function () {
        e.preventDefault();
        $.ui.hideModal()
    });
})
$(".settings_trig").bind('touchend',function (e) {
    e.preventDefault();
    $.ui.showModal("settings");
});
$(".disclaimer_trig").bind('touchend',function (e) {
    e.preventDefault()
    $.ui.showModal("disclaimer")
});
$("#my_info_add").bind('touchend',function (e) {
    e.preventDefault()
    Events.addMyInfo();
});
$(".time").bind("touchend",function (e){
  datePicker.show({date:new Date(),mode:'time'}, function(date){
    $("#"+e.target.id).val(date.toString().split(" ")[4])
  });
});
$("#add_today_chart").bind('touchend',function (e) {
    e.preventDefault();
    Events.addTodayData();
    $.ui.hideModal();
});
$('#my_info_bt').bind('touchend',function (e) {
    $.ui.showMask('Loading your info..')
    Events.populateMyInfo()
});
$("#bw_version").bind('touchend',function (e) {
    e.preventDefault();
    window.open(encodeURI('http://www.amazon.com/Youre-Fat-Shes-Not-lifestyle/dp/098486282X/ref=sr_1_2?ie=UTF8&qid=1422952923&sr=8-2&keywords=sachin+mayi'),'_system','location=yes');
    Events.triggerAch('ach_10')
});
$("#co_version").bind('touchend',function (e) {
    e.preventDefault();
    window.open(encodeURI('http://www.amazon.com/Youre-Fat-Shes-Not-lifestyle-ebook/dp/B00LBGT12K/ref=sr_1_1?ie=UTF8&qid=1422952923&sr=8-1&keywords=sachin+mayi&pebp=1422952924154&peasin=B00LBGT12K'),'_system','location=yes')
    Events.triggerAch('ach_10')
})
