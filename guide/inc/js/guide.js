$(document).ready(function(){
    switchMode(); // 배경

    // 검색
    if( $("body.cvGuide.search").length > 0 ){
        comm.pageLtTxtUpdate($(".navList.rdo input:radio[name=rdo]:checked"));
        search.depCode = $(".content .cont .page_list tbody").html();
        $(".cvGuide.search .cont .page_list tbody").empty(); // 마크업 삭제

        $(".srch_wrap .btn_srch").unbind("click").bind("click", function(e){
            $(".cvGuide.search .cont .page_list tbody").empty(); // 마크업 삭제

            let srchVal = $(".srch_wrap .ipt_wrap input.ipt").val();
            if( srchVal !== "" ){
                if( srchVal.length < 2 ){
                    alert("두 글자 이상 입력해 주세요.");
                }else{
                    $(".srch_wrap button.btn_srch").attr("disabled", true);
                    search.searchFn(srchVal);
                };
            }else{
                alert("검색어를 입력해주세요.");
            };
        });

        $(".navList.rdo input:radio[name=rdo]").bind("change", function(e){
            comm.pageLtTxtUpdate($(e.target));
        });
    };
    
    // summary, guide, pagelist
    if( $("body.cvGuide.search").length == 0 ){
        // 메뉴 데이터 호출
        var ctgParam = "./guide/resource/menu/category/ctg_summary.json";
        var gnbTemplt = "./guide/resource/template/summary/template_summary.html";
        var dataParam = "./guide/resource/template/summary/template_dashboard.html";
        comm.ctgCode = $(".cvLnb .navList").html();
        comm.ctgDepCode = $(".cvLnb .navList .subList").html();

        comm.ctgTemplt(ctgParam);
        comm.dataTemplt(gnbTemplt, dataParam);
        comm.pageLtTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
        comm.pageLtUpdate(); // 로드시 컨텐츠 update 호출

        // gnb ajax 호출
        $("cvGuideli > button[class^=menu_]").unbind("click").bind("click", function(e){
            // console.log($(e.target).attr("class") !== $("cvGuideli.on > button[class^=menu_]").attr("class"));
            if( $(e.target).attr("class") !== $("cvGuideli.on > button[class^=menu_]").attr("class") ){
                var param = $(e.target).attr("class");
                
                $("cvGuide> ul > li").removeClass("on");
                $(e.target).closest("li").addClass("on");
                switch (param){
                    case "menu_summary":
                        // 1번째 summary
                        ctgParam = "./guide/resource/menu/category/ctg_summary.json";
                        gnbTemplt = "./guide/resource/template/summary/template_summary.html";
                        comm.ctgTemplt(ctgParam);

                        dataParam = "./guide/resource/template/summary/template_dashboard.html";
                        comm.dataTemplt(gnbTemplt, dataParam);
                        
                        comm.pageLtTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
                        comm.pageLtUpdate(); // page update 호출
                        break;
                    case "menu_guide":
                        // 2번째 guide
                        ctgParam = "./guide/resource/menu/category/ctg_guide.json";
                        gnbTemplt = "./guide/resource/template/guide/template_guide.html";
                        comm.ctgTemplt(ctgParam);

                        dataParam = "./guide/resource/template/guide/template_guide_title.html";
                        comm.dataTemplt(gnbTemplt, dataParam);

                        comm.pageLtTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
                        comm.pageLtUpdate(); // page update 호출
                        break;
                    case "menu_list":
                        // 3번째 page list
                        ctgParam = "./guide/resource/menu/category/ctg_page_list.json";
                        gnbTemplt = "./guide/resource/template/pageList/template_page_list.html";
                        comm.ctgTemplt(ctgParam);

                        dataParam = $(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button").data("info");
                        comm.dataTemplt(gnbTemplt, dataParam);

                        comm.pageLtTxtUpdate(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button"); // 화면 처음 들어올때
                        comm.pageLtUpdate(); // page update 호출
                };
            };
        });
    };

});

// 공통 template/data 함수
var comm = {
    ctgCode : "",
    ctgDepCode : "",
    template : null, // template 디폴트
    param : null, // data 디폴트
    dataArray : [], // dashboard data
    dataArrayFnsh : [], // dashboard data 완료
	time : null, // setTimeout
    totalNum : [],
    finishNum : [],
    ctgTemplt : function(ctgParam){ // category
        $.ajax({
            url: ctgParam+"?"+Math.round(100000*Math.random()),
            type: "get",
            dataType : "json",
            async : false,
            cache : false,
            success: function(data){
                const listData = data["root_comment"];
                // console.log('통신 성공', listData);
                
                $(".cvLnb .nav > h2").text($("cvGuideli.on").text());

                $(".cvLnb .navList").empty(); // 마크업 삭제
    
                $.each(listData, function(idx, item){
                    if(comm.ctgCode !== "" && comm.ctgDepCode !== "" && listData != null){ // html && data 있을 때
                        $(".cvLnb .navList").append(comm.ctgCode);
                        $(".cvLnb .navList > li").eq(idx).find(".subList").empty();
                        // console.log("UI Data", listData[idx].title, $(".cvLnb .navList > li").eq(idx), listData[idx].menu.length);
                        
                        // text 삽입
                        $(".cvLnb .navList > li").eq(idx).find("button.tit").append(
                            listData[idx].title
                        );
                        if( listData[idx].active != undefined && listData[idx].data_info != undefined ){
                            // class 추가
                            if( listData[idx].active == true ){
                                $(".cvLnb .navList > li").removeClass("on");
                                $(".cvLnb .navList > li:eq("+idx+")").addClass("on");
                            };
                            // attr 추가
                            $(".cvLnb .navList > li").eq(idx).find("button.tit").attr({
                                "data-info": listData[idx].data_info,
                                "title": listData[idx].title+" 메뉴 보기"
                            });
                        };
                        
                        // 서브메뉴가 있을 때 실행
                        if( listData[idx].menu != null && listData[idx].menu.length > 0 ){
                            $(".cvLnb .navList > li:eq("+idx+")").find("button.tit").addClass("btn_acco");
                            $(".cvLnb .navList > li:eq("+idx+")").find("button.tit").append('<span class="blind">펼치기</span>');
                            for( var i=0; i<listData[idx].menu.length; i++ ){
                                $(".cvLnb .navList > li:eq("+idx+")").find(".subList").append(comm.ctgDepCode);
                                // console.log("UI Data", $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")"));

                                // class 추가
                                if( listData[idx].menu[i].active == true ){
                                    $(".cvLnb .navList > li").find(".subList > li").removeClass("on");
                                    $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li").eq(i).addClass("on");
                                };
                                // attr 추가
                                $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")").find("> button").attr({
                                    "data-info": listData[idx].menu[i].data_info,
                                    "title": listData[idx].menu[i].so_menu+" 메뉴 보기"
                                });                                    
                                // text 삽입
                                $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")").find("> button").append(
                                    listData[idx].menu[i].so_menu
                                );
                            };
                        }else{
                            $(".subList").remove();
                        };
                    }else{
                        console.log("Category Page List 외 호출");
                    };

                });
                // 메뉴 활성화 하지 않을 경우 디폴트 첫 번째 메뉴 활성화
                if( $(".cvLnb .navList > li").find(".subList > li.on").length == 0 ){
                    $(".cvLnb .navList > li:eq(0)").find(".subList > li").eq(0).addClass("on");
                };

				// pagelist 탭에서 각 메뉴 진척률 가져오기
                if( ctgParam == "./guide/resource/menu/category/ctg_page_list.json" && $("cvGuideli.on .menu_list").length > 0 && comm.dataArray != null && comm.dataArray.length > 0 ){                    
                    $.each(comm.dataArray, function(idx, item){
                        for( var i=0; i<item.length; i++ ){
                            $.ajax({
                                url: item[i]+"?"+Math.round(100000*Math.random()),
                                type: "get",
                                dataType : "json",
                                async : false,
                                cache : false,
                                success: function(data){
                                    let infoData = data["root_comment"];
                                    let cnt = 0;
                                    for( var j=0; j<infoData.length; j++ ){
                                        // console.log("infoData", infoData[j].finish, infoData.length, j);
                                        // console.log("infoData", $(".cvLnb .nav > ul > li:eq("+i+") > .subList > li:eq("+j+")"));
                                        $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.num > .total_num").text(infoData.length);
                                        $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.num > em").html(cnt += infoData[j].finish);
                                    };
                                    $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.count > em").html(((cnt/infoData.length)*100).toFixed(1));
                                },
                                error: function(){
                                    $(".content .cont").append(
                                        '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                                    );
                                }
                            });
                        };
                    });  
                };
                
            },
            error: function(){
                $(".content .cont").empty();
                $(".content .cont").append(
                    '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경 또는 리소스 여부 다시 확인하여 주십시오.</p>'
                );
            },
            complete: function(){
                // 카테고리 아코디언 click 이벤트
                if( $(".cvLnb .nav .subList").length > 0 && $(".cvLnb .nav > ul > li > button.tit.btn_acco").length > 0 ){
                    $(".cvLnb .navList button.tit").unbind("click").bind("click", function(e){
                        acco.accoClick(this);
                    });                    
                };
            }
        });
    },
    dataTemplt : function(gnbTemplt, dataParam){ // template
        $(".content .cont").load(gnbTemplt, function(e){
            const code = e;
            const extenType = dataParam.split('.').pop().toLowerCase() == "json" ? "json" : "html"; //확장자 분리, 체크
            
            if( e != undefined && dataParam != undefined ){
                $.ajax({
                    url: dataParam+"?"+Math.round(100000*Math.random()),
                    type: "get",
                    dataType : extenType,
                    async : false,
                    cache : false,
                    success: function(data, textStatus, jqXHR){
                        switch (extenType){
                            case "json":
                                // json type
                                const listData = data["root_comment"];
                                
                                // page list type
                                if( $(".content .cont .page_list tbody").length > 0 ){
                                    var depCode = $(".content .cont .page_list tbody").html();
                                    // console.log('통신 성공', listData, code, depCode);
                                    $(".content .cont .page_list tbody").empty(); // 마크업 삭제
                                    
                                    $.each(listData, function(idx, item){
                                        // console.log('통신 성공', item, idx);
                                        if(code != null && depCode != null && listData != null){ // html && data 있을 때
                                            $(".content .cont .page_list tbody").append(depCode);
                                            // console.log("UI Data", listData[idx].link, $(".page_list tbody tr").eq(idx));
            
                                            // 링크
                                            $(".page_list tbody tr").eq(idx).find("td.link > a").attr({
                                                'href':listData[idx].link
                                            });
                                            
                                            // text 삽입
                                            $(".page_list tbody tr").eq(idx).find("td.no").append(
                                                idx+1
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_1").append(
                                                listData[idx].depth1
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_2").append(
                                                listData[idx].depth2
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_3").append(
                                                listData[idx].depth3
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_4").append(
                                                listData[idx].depth4
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.chk").append(
                                                listData[idx].check.toUpperCase()
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.complete").append(
                                                listData[idx].complete
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.modify").append(
                                                listData[idx].modify
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.pageID").append(
                                                listData[idx].pageId
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.comment").append(
                                                listData[idx].comment
                                            );
                                            
                                            // 완료 페이지 여부
                                            if( listData[idx].finish == true ){
                                                $(".page_list tbody tr").eq(idx).addClass("finish");
                                            }else{
                                                $(".page_list tbody tr").eq(idx).addClass("ing");
                                            };
                                        };
                                    });
                                    
                                    clearTimeout(comm.time);
                                    comm.time = setTimeout(comm.countState, 600);
                                };
                                
                                break;
                            case "html":
                                // html type
                                if( $(".content .cont .page_summary").length > 0 ){ // summary type
                                    // console.log('통신 성공', code);                
                                    $(".content .cont .page_summary").empty(); // 마크업 삭제
                                    
                                    if(code != null && data != null && data != ""){ // html && data 있을 때
                                        $(".content .cont .page_summary").html(data);
                                        if( $(".dashboard_area").length > 0 ){
                                            comm.ratio(); // dashboard 호출
                                        };
                                    };
                                }else if( $(".content .cont .page_guide").length > 0 ){ // guide type
                                    $(".content .cont .page_guide").empty(); // 마크업 삭제
                                    
                                    if(code != null && data != null && data != ""){ // html && data 있을 때
                                        $(".content .cont .page_guide").html($(data).children());
                                        comm.copyTo(); // 추후 가이드 완료 후 위치 수정예정
                                    };
                                };
                        };
                    },
                    error: function(){
                        $(".content .cont").empty();
                        $(".content .cont").append(
                            '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경 또는 리소스 여부를 다시 확인하여 주십시오.</p>'
                        );
                    },
                    complete: function(){
                        // guide 소스보기 아코디언 click 이벤트
                        $(".cvGuide_area .code_view .btn_acco").unbind("click").bind("click", function(e){
                            acco.accoClick(this, function(e){
                                if( $(".page_guide .cvGuide_area").length > 0 ){
                                    if( $(e).text() == "코드 보기" ){
                                        $(e).text("코드 닫기");
                                    }else{
                                        $(e).text("코드 보기");
                                    };
                                };
                            });
                        });
                    }
                });
            }else{
                console.log("Page List 외 호출");
            };
            comm.pageLtMerge();
        });
    },
    pageLtMerge : function() {
		// variable 정의
		var first = true;
		var prevRowspan1 = 1;
		var prevCell1 = null;
		var prevRowspan2 = 1;
		var prevCell2 = null;

		// tr 모두 추출
		var rows = $(".page_list tbody").children();
        // console.log(rows.length);

		for (var i = 0; i < rows.length; i++ ) {
			// first row
			if (first) {
				prevRow = rows[i];
				prevCell1 = $(prevRow).find("td").eq(1); // td depth_1
				prevCell2 = $(prevRow).find("td").eq(2); // td depth_2

				// console.log(rows);
				// console.log(prevCell1);
				// console.log(prevCell2);

				first = false;
				continue;
			}
			var row = rows[i]; // row
			var tdList = $(row).find("td"); // row > td 리스트

			var firstCell = $(tdList).eq(1); // td depth_1
			var secondCell = $(tdList).eq(2); // td depth_2

			var firstCellText = $(firstCell).text();
			var secondCellText = $(secondCell).text();

			// 두 번째 row 부터 텍스트 비교
			if (prevCell1.text() == firstCellText) {
				if (prevCell2.text() == secondCellText) { // 값 비교
					prevRowspan2++; // 중복되는 값이 있으므로 rowspan +1
					$(prevCell2).attr("rowspan", prevRowspan2); // 첫 번째 row의 두 번째 cell에 rowspan 추가
					$(secondCell).remove(); // 중복 cell element 삭제
				} else {
					prevRowspan2 = 1;
					prevCell2 = secondCell;
				}
				prevRowspan1++;
				$(prevCell1).attr("rowspan", prevRowspan1);
				$(firstCell).remove();
			}
			else {
				prevRowspan1 = 1;
				prevRowspan2 = 1;
				prevCell1 = firstCell;
				prevCell2 = secondCell;
			}
		}
	},
    pageLtUpdate : function(){
        // summary, guide 이벤트
        $(".cvLnb .nav > ul > li > button.tit:not(.btn_acco)").unbind("click").bind("click", function(e){
            if( $("cvGuideli.on").find(".menu_summary").length > 0 ){
                comm.template= "./guide/resource/template/summary/template_summary.html";
            }else if( $("cvGuideli.on").find(".menu_guide").length > 0 ){
                comm.template= "./guide/resource/template/guide/template_guide.html";
            };
            
            comm.param = $(e.target).data("info");

            if( $(e.target).closest("li").hasClass("on") == false && comm.template != undefined && comm.param != undefined ){
                $(e.target).closest(".navList").find("> li").removeClass("on");
                $(e.target).closest("li").addClass("on");
                comm.pageLtTxtUpdate(e.target);
                comm.dataTemplt(comm.template, comm.param);
            };
        });

        // page list 이벤트
        $(".cvLnb .subList > li > button").unbind("click").bind("click", function(e){
            comm.param = $(e.target).data("info");
            if( $(e.target).closest("li").hasClass("on") == false && comm.param != undefined ){
                $(e.target).closest(".navList").find(".subList > li").removeClass("on");
                $(e.target).closest("li").addClass("on");
                comm.pageLtTxtUpdate(e.target);
                comm.dataTemplt("./guide/resource/template/pageList/template_page_list.html", comm.param);
            };
        });
    },
    pageLtTxtUpdate : function(e){
        // 추후 수정예정
        var crumbTxt1 = "";
        var crumbTxt2 = "";
        if( $(".cvGuide.search .navList.rdo").length > 0 ){
            crumbTxt1 = $(e).closest("li").find("> label.tit").text();
        }else{
            crumbTxt1 = $(e).closest(".part").find("> button.tit").html().split('<')[0];
        };

        if( $(e).closest(".subList").length > 0 ) crumbTxt2 = " > " + $(e).closest(".subList").find("> li.on > button").text();
        
        $(".content > .top > h3").html(
            $(".cvLnb .nav h2").text()
            + " > "
            + crumbTxt1
            + crumbTxt2
        );
    },
    progressData : function(e){
        if( $(".content .page_list .progress .graph").attr("style") != undefined ){
            $(".content .page_list .progress .graph").removeAttr("style");
            $(".content .page_list .progress .count_wrap .count > em").text(0);
        };

        return ($("cvGuideli.on .menu_list").length > 0) ? (($(".content .page_list tbody tr.finish").length/$(".content .page_list tbody tr").length)*100).toFixed(1) : 100;
    },
    countState : function(e){
        $('.cvGuide .content .count').each(function(idx, item){
            let val = 0;
            if( $(".page_summary").length > 0 && val != null ){
                val = ((comm.finishNum[idx]/comm.totalNum[idx])*100).toFixed(1);
            }else if( $(".page_list").length > 0 ){
                val = comm.progressData();
            };
            
            let valChk = Math.ceil(val);
			let num = 0;
			let time = (100/val); // 동일한 카운팅 시간 설정
            
			var cntNum = setInterval(function(){
                num++;
                $(item).find("> em").text(num);
                $(item).closest(".progress").find(".graph").css({
                    "width": num+"%"
                });

                if(num == valChk){
                    $(item).find("> em").text(val); // 최종결과 값
                    clearInterval(cntNum);
                    if(num == 100){
                        $(item).find("> em").text(parseInt(val));
                        $(item).find("> em").addClass("finish");
                    };
                };
            }, time*10);
		});
    },
    guideCustom : function(){
        for( var i=0; i<$(".cvGuide_area").length; i++ ){
            $(".cvGuide_area:eq("+i+") .code_view .code xmp").html($(".cvGuide_area:eq("+i+") .cvGuide_view .code").html());
        };
    },
    copyTo : function(){
        comm.guideCustom();
        $(".cvGuide_area .btn_copy").unbind("click").bind("click", function(e){
            var val = $(e.target).closest(".cvGuide_area").find(".cvGuide_view .code").html();
            var dataTag = document.createElement("textarea");
            dataTag.className = "copyVal";
            document.body.append(dataTag);
            dataTag.value = val;
            dataTag.select();
            if( document.execCommand('copy') ){
                $("body.cvGuide .content").append('<div class="pop_alert"><p>복사되었습니다!</p></div>');
                $(".pop_alert").fadeOut(3000, function(){
                    $(this).remove();
                });
            };
            $(".copyVal").remove();
        });  
    },
    dashBoard : function(){
        $.ajax({
            url: "./guide/resource/menu/category/ctg_page_list.json"+"?"+Math.round(100000*Math.random()),
            type: "get",
            dataType : "json",
            async : false,
            cache : false,
            success: function(data){
                const listData = data["root_comment"];
                // console.log('통신 성공',  listData);
                comm.dataArray = [];
                let dataGroup0 = [];
                let dataGroup1 = [];
                $.each(listData, function(idx, item){
                    if(listData != null){ // data 있을 때
                        for( var i=0; i<listData[idx].menu.length; i++ ){
                            if( idx == 0 ){
                                dataGroup0.push( listData[idx].menu[i].data_info );
                            }else if( idx == 1 ){
                                dataGroup1.push( listData[idx].menu[i].data_info );
                            };
                        };                
                    }else{
                        alert("재로딩");
                    };
                });          
                comm.dataArray = [dataGroup0, dataGroup1]
            },
            error: function(){
                $(".content .cont").empty();
                $(".content .cont").append(
                    '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                );
            },
            complete: function(){
                let join0 = [];
                let join1 = [];
                if(comm.dataArray != null && comm.dataArray.length > 0 && comm.dataArrayFnsh.length == 0){ // data check
                    $.each(comm.dataArray, function(idx, item){
                        for( var i=0; i<item.length; i++ ){
                            $.ajax({
                                url: item[i]+"?"+Math.round(100000*Math.random()),
                                type: "get",
                                dataType : "json",
                                async : false,
                                cache : false,
                                success: function(data){
                                    let listData = data["root_comment"];
                                    for( var j=0; j<listData.length; j++ ){
                                        if( idx == 0 ){
                                            join0.push(listData[j].finish);
                                        }else if( idx == 1 ){
                                            join1.push(listData[j].finish);
                                        };
                                    };
                                    
                                    comm.dataArrayFnsh = [join0, join1];
                                },
                                error: function(){
                                    $(".content .cont").empty();
                                    $(".content .cont").append(
                                        '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                                    );
                                }
                            });
                        };
                    });                
                };
            }
        });
    },
    ratio : function(){
        if(comm.dataArray != null && comm.dataArray.length == 0){
            comm.dashBoard();
        };
        console.log( comm.dataArray );
        // 배열에서 "true" 개수 구하기
        for( var i=0; i<comm.dataArrayFnsh.length; i++ ){
            comm.finishNum.push(comm.dataArrayFnsh[i].reduce((cnt, element) => cnt + (true === element), 0));
            comm.totalNum.push(comm.dataArrayFnsh[i].length);
            
            // 데이터 삽입 - pc/mo 진척률
            $(".dashboard_area .inner > [class^='total_']:eq("+i+") .summary .num > em").text(comm.finishNum[i]);
            $(".dashboard_area .inner > [class^='total_']:eq("+i+") .summary .num .total_num").text(comm.totalNum[i]);
        };

        // 막대그래프 높이
        let totalData0 = 0;
        let totalData1 = 0;
        
        clearTimeout(comm.time);
        comm.time = setTimeout(function(){
            for( var i=0; i<comm.dataArrayFnsh.length; i++ ){
                $(".dashboard_area .inner > [class^='total_']:eq("+i+") .graph .state").animate({
                    height: ((comm.finishNum[i]/comm.totalNum[i])*100).toFixed(1)+"%",
                    opacity: 1
                }, 1400);
                totalData0 += comm.finishNum[i];
                totalData1 += comm.totalNum[i];
            };
            
            // 데이터 삽입 - 전체 진척률
            $(".dashboard_area .total .summary .num > em").text(totalData0);
            $(".dashboard_area .total .summary .num .total_num").text(totalData1);
            
            $(".dashboard_area .inner > .total .graph .state").animate({
                height: ((totalData0/totalData1)*100).toFixed(1)+"%",
                opacity: 1
            }, 1400);

            // 데이터 삽입 - 전체 진척률
            comm.countState();

            // // 전체 진척률 (추후 수정)
            function totalRatio(){
                let val = totalData0/totalData1*100;
                var valChk = Math.ceil(val);
                var num = 0;
                var time = (100/val); // 동일한 카운팅 시간 설정
                var cntNum = setInterval(function(){
                    num++;
                    $('.cvGuide .content .total .total_count').find('> em').text(num);
                    if(num == valChk){
                        $('.cvGuide .content .total .total_count').find('> em').text(val); // 최종결과 값
                        clearInterval(cntNum);
                        if(num == 100){
                            $('.cvGuide .content .total .total_count').find('> em').text(parseInt(val));
                            $('.cvGuide .content .total .total_count').find('> em').addClass("finish");
                        };
                    };
                }, time*10);
            };
            totalRatio();
        }, 600);

    },
};

// 검색
var search = {
    dataArraySrch : [],
    dataArraySrchMenu : [],
    depCode : "",
    srchDataCall : function(){
        comm.dashBoard(); // 기본 데이터 정보 수집

        let join0 = [];
        let join1 = [];
        if(comm.dataArray != null && comm.dataArray.length > 0 && search.dataArraySrch.length == 0){ // data check
            $.each(comm.dataArray, function(idx, item){
                for( var i=0; i<item.length; i++ ){
                    $.ajax({
                        url: item[i]+"?"+Math.round(100000*Math.random()),
                        type: "get",
                        dataType : "json",
                        async : false,
                        cache : false,
                        success: function(data){
                            let listData = data["root_comment"];
                            for( var j=0; j<listData.length; j++ ){
                                if( idx == 0 ){
                                    join0.push(listData[j]);
                                }else if( idx == 1 ){
                                    join1.push(listData[j]);
                                };
                            };
                            
                            search.dataArraySrch = [join0, join1];
                            // console.log("search", search.dataArraySrch);
                        },
                        error: function(){
                            $(".content .cont").empty();
                            $(".content .cont").append(
                                '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                            );
                        }
                    });
                };
            });
        };
    },
    searchFn : function(srchVal){
        search.srchDataCall(); // 검색 데이터 정보 수집
        
        search.dataArraySrchMenu = [];
        if(search.dataArraySrch != null && search.dataArraySrch.length > 0 && search.dataArraySrchMenu.length == 0){ // data check
            for( var i=0; i<search.dataArraySrch.length; i++ ){
                search.dataArraySrch[i].reduce(function (total, val, idx, array){
                    switch ( $(".navList.rdo input:radio[name=rdo]:checked").val() ){
                        case "menu":
                            // 메뉴명 검색
                            // if( val.depth1 == srchVal || val.depth2 == srchVal || val.depth3 == srchVal || val.depth4 == srchVal ){ // 정확한 글자수 체크
                            // console.log(`find val.depth1 : "${srchVal}" find index : "${srchVal}" result number : ${val.depth1.indexOf(srchVal)}`);
                            if( val.depth1.match(srchVal) == srchVal || val.depth2.match(srchVal) == srchVal || val.depth3.match(srchVal) == srchVal || val.depth4.match(srchVal) == srchVal ){ // 두 글자 이상 텍스트 체크
                                return search.dataArraySrchMenu.push( val );
                            };
                            break;
                        case "id":
                            // 화면id 검색
                            if( val.pageId == srchVal ){
                                return search.dataArraySrchMenu.push( val );
                            };
                            break;
                        case "text":
                            // 텍스트 검색
                            $.ajax({
                                url: val.link,
                                type: "get",
                                dataType : "html",
                                async : false,
                                cache : false,
                                success: function(data){
                                    if( data.search(srchVal) > -1 ){
                                        search.dataArraySrchMenu.push(val);
                                    };
                                },
                                error: function(){
                                    console.log("json data error : ", val);
                                },
                            });
                            break;
                        case "class":
                            // class 검색
                            $.ajax({
                                url: val.link,
                                type: "get",
                                dataType : "html",
                                async : false,
                                cache : false,
                                success: function(data){       
                                    if( $(".dataTag").length == 0 ){
                                        var dataTag = document.createElement("div");
                                        dataTag.className = "dataTag";
                                        document.body.append(dataTag);
                                    };
                                    
                                    $(".dataTag").html( $(data).children() );
                                },
                                error: function(){
                                    console.log("json data error : ", val);
                                },
                                complete: function(){
                                    if( $(".dataTag " + srchVal).length > 0 ){
                                        search.dataArraySrchMenu.push(val);
                                    };
                                    $(".dataTag").html("");
                                },
                            });
                    };
                }, 0);
            };
            
            if( search.dataArraySrchMenu.length == 0 ){
                $(".content .page_list > table tbody").html('<tr><td colspan="11"><p class="noData">검색한 데이터를 찾지 못하였습니다.</p></td></tr>');
            }else{
                // page list 삽입
                if( $(".cvGuide.search .cont .page_list").length > 0 ){
                    $.each(search.dataArraySrchMenu, function(idx, item){
                        if(search.depCode != null && search.dataArraySrchMenu != null){ // html && data 있을 때
                            $(".content .cont .page_list tbody").append(search.depCode);
                            console.log(item.depth1);
                            // 링크
                            $(".page_list tbody tr").eq(idx).find("td.link > a").attr({
                                'href':item.link
                            });
                            
                            // text 삽입
                            $(".page_list tbody tr").eq(idx).find("td.no").append(
                                idx+1
                            );
                            $(".page_list tbody tr").eq(idx).find("td.depth_1").append(
                                item.depth1
                            );
                            $(".page_list tbody tr").eq(idx).find("td.depth_2").append(
                                item.depth2
                            );
                            $(".page_list tbody tr").eq(idx).find("td.depth_3").append(
                                item.depth3
                            );
                            $(".page_list tbody tr").eq(idx).find("td.depth_4").append(
                                item.depth4
                            );
                            $(".page_list tbody tr").eq(idx).find("td.chk").append(
                                item.check.toUpperCase()
                            );
                            $(".page_list tbody tr").eq(idx).find("td.complete").append(
                                item.complete
                            );
                            $(".page_list tbody tr").eq(idx).find("td.modify").append(
                                item.modify
                            );
                            $(".page_list tbody tr").eq(idx).find("td.pageID").append(
                                item.pageId
                            );
                            $(".page_list tbody tr").eq(idx).find("td.comment").append(
                                item.comment
                            );
                            
                            // // 완료 페이지 여부
                            if( item.finish == true ){
                                $(".page_list tbody tr").eq(idx).addClass("finish");
                            }else{
                                $(".page_list tbody tr").eq(idx).addClass("ing");
                            };
                        };
                    });                    
                };
            };

            setTimeout(comm.countState, 100);
            
            $(".srch_wrap button.btn_srch").attr("disabled", false);
        };
    },
};

// 아코디언
var acco = {
	accoOverIn : function(target){ // over
		$(target).addClass("on");
		// $(target).find("> .blind").text("접기");
		$(target).find(".body").stop().slideDown({
			duration: 200
		});
	},
	accoOverOut : function(target){
        $(target).closest(".acco").find("li").removeClass("on");
        // $(target).find("> .blind").text("펼치기");
        $(target).closest(".acco").find("li .body").stop().slideUp(200);
	},
	accoClick : function(target, callback){ // click
		if( $(target).closest(".part").find(".body").length > 0 ){ // 소카테고리 있을때만
			if( $(target).closest(".acco.single").length > 0){ // 한개씩
				if( $(target).closest(".part.on").length > 0 ){ // 펼침상태
					$(target).closest(".part.on").removeClass("on");
					$(target).find("> .blind").text("펼치기");
					$(target).closest(".part").find(".body").stop().slideUp(200);
				}else{
                    $(target).closest(".acco").find("> .part").removeClass("on");
                    $(target).closest(".part").addClass("on");
                    $(target).closest(".acco").find("> .part .tit .blind").text("펼치기");
                    $(target).find("> .blind").text("접기");
                    $(target).closest(".acco").find("> .part .body").stop().slideUp(200);
                    $(target).closest(".part").find(".body").stop().slideDown({
                        duration: 200
                    });
				};
			}else{
                if( $(target).closest(".part.on").length > 0 ){
                    $(target).closest(".part").removeClass("on");
					$(target).find("> .blind").text("펼치기");
					$(target).closest(".part").find(".body").stop().slideUp(200);
				}else{
                    $(target).closest(".part").addClass("on");
                    $(target).closest(".acco").find("> .part .tit .blind").text("펼치기");
					$(target).find("> .blind").text("접기");
					$(target).closest(".part").find(".body").stop().slideDown({
                        duration: 200
					});
				};
                // callback 처리
                if(callback != null){
                    callback(target);
                };
			};
		};
	}
};

// 배경
function switchMode(){
    $('.cvUtil .btn_switch input').bind('click', function(){
        if ($('.btn_switch input').is(':checked')){
            $('body.cvGuide').addClass('dark');
            $('header .logo img').attr('src', './guide/inc/img/logo.png');
        }else{
            $('body.cvGuide').removeClass('dark');
            $('header .logo img').attr('src', './guide/inc/img/logo_red.png');
        };
    })
};