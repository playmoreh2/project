(function(t){
	var ui = {
		init : function(){
			// ui.tabInit();//
			// ui.iptInit();//
			// ui.accoInit();//
			// ui.tblInit();//
			ui.swipeInit();//
			// tip.init();//
			ui.progressInit();
		},
		progressInit : function(){
			console.log($('.progress').length);
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
		},
		swipeInit : function(){
			let swipes = [];
			let swipeIdx = {}; // 스와이프 obj 저장
			let swipeFocIdx = 0; // 스와이프 이동할 index 저장(slideTo)
			let swipeIdxTarget; // 스와이프 slideTo실행시 선택자

			$('.swiper_container').each(function(idx, obj){
				if( $(obj).closest(".swiper_wrap").hasClass("on") == false ){
					var slideNum = $(obj).find(".swiper_slide").length;
		
					if(slideNum > 1){
						// 인디케이터 커스텀
						if( $(obj).find(".swiper_btn_control").length == 0 ){
							$(obj).append('<div class="swiper_btn_control"><div class="swiper_btn_area"><div class="swiper_pagination"></div></div></div>');
							$(obj).find('.swiper_btn_area').append('<button type="button" class="btn_visual_stop"><span class="hidden">stop</span></button><button type="button" class="btn_visual_play"><span class="bar"></span><span class="hidden">play</span></button>');
							$(obj).find(".swiper_btn_control").append('<button type="button" class="swiper_button_prev"><span class="hidden">이전 슬라이드</span></button><button type="button" class="swiper_button_next"><span class="hidden">다음 슬라이드</span></button>');
						};
		
						swipes[idx] = new Swiper(obj, {
							// init: true,
							effect: $(obj).data('option').effect == "fade" ? "fade" : "slide",
							fadeEffect: { // fade
								crossFade: true
							},
							slidesPerView: $(obj).data('option').slidesPerView != undefined ? $(obj).data('option').slidesPerView : 1, // 슬라이드에 보여줄 갯수 slidersPerView
							slidesPerGroup : $(obj).data('option').slidesPerGroup != undefined ? $(obj).data('option').slidesPerGroup : 1, // 슬라이드 이동시 그룹으로 수
							loopFillGroupWithBlank : false, // 그룹수가 맞지 않을 경우 빈칸으로 메우기(3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬)
							spaceBetween: $(obj).data('option').spaceBetween != undefined ? $(obj).data('option').spaceBetween : 0, // margin 간격(px)
							loop: $(obj).data('option').loop != undefined ? $(obj).data('option').loop : true, // 무한루프
							grabCursor: true,
							keyboard: { // 키보드를 사용하여 슬라이드 탐색
								enabled: true,
							},
							autoHeight: $(obj).data('option').autoHeight == true ? true : false, //자동 높이 활성화
							// calculateHeight: true,
							autoplay: $(obj).data('option').autoplay == false ? false :{ // 자동재생
								delay: typeof($(obj).data('option').autoplay) == "number" ? $(obj).data('option').autoplay : 5000,
								disableOnInteraction: false
							},
							direction: $(obj).data('option').direction == "vertical" ? "vertical" : "horizontal", // 방향
							speed: $(obj).data('option').speed != undefined ? $(obj).data('option').speed : 800,
							navigation: {
								nextEl: '.swiper_button_next',
								prevEl: '.swiper_button_prev'
							},
							pagination: {
								el: '.swiper_pagination',
								clickable: true,
								type: $(this).data('option').pagination == "fraction" ? "fraction" : "bullets" , // 버튼 디자인 bullets" / "fraction"
								renderBullet : function (index, className) {
									return '<button type="button" title="' + (index + 1) + '번 슬라이드로 이동하기" class="' + className + '"><span class="hidden">' + (index + 1) + '</span></button>'
								},
								renderFraction : function (currentClass, totalClass) {
									return '<span class="' + currentClass + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + '"></span>'
								}
							},
							on: {
								init: function() { // 초기화 될 때 실행
									// tabindex
									var tabIdx = $(obj).find('.swiper-slide-active').index();
		
									$(obj).find('.swiper-slide :input, .swiper-slide a, .swiper-slide button').attr('tabindex','-1');
									if( $(obj).data('option').slidesPerView == undefined ){
										$(obj).find('.swiper-slide-active :input, .swiper-slide-active a, .swiper-slide-active button').removeAttr('tabindex');
									}else{
										$(obj).find('.swiper-slide').slice(tabIdx, $(obj).data('option').slidesPerView).find(":input, a, button").removeAttr('tabindex');
									};
									
									// 접근성 관련 속성
									$(obj).find('.swiper_pagination').attr("aria-label", "총 "+ slideNum +"장의 슬라이드 중 1번째 슬라이드");
									$(obj).find(".swiper_button_prev.swiper-button-disabled").attr("tabindex", -1);
		
									if( $(obj).data('option').pagination == false){
										$(obj).find('.swiper_btn_area .swiper_pagination').css({"display":"none"});
									};
									if( $(obj).data('option').navigation == false){
										$(obj).find('.swiper_button_prev, .swiper_button_next').css({"display":"none"});
									};
									
									// 자동롤링 아닐 때 재생/정지 버튼 비노출
									if($(obj).data('option').autoplay == false){
										$(obj).find('.btn_visual_stop, .btn_visual_play').css({"display":"none"});
									};
									
									$(obj).closest(".swiper-wrap").addClass("on");
								},
								slideChange: function(){
									// console.log(this.realIndex, "인덱스");
									if($(obj).find(".swiper_button_prev").hasClass("swiper-button-disabled") == false){
										$(obj).find(".swiper_button_prev").attr("tabindex", 0);
									}else{
										$(obj).find(".swiper_button_prev.swiper-button-disabled").attr("tabindex", -1);
									};
									
									if($(obj).find(".swiper_button_next").hasClass("swiper-button-disabled") == false){
										$(obj).find(".swiper_button_next").attr("tabindex", 0);
									}else{
										$(obj).find(".swiper_button_next.swiper-button-disabled").attr("tabindex", -1);
									};
									$(obj).find('.swiper_pagination').attr("aria-label", "총 "+ slideNum +"장의 슬라이드 중" + parseInt(this.realIndex+1) + "번째 슬라이드");
								},
								slideChangeTransitionEnd: function(){
									// tabindex
									var tabIdx = $(obj).find('.swiper-slide-active').index();
									// console.log($(obj).find('.swiper-slide-active'));
									
									$(obj).find('.swiper-slide :input, .swiper-slide a, .swiper-slide button').attr('tabindex','-1');
									if( $(obj).data('option').slidesPerView == undefined ){
										$(obj).find('.swiper-slide-active :input, .swiper-slide-active a, .swiper-slide-active button').removeAttr('tabindex');
									}else{
										$(obj).find('.swiper-slide').slice(tabIdx, tabIdx + $(obj).data('option').slidesPerView).find(":input, a, button").removeAttr('tabindex');
									};
								},
								reachBeginning: function(){
		
								},
								reachEnd: function(){
		
								}
							},
							threshold: 20,
							initialSlide : $(obj).data('option').initialSlide == true ? $(obj).find(".swiper-slide.on").index() : 0,
							allowTouchMove : $(obj).data('option').allowTouchMove != undefined ? $(obj).data('option').allowTouchMove : true,
							followFinger : true,
							observer: true,
							observeParents: true,
							centeredSlides: false,
							mousewheel: { // 마우스휠 스와이프 이동 제어
								enabled: false,
							},
							slidesPerColumnFill: "column",
							slidesPerColumn: $(obj).data('option').grid == undefined ? false : $(obj).data('option').grid
						});
						
						// 정지
						$(obj).find('.btn_visual_stop').off("click").on('click', function(e){
							e.preventDefault();
							swipes[idx].autoplay.stop();
							$(obj).find('.btn_visual_stop').css({"display":"none"});
							$(obj).find('.btn_visual_play').css({"display":"inline-block"});
							$(obj).find('.btn_visual_play').focus();
							return false;
						});
						// 재생
						$(obj).find('.btn_visual_play').off("click").on('click', function(e){
							e.preventDefault();
							swipes[idx].autoplay.start();
							$(obj).find('.btn_visual_play').css({"display":"none"});
							$(obj).find('.btn_visual_stop').css({"display":"inline-block"}); 
							$(obj).find('.btn_visual_stop').focus();
							return false;
						});
					};
					// swipes[idx].init();
				};
				
				// 스와이프 배열 선택
				if( $(obj).data('option').swipeIdx !== undefined ){
					swipeIdx[$(obj).data('option').swipeIdx] = idx;
					// swipes[swipeIdx["val"]].slideTo( 1 ); // 개발에서 해당 스와이프 목적으로 필요할시 사용(attr "swipeIdx":"" 추가시에만 사용 가능)
				};
		
				// 스와이프 해당 포커스로 이동
				if( $(obj).data('option').focusIdx !== undefined && $(obj).data('option').loop == false ){
					if( $(obj).closest(".swiper-wrap").hasClass("focusIdx") == false ){ // 처음 실행
						swipeFocIdx = $(obj).data('option').focusIdx || 0;
						$(obj).closest(".swiper-wrap").addClass("focusIdx");
						swipes[idx].slideTo( swipeFocIdx, 0 );
						// swipes[swipeIdx[$(obj).data('option').swipeIdx]].slideTo( swipeFocIdx );
					}else if( $(obj).data('option').swipeIdx != undefined && swipeIdxTarget != undefined){ // 해당 스와이프만 slideTo 실행
						swipes[swipeIdx[swipeIdxTarget]].slideTo( swipeFocIdx, 600 );
					}else{
						swipes[idx].slideTo( swipeFocIdx, 0 );
					};
				};
			});
		},
	}
	t.ui = ui;
})(this)

$(document).ready(function(){
	ui.init();
});