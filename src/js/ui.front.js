(function(t){
	var ui = {
		init : function(){
			ui.tabInit();//
			ui.iptInit();//
			ui.accoInit();//
			ui.tblInit();//
			ui.swiperInit();//
			tip.init();//
			ui.progressInit();
		},
		progressInit : function(){
			console.log("progressInit");
			for(var  i = 0 ; i < $('.progress').length ; ++i ){
				if( $('.progress').eq(i).hasClass('uiAct') == false ){
					$('.progress').eq(i).addClass('uiAct');
					$('.progress:eq('+i+') ol').attr('aria-hidden','true');
					var num = $('.progress').eq(i).find('li').length;
					var nowStep = $('.progress').eq(i).find('li.on').index() + 1;
					var stepName = $('.progress:eq('+i+') li.on').text();
					$('.progress:eq('+i+')').attr('role','img');
					$('.progress:eq('+i+')').attr('aria-label','총 '+num+'단계 중 '+nowStep+'단계 '+stepName + ' 진행중');
					if( $('.progress:eq('+i+') li.on span').length == 0 ){
						$('.progress:eq('+i+') li.on').wrapInner('<span/>');
					}
				}
			}
		}
	}
})()

$(document).ready(function(){
	ui.init();
});