$(document).ready(function(){
    comm.switchMode(); // 배경

    comm.iptTexDel(); // 배경
    
    // 검색
    if($("body.cvGuide.search").length > 0){
        search.depCode = $(".cvContent .cont .page_list tbody").html();
        $(".cvGuide.search .cont .page_list tbody").empty(); // 마크업 삭제

        search.srchCtgSet();
        comm.ctgTxtUpdate($(".navList.rdo input:radio[name=rdo]:checked"));
        comm.ctgEvnUpdate();

        $(".srch_wrap .cvBtn_srch").unbind("click").bind("click", function(e){
            $(".cvGuide.search .cont .page_list tbody").empty(); // 마크업 삭제

            let srchVal = $(".srch_wrap .ipt_wrap input.ipt").val();
            if( srchVal !== "" ){
                if( srchVal.length < 2 ){
                    alert("두 글자 이상 입력해 주세요.");
                }else{
                    $(".srch_wrap button.cvBtn_srch").attr("disabled", true);
                    search.searchFn(srchVal);
                };
            }else{
                alert("검색어를 입력해주세요.");
            };
        });
    };
    
    // summary, guide, pagelist
    if($("body.cvGuide.search").length == 0){
        // 검색 url 이동
		search.srchPath();
        
        // 메뉴 데이터 호출
        comm.ctgCode = $(".cvLnb .navList").html();
        comm.ctgDepCode = $(".cvLnb .navList .subList").html();
        
        // 로드시 ajax 호출
        switch(comm.getParameterName("client")){
            case "summary":
                // 1번째 summary
                $(".cvGnb > ul > li").removeClass("on");
                $(".cvGnb li button.menu_summary").closest("li").addClass("on");

                comm.ctgTemplt(comm.ctgParam);
                comm.dataTemplt(comm.gnbTemplt, comm.dataParam);
                comm.ctgTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
                comm.ctgEvnUpdate(); // 로드시 컨텐츠 update 호출
                break;
            case "guide":
                // 2번째 guide
                $(".cvGnb > ul > li").removeClass("on");
                $(".cvGnb li button.menu_guide").closest("li").addClass("on");

                comm.ctgParam = "./guide/resource/menu/category/ctg_guide.json";
                comm.gnbTemplt = "./guide/resource/template/guide/guide_template.html";
                comm.ctgTemplt(comm.ctgParam);
                
                if(comm.getParameterName("index") !== ""){
                    comm.dataParam = $(".cvLnb .nav > ul > li:eq("+comm.getParameterName("index").split('_')[0]+") .subList > li:eq("+comm.getParameterName("index").split('_')[1]+") > button").data("info");
                    comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq("+comm.getParameterName("index").split('_')[0]+") .subList > li:eq("+comm.getParameterName("index").split('_')[1]+") > button"); // 화면 처음 들어올때
                }else{
                    comm.dataParam = $(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button").data("info");
                    comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button"); // 화면 처음 들어올때
                };

                comm.dataTemplt(comm.gnbTemplt, comm.dataParam);
                
                comm.ctgEvnUpdate(); // 로드시 컨텐츠 update 호출
                break;
            case "pageList":
            case "pageList2": // 2번째 page list
            case "pageList3": // 3번째 page list
                // 3번째 page list
                $(".cvGnb > ul > li").removeClass("on");

                if( comm.getParameterName("client") == "pageList" ){
                    $(".cvGnb li button.menu_list").closest("li").eq(0).addClass("on");
                    comm.ctgParam = "./guide/resource/menu/category/ctg_page_list1.json";
                }else if( comm.getParameterName("client") == "pageList2" ){
                    $(".cvGnb li button.menu_list").closest("li").eq(1).addClass("on");
                    comm.ctgParam = "./guide/resource/menu/category/ctg_page_list2.json";
                }else if( comm.getParameterName("client") == "pageList3" ){
                    $(".cvGnb li button.menu_list").closest("li").eq(2).addClass("on");
                    comm.ctgParam = "./guide/resource/menu/category/ctg_page_list3.json";
                };

                comm.gnbTemplt = "./guide/resource/template/pageList/template_page_list.html";
                comm.ctgTemplt(comm.ctgParam);
                
                if(comm.getParameterName("index") !== ""){
                    comm.dataParam = $(".cvLnb .nav > ul > li:eq("+comm.getParameterName("index").split('_')[0]+") .subList > li:eq("+comm.getParameterName("index").split('_')[1]+") > button").data("info");
                    comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq("+comm.getParameterName("index").split('_')[0]+") .subList > li:eq("+comm.getParameterName("index").split('_')[1]+") > button"); // 화면 처음 들어올때
                }else{
                    comm.dataParam = $(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button").data("info");
                    comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button"); // 화면 처음 들어올때
                };
                
                comm.dataTemplt(comm.gnbTemplt, comm.dataParam);
                
                comm.ctgEvnUpdate(); // 로드시 컨텐츠 update 호출
                break;
            default :
                // 기본
                comm.ctgTemplt(comm.ctgParam);
                comm.dataTemplt(comm.gnbTemplt, comm.dataParam);
                comm.ctgTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
                comm.ctgEvnUpdate(); // 로드시 컨텐츠 update 호출
        };

        // click 이벤트 gnb ajax 호출
        $(".cvGnb li > button[class^=menu_]").unbind("click").bind("click", function(e){
            // console.log($(e.target).attr("class") !== $(".cvGnb li.on > button[class^=menu_]").attr("class"));
            if( $(e.target).attr("class") !== $(".cvGnb li.on > button[class^=menu_]").attr("class") ){
                var param = $(e.target).attr("class");
                
                $(".cvGnb > ul > li").removeClass("on");
                $(e.target).closest("li").addClass("on");
                switch(param){
                    case "menu_summary":
                        // 1번째 summary
                        // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=summary";
                        history.pushState(null, "", "?client=summary");

                        comm.ctgParam = "./guide/resource/menu/category/ctg_summary.json";
                        comm.gnbTemplt = "./guide/resource/template/summary/template_summary.html";
                        comm.ctgTemplt(comm.ctgParam);

                        comm.dataParam = "./guide/resource/template/summary/template_dashboard.html";
                        comm.dataTemplt(comm.gnbTemplt, comm.dataParam);
                        
                        comm.ctgTxtUpdate(".cvLnb .nav > ul > li.on > button"); // 화면 처음 들어올때
                        comm.ctgEvnUpdate(); // page update 호출
                        break;
                    case "menu_guide":
                        // 2번째 guide
                        // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=guide";
                        history.pushState(null, "", "?client=guide");

                        comm.ctgParam = "./guide/resource/menu/category/ctg_guide.json";
                        comm.gnbTemplt = "./guide/resource/template/guide/guide_template.html";
                        comm.ctgTemplt(comm.ctgParam);
                        
                        comm.dataParam = $(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button").data("info");
                        comm.dataTemplt(comm.gnbTemplt, comm.dataParam);

                        comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button"); // 화면 처음 들어올때
                        comm.ctgEvnUpdate(); // page update 호출
                        break;
                    case "menu_list":
                    case "menu_list list2": // 2번째 page list
                    case "menu_list list3": // 3번째 page list
                        // 3번째 page list
                        if( $(".cvGnb li [id^='list_']").length > 1 ){ // page list가 2개 이상 부터
                            if( $(e.target).attr("id").split('_').pop() == 1 ){ // page list 1개
                                // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=pageList";
                                history.pushState(null, "", "?client=pageList");
                                comm.ctgParam = "./guide/resource/menu/category/ctg_page_list1.json";
                            }else if( $(e.target).attr("id").split('_').pop() == 2 ){ // page list 2개
                                // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=pageList2";
                                history.pushState(null, "", "?client=pageList2");
                                comm.ctgParam = "./guide/resource/menu/category/ctg_page_list2.json";
                            }else if( $(e.target).attr("id").split('_').pop() == 3 ){ // page list 3개
                                // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=pageList3";
                                history.pushState(null, "", "?client=pageList3");
                                comm.ctgParam = "./guide/resource/menu/category/ctg_page_list3.json";
                            };
                        }else{ // page list 1개
                            // if( comm.getParameterName("client") !== "single" ) window.location.search = "?client=pageList";
                            history.pushState(null, "", "?client=pageList");
                            comm.ctgParam = "./guide/resource/menu/category/ctg_page_list1.json";
                        };
                          
                        comm.gnbTemplt = "./guide/resource/template/pageList/template_page_list.html";
                        comm.ctgTemplt(comm.ctgParam);

                        comm.dataParam = $(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button").data("info");
                        comm.dataTemplt(comm.gnbTemplt, comm.dataParam);

                        comm.ctgTxtUpdate(".cvLnb .nav > ul > li:eq(0) .subList > li.on > button"); // 화면 처음 들어올때
                        comm.ctgEvnUpdate(); // page update 호출
                };
            };
        });
    };
});

// 공통 template/data 함수
var comm = {
    ctgParam : "./guide/resource/menu/category/ctg_summary.json", // 디폴트
    gnbTemplt : "./guide/resource/template/summary/template_summary.html", // 디폴트
    dataParam : "./guide/resource/template/summary/template_dashboard.html", // 디폴트
    ctgCode : "",
    ctgDepCode : "",
    template : null, // template 디폴트
    param : null, // data 디폴트
    dataArray : [], // 전체 메뉴 data 수집
    dataArrayFnsh : [], // 전체 메뉴 완료 data 수집
	time : null, // setTimeout
    totalNum : [], // 전체 페이지 개수
    finishNum : [], // 완료 페이지 개수
    ctgDataTag : [], // 카테고리 tag 저장
    ctgTemplt : function(ctgParam){ // category
        $.ajax({
            url: ctgParam+"?"+Math.round(100000*Math.random()),
            type: "get",
            dataType : "json",
            async : false,
            cache : false,
            success: function(data){
                const infoData = data["root_comment"];
                let ctgIdx = 0;
                // console.log('통신 성공', infoData);
                
                $(".cvLnb .nav > h2").text($(".cvGnb li.on").text());

                $(".cvLnb .navList").empty(); // 마크업 삭제
                
                if( comm.ctgDataTag.length == 0 ){
                    for(let i=0; i<$(".cvGnb li .menu_list").length; i++){
                        comm.ctgDataTag.splice(0, 0, "");
                    };
                };
                if( $(".cvGnb li.on .menu_list").length > 0 ){
                    ctgIdx = ($(".cvGnb li.on .menu_list").attr('id').split('_').pop())-1;
                };

                if(comm.ctgDataTag[ctgIdx].length == 0 || ctgParam.indexOf("/category/ctg_page_list") == -1){ // page list 접속이 처음 또는 page list 외 접속할 때
                    // $.each(infoData, function(idx, item){
                    infoData.forEach(function(item, idx){
                        if(comm.ctgCode !== "" && comm.ctgDepCode !== "" && infoData != null){ // html && data 있을 때
                            $(".cvLnb .navList").append(comm.ctgCode);
                            $(".cvLnb .navList > li").eq(idx).find(".subList").empty();
                            
                            // text 삽입
                            $(".cvLnb .navList > li").eq(idx).find("button.tit").append(
                                infoData[idx].title
                            );
                            if( infoData[idx].active != undefined && infoData[idx].data_info != undefined ){
                                // class 추가
                                if( infoData[idx].active == true ){
                                    $(".cvLnb .navList > li").removeClass("on");
                                    $(".cvLnb .navList > li:eq("+idx+")").addClass("on");
                                };
                                // attr 추가
                                $(".cvLnb .navList > li").eq(idx).find("button.tit").attr({
                                    "data-info": infoData[idx].data_info,
                                    "title": infoData[idx].title+" 메뉴 보기"
                                });
                            };
                            
                            // 서브메뉴가 있을 때 실행
                            if( infoData[idx].menu != null && infoData[idx].menu.length > 0 ){
                                // 중카 on class 추가
                                if( infoData[idx].active == true ){
                                    $(".cvLnb .navList > li:eq("+idx+")").addClass("on");
                                };
                                
                                for(let i=0; i<infoData[idx].menu.length; i++){
                                    $(".cvLnb .navList > li:eq("+idx+")").find(".subList").append(comm.ctgDepCode);
                                    // console.log("UI Data", $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")"));
    
                                    // class 추가                                    
                                    if( infoData[idx].menu[i].active == true && comm.getParameterName("index") === "" ){
                                        $(".cvLnb .navList > li").find(".subList > li").removeClass("on");
                                        $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li").eq(i).addClass("on");
                                    };

                                    // attr 추가
                                    $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")").find("> button").attr({
                                        "data-info": infoData[idx].menu[i].data_info,
                                        "title": infoData[idx].menu[i].so_menu+" 메뉴 보기"
                                    });                                    
                                    // text 삽입
                                    $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+")").find("> button").append(
                                        infoData[idx].menu[i].so_menu
                                    );

                                    // guide 작업 진행 사항
                                    if($(".cvGnb li.on .menu_guide").length > 0){
                                        $(".cvLnb .navList > li:eq("+idx+")").find(".subList > li:eq("+i+") .progressInfo").text(function(idx, current){
                                            if(infoData[idx].menu[i].working == "N"){
                                                return "작업중"
                                            }else{
                                                return null;
                                            };
                                        });
                                    };
                                };
                            }else{
                                $(".subList").remove();
                            };
                        }else{
                            console.log("Category Page List 외 호출");
                        };
                    });
                    // class 추가
                    if( comm.getParameterName("index") !== "" ){
                        $(".cvLnb .navList > li").find(".subList > li").removeClass("on");
                        $(".cvLnb .navList > li:eq("+comm.getParameterName("index").split('_')[0]+")").find(".subList > li").eq(comm.getParameterName("index").split('_')[1]).addClass("on");
                    };
                    // });
                };

                // 메뉴 활성화 하지 않을 경우 디폴트 첫 번째 메뉴 활성화
                if( $(".cvLnb .navList > li").find(".subList > li.on").length == 0 ){
                    $(".cvLnb .navList > li:eq(0)").find(".subList > li").eq(0).addClass("on");
                };

                // pagelist 탭 카테고리에서 각 메뉴 데이터 호출
                if($(".cvGnb li.on .menu_list").length > 0 && comm.dataArray != null && comm.dataArray.length == 0){
                    comm.dataCall();
                };
				// pagelist 탭 카테고리에서 각 메뉴 진척률 가져오기
                if($(".cvGnb li.on .menu_list").length > 0 && comm.dataArray != null && comm.dataArray.length > 0){                  
                    if(comm.ctgDataTag[ctgIdx] != null && comm.ctgDataTag[ctgIdx].length > 0){
                        $(".cvContainer .cvLnb .nav > ul").html(comm.ctgDataTag[ctgIdx]);
                        return false;
                    };
                    
                    // $.each(comm.dataArray[ctgIdx], function(idx, item){
                    comm.dataArray[ctgIdx].forEach(function(item, idx){
                        for(let i=0; i<item.length; i++){
                            $.ajax({
                                url: item[i]+"?"+Math.round(100000*Math.random()),
                                type: "get",
                                dataType : "json",
                                async : false,
                                cache : false,
                                success: function(data){
                                    const infoData = data["root_comment"];
                                    let cnt = 0;
                                    for(let j=0; j<infoData.length; j++){
                                        cnt += infoData[j].finish;
                                        // console.log(infoData, "메뉴별 완료 개수");
                                    };
                                    
                                    $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.num > .total_num").text(infoData.length);
                                    $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.num > em").html(cnt);
                                    $(".cvLnb .nav > ul > li:eq("+idx+") > .subList > li:eq("+i+")").find("span.count > em").html(((cnt/infoData.length)*100).toFixed(1));
                                },
                                error: function(){
                                    $(".cvLnb").append(
                                        '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                                    );
                                }
                            });
                        };
                    });
                    // });
                    comm.ctgDataTag[ctgIdx] = $(".cvLnb .navList").html();
                };
            },
            error: function(){
                $(".cvContent .cont").empty();
                $(".cvContent .cont").append(
                    '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경 또는 리소스 여부 다시 확인하여 주십시오.</p>'
                );
            },
            complete: function(){
                // 카테고리 아코디언 click 이벤트
                if( $(".cvLnb .nav .subList").length > 0 ){
                    acco.accoInit();
                };
            }
        });
    },
    dataTemplt : function(gnbTemplt, dataParam){ // template
        if( $(".cvGnb li.on .menu_guide").length > 0 && $(".cvLnb .nav .subList > li.on > button").closest(".part").find("> .tit").text().toLowerCase().indexOf("mo guide") > -1 ){  // mo type
            gnbTemplt = "./guide/resource/template/guide/guide_template_mo.html";
        };
        
        $(".cvContent .cont").load(gnbTemplt, function(e){
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
                                const infoData = data["root_comment"];
                                
                                // page list type
                                if( $(".cvContent .cont .page_list tbody").length > 0 ){
                                    var depCode = $(".cvContent .cont .page_list tbody").html();
                                    // console.log('통신 성공', infoData, code, depCode);
                                    $(".cvContent .cont .page_list tbody").empty(); // 마크업 삭제
                                    
                                    // $.each(infoData, function(idx, item){
                                    infoData.forEach(function(item, idx){
                                        // console.log('통신 성공', item, idx);
                                        if(code != null && depCode != null && infoData != null){ // html && data 있을 때
                                            $(".cvContent .cont .page_list tbody").append(depCode);
                                            // console.log("UI Data", infoData[idx].link, $(".page_list tbody tr").eq(idx));
                                            
                                            // 링크
                                            $(".page_list tbody tr").eq(idx).find("td.link > a").attr({
                                                'href':infoData[idx].link
                                            });
                                            
                                            // text 삽입
                                            $(".page_list tbody tr").eq(idx).find("td.no").append(
                                                idx+1
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_1").append(
                                                infoData[idx].depth1
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_2").append(
                                                infoData[idx].depth2
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_3").append(
                                                infoData[idx].depth3
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.depth_4").append(
                                                infoData[idx].depth4
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.chk").append(
                                                infoData[idx].check.toUpperCase()
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.complete").append(
                                                infoData[idx].complete
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.modify").append(
                                                infoData[idx].modify
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.pageID").append(
                                                infoData[idx].pageId
                                            );
                                            $(".page_list tbody tr").eq(idx).find("td.comment").append(
                                                infoData[idx].comment
                                            );
                                            
                                            // 완료 페이지 여부
                                            if( infoData[idx].finish == true ){
                                                $(".page_list tbody tr").eq(idx).addClass("finish");
                                            }else{
                                                $(".page_list tbody tr").eq(idx).addClass("ing");
                                            };
                                        };
                                    });
                                    // });
                                    
                                    comm.pageLtMerge();

                                    clearTimeout(comm.time);
                                    comm.time = setTimeout(comm.countState, 600);
                                };
                                
                                break;
                            case "html":
                                // html type
                                if( $(".cvContent .cont .page_summary").length > 0 ){ // summary type
                                    // console.log('통신 성공', code);                
                                    $(".cvContent .cont .page_summary").empty(); // 마크업 삭제
                                    
                                    if(code != null && data != null && data != ""){ // html && data 있을 때
                                        $(".cvContent .cont .page_summary").html(data);

                                        if( $(".cvGnb li .menu_list").length > 1 ){ // 채널 2개 이상부터 for문 실행
                                            const dashTag = $(".dashboard_area").html();
                                            $(".dashboard_area .section").remove(); 
                                            for(let i=0; i<$(".cvGnb li .menu_list").length; i++){
                                                $(".dashboard_area").append(dashTag);
                                                $(".dashboard_area .section:eq("+i+") .tit").text( $(".cvGnb li .menu_list#list_"+(i+1)).text()+" 진척률" );
                                            };
                                        };

                                        // dashboard 호출
                                        if( $(".dashboard_area").length > 0 ){
                                            comm.ratio();
                                        };
                                        // description 호출
                                        if( $(".desc_area").length > 0 ){
                                            comm.copyTo();
                                        };
                                    };
                                }else if( $(".cvContent .cont .page_guide").length > 0 ){ // guide type
                                    $(".cvContent .cont .page_guide .guide_wrap").empty(); // 마크업 삭제
                                    
                                    if(code != null && data != null && data != ""){ // html && data 있을 때
                                        $(".cvContent .cont .page_guide .guide_wrap").html($(data).children());
                                        comm.copyTo(); // 추후 가이드 완료 후 위치 수정예정
                                    };
                                };
                        };
                    },
                    error: function(){
                        $(".cvContent .cont").empty();
                        $(".cvContent .cont").append(
                            '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경 또는 리소스 여부를 다시 확인하여 주십시오.</p>'
                        );
                    },
                    complete: function(){
                        // front ui 호출
                        // ui.init();
                        // guide 소스보기 아코디언 click 이벤트
                        $(".cvGuide_area .code_view .cvBtn_acco").unbind("click").bind("click", function(e){
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
        });
    },
    pageLtMerge : function(){
		var first = true;
		var prevRowspan1 = 1;
		var prevCell1 = null;
		var prevRowspan2 = 1;
		var prevCell2 = null;

		// tr 모두 추출
		var rows = $(".page_list tbody").children();
        // console.log(rows.length);

		for(let i=0; i<rows.length; i++){
			// first row
			if(first == true){
				prevRow = rows[i];
				prevCell1 = $(prevRow).find("td").eq(1); // td depth_1
				prevCell2 = $(prevRow).find("td").eq(2); // td depth_2

				first = false;
				continue;
			};
			var row = rows[i]; // row
			var tdList = $(row).find("td"); // row > td 리스트

			var firstCell = $(tdList).eq(1); // td depth_1
			var secondCell = $(tdList).eq(2); // td depth_2

			var firstCellText = $(firstCell).text();
			var secondCellText = $(secondCell).text();

			// 두 번째 row 부터 텍스트 비교
			if(prevCell1.text() == firstCellText){ // 1번째 값 비교
				if(prevCell2.text() == secondCellText){ // 2번째 값 비교
					prevRowspan2++; // 중복되는 값이 있으므로 rowspan +1
					$(prevCell2).attr("rowspan", prevRowspan2); // 첫 번째 row의 두 번째 cell에 rowspan 추가
					$(secondCell).remove(); // 중복 cell element 삭제
                    $(prevCell2).addClass("dep2");

                    $(prevCell2).closest("tr").addClass("merge_2");
				}else{
					prevRowspan2 = 1;
					prevCell2 = secondCell;
				};
				prevRowspan1++;
				$(prevCell1).attr("rowspan", prevRowspan1);
				$(firstCell).remove();
                $(prevCell1).addClass("dep1");
                $(prevCell1).closest("tr").addClass("merge_1");
			}else{
				prevRowspan1 = 1;
				prevRowspan2 = 1;
				prevCell1 = firstCell;
				prevCell2 = secondCell;
			};
		};

        $(".page_list tbody td").bind({
            "mouseenter" : function(e){
                // console.log( ($(e.target).parents("tr").index()+1)-($(e.target).parents("tr").prevAll(".merge_1").eq(0).index()) <= $(e.target).parents("tr").prevAll(".merge_1").eq(0).find(".dep1").attr("rowspan") );
                // console.log( $(e.target).parents("tr.merge_1"), "sdfsdsdf" )
                if( $(e.target).parents("tr.merge_1").length === 0 && ($(e.target).parents("tr").index()+1) - ($(e.target).parents("tr").prevAll(".merge_1").eq(0).index()) <= $(e.target).parents("tr").prevAll(".merge_1").eq(0).find(".dep1").attr("rowspan") ){
                    $(e.target).parents("tr").prevAll(".merge_1").eq(0).find(".dep1").addClass("hover");
                    if( $(e.target).parents("tr.merge_2").length === 0 && ($(e.target).parents("tr").index()+1) - ($(e.target).parents("tr").prevAll(".merge_2").eq(0).index()) <= $(e.target).parents("tr").prevAll(".merge_2").eq(0).find(".dep2").attr("rowspan") ){
                        $(e.target).parents("tr").prevAll(".merge_2").eq(0).find(".dep2").addClass("hover");
                    };
                };
                $(e.target).closest("tr").find("td").addClass("hover");
            },
            "mouseleave" : function(e){
                $(".page_list tr > td").removeClass("hover");
            }
        });
	},
    ctgEvnUpdate : function(){
        // summary 이벤트
        $(".cvLnb .nav > ul > li > button.tit:not(.cvBtn_acco)").unbind("click").bind("click", function(e){
            if( $(".cvGnb li.on").find(".menu_summary").length > 0 ){ // summary type
                comm.template = "./guide/resource/template/summary/template_summary.html";
            };
            
            comm.param = $(e.target).data("info");

            if( $(e.target).closest("li").hasClass("on") == false && comm.template != undefined && comm.param != undefined ){
                $(e.target).closest(".navList").find("> li").removeClass("on");
                $(e.target).closest("li").addClass("on");
                comm.ctgTxtUpdate(e.target);
                comm.dataTemplt(comm.template, comm.param);
            };
        });

        // guide, page list 이벤트
        $(".cvLnb .subList > li > button").unbind("click").bind("click", function(e){
            if( $(e.target).closest("li").hasClass("on") == false ){
                $(e.target).closest(".navList").find(".subList > li").removeClass("on");
                $(e.target).closest("li").addClass("on");
            };

            if( $(".cvGnb li.on").find(".menu_guide").length > 0 ){ // guide type
                comm.template = "./guide/resource/template/guide/guide_template.html";
                history.pushState(null, "", "?client=guide"+"&index="+$(e.target).closest(".part").index()+"_"+$(e.target).closest(".subList").find("> li.on").index());
            }else if( $(".cvGnb li.on").find(".menu_list").length > 0 ){ // page list type
                comm.template = "./guide/resource/template/pageList/template_page_list.html";
                history.pushState(null, "", "?client=pageList"+comm.getParameterName("client").replace(/[^0-9]/g, "")+"&index="+$(e.target).closest(".part").index()+"_"+$(e.target).closest(".subList").find("> li.on").index());
            };
            
            comm.param = $(e.target).data("info");
            
            if( comm.param != undefined ){
                // comm.dataTemplt("./guide/resource/template/pageList/template_page_list.html", comm.param);
                comm.ctgTxtUpdate(e.target);
                comm.dataTemplt(comm.template, comm.param);
            };
        });

        // search 이벤트
        $(".navList.rdo input:radio[name=rdo], .navList.rdo .subList > li input:radio").bind("change", function(e){
            comm.ctgTxtUpdate($(e.target));
        });
    },
    ctgTxtUpdate : function(e){
        // 추후 수정예정
        let crumbTxt1 = "";
        let crumbTxt2 = "";
        
        // crumbTxt1
        if( $(".cvGuide.search .navList.rdo").length > 0 ){ // 검색
            crumbTxt1 = $(e).closest(".part").find("label.tit").text();
        }else if( $(e).length > 0 ){
            crumbTxt1 = $(e).closest(".part").find("> button.tit").html().split('<')[0];
        };

        // crumbTxt2
        if($(".cvGuide.search .navList.rdo").length > 0 &&  $(e).closest(".part").find(".subList").length > 0){
            crumbTxt2 = " > " + $(e).closest(".part").find(".subList > li > input:radio:checked+label").text();
        }else if($(e).closest(".subList").length > 0){
            if( comm.getParameterName("index") !== "" ){
                crumbTxt2 = " > " + $(e).text();
            }else{
                crumbTxt2 = " > " + $(e).closest(".subList").find("> li.on > button").text();
            };
        };
        $(".cvContent > .top > h3").html(
            $(".cvLnb .nav h2").text()
            + " > "
            + crumbTxt1
            + crumbTxt2
        );
    },
    progressData : function(e){
        if( $(".cvContent .page_list .progress .graph").attr("style") != undefined ){
            $(".cvContent .page_list .progress .graph").removeAttr("style");
            $(".cvContent .page_list .progress .count_wrap .count > em").text(0);
        };

        return ($(".cvGnb li.on .menu_list").length > 0) ? (($(".cvContent .page_list tbody tr.finish").length/$(".cvContent .page_list tbody tr").length)*100).toFixed(1) : 100;
    },
    countState : function(e){
        $('.cvGuide .cvContent .count').each(function(idx, item){
            let val = 0;
            if( $(".page_summary").length > 0 && val != null ){
                val = (($(item).closest(".summary").find(".num > em").text()/$(item).closest(".summary").find(".num > .total_num").text())*100).toFixed(1);
            }else if( $(".page_list").length > 0 ){
                val = comm.progressData();
            };
            
            let valChk = Math.ceil(val);
			let num = 0;
			let time = (100/val); // 동일한 카운팅 시간 설정
            
            if(1/time != 0){
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
            };
		});
    },
    copyTo : function(){
        if( $(".page_guide .code_view .code xmp").length > 0 ){
            for(let i=0; i<$(".cvGuide_area").length; i++){
                $(".cvGuide_area:eq("+i+") .code_view .code xmp").html($(".cvGuide_area:eq("+i+") .cvGuide_view .code").html());
            };
        };
        
        $(".cvGuide_area:not(.not) .cvBtn_copy").unbind("click").bind("click", function(e){
            var val = $(e.target).closest(".cvGuide_area").find(".cvGuide_view .code").html();
            var dataTag = document.createElement("textarea");
            dataTag.className = "copyVal";
            document.body.append(dataTag);
            dataTag.value = val;
            dataTag.select();
            if( document.execCommand('copy') ){
                $("body.cvGuide .cvContent").append('<div class="pop_alert"><p>복사되었습니다!</p></div>');
                $(".pop_alert").fadeOut(3000, function(){
                    $(this).remove();
                });
            };
            $(".copyVal").remove();
        });  
    },
    dataCall : function(){
        if($("body.cvGuide.search").length > 0){ // 검색
            comm.dataArray = Array.from({ length: comm.getParameterName("age") }, () => []);
        }else{
            comm.dataArray = Array.from({ length: $(".cvGnb li [class^='menu_list']").length }, () => []);
        };
        console.log("search", comm.dataArray);
        // for( let i=0; i<$(".cvGnb li [class^='menu_list']").length; i++ ){
		for(let i=0; i<comm.dataArray.length; i++){
            $.ajax({
                url: "./guide/resource/menu/category/ctg_page_list"+(i+1)+".json"+"?"+Math.round(100000*Math.random()),
                type: "get",
                dataType : "json",
                async : false,
                cache : false,
                success: function(data){
                    const infoData = data["root_comment"];
                    // console.log('통신 성공',  infoData);
                    let dataGroup0 = [];
                    let dataGroup1 = [];
                    // $.each(infoData, function(idx, item){
                    infoData.forEach(function(item, idx){
                        if(infoData != null){ // data 있을 때
                            for(let j=0; j<infoData[idx].menu.length; j++){
                                if(idx == 0){
                                    dataGroup0.push( infoData[idx].menu[j].data_info );
                                }else if(idx == 1){
                                    dataGroup1.push( infoData[idx].menu[j].data_info );
                                };
                            };                
                        }else{
                            alert("재로딩");
                        };
                    });
                    // });
                    comm.dataArray[i] = [dataGroup0, dataGroup1];
                },
                error: function(){
                    $(".cvContent .cont").empty();
                    $(".cvContent .cont").append(
                        '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                    );
                }
            });
        };
    },
    finishDataCall : function(){
        if(comm.dataArray != null && comm.dataArray.length == 0){
            comm.dataCall();
        };
        
        // dataArrayFnsh data 수집
        if(comm.dataArray != null && comm.dataArray.length > 0 && comm.dataArrayFnsh != null && comm.dataArrayFnsh.length == 0){ // data check
            comm.dataArrayFnsh = Array.from({ length: $(".cvGnb li [class^='menu_list']").length }, () => []);
            
            // $.each(comm.dataArray, function(idx, item){
            comm.dataArray.forEach(function(item, idx){
                let join0 = [];
                let join1 = [];
                for(let i=0; i<item.length; i++){
                    for(let j=0; j<item[i].length; j++){
                        // console.log( item[i][j] );
                        $.ajax({
                            url: item[i][j]+"?"+Math.round(100000*Math.random()),
                            type: "get",
                            dataType : "json",
                            async : false,
                            cache : false,
                            success: function(data){
                                const infoData = data["root_comment"];
                                for(let h=0; h<infoData.length; h++){
                                    if(i == 0){
                                        join0.push(infoData[h].finish);
                                    }else if(i == 1){
                                        join1.push(infoData[h].finish);
                                    };
                                };
                                
                                comm.dataArrayFnsh[idx] = [join0, join1];
                            },
                            error: function(){
                                $(".cvContent .cont").empty();
                                $(".cvContent .cont").append(
                                    '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                                );
                            }
                        });
                    };
                };
            });
            // });
        };
    },
    ratio : function(){
        if((comm.dataArray != null && comm.dataArray.length == 0) || (comm.dataArrayFnsh != null && comm.dataArrayFnsh.length == 0)){
            comm.finishDataCall();
        };
        // 배열에서 "true" 개수 구하기
        comm.finishNum = Array.from({ length: comm.dataArrayFnsh.length }, () => []);
        comm.totalNum = Array.from({ length: comm.dataArrayFnsh.length }, () => []);
        for(let i=0; i<comm.dataArrayFnsh.length; i++){
            for(let j=0; j<comm.dataArrayFnsh[i].length; j++){
                comm.finishNum[i].push(comm.dataArrayFnsh[i][j].reduce((cnt, element) => cnt + (true === element), 0));
                comm.totalNum[i].push(comm.dataArrayFnsh[i][j].length);
                
                // 데이터 삽입 - pc/mo 진척률
                $(".dashboard_area .inner:eq("+i+") > [class^='total_']:eq("+j+") .summary .num > em").text(comm.finishNum[i][j]);
                $(".dashboard_area .inner:eq("+i+") > [class^='total_']:eq("+j+") .summary .num .total_num").text(comm.totalNum[i][j]);
            };
        };

        // 막대그래프 높이        
        clearTimeout(comm.time);
        comm.time = setTimeout(function(){
            comm.countState();

            $(".cvGuide .total .total_count").each(function(idx, item){
                let totalData0 = 0; // 전체 완료 개수
                let totalData1 = 0; // 전체 개수
                for(let i=0; i<comm.dataArrayFnsh[idx].length; i++){
                    if($(".dashboard_area").hasClass('type') === false){
                        $(".dashboard_area .inner:eq("+idx+") > [class^='total_']:eq("+i+") .graph .state").animate({
                            height: ((comm.finishNum[idx][i]/comm.totalNum[idx][i])*100).toFixed(1)+"%",
                            opacity: 1
                        }, 1400);
                    }else{
                        $(".dashboard_area .inner:eq("+idx+") > [class^='total_']:eq("+i+") .graph .state").animate({
                            width: ((comm.finishNum[idx][i]/comm.totalNum[idx][i])*100).toFixed(1)+"%",
                            opacity: 1
                        }, 1400);
                    }
                    totalData0 += comm.finishNum[idx][i];
                    totalData1 += comm.totalNum[idx][i];
                };

                
                // 데이터 삽입 - 전체 진척률
                $(".dashboard_area .inner:eq("+idx+") .total .summary .num > em").text(totalData0);
                $(".dashboard_area .inner:eq("+idx+") .total .summary .num .total_num").text(totalData1);
                
                if($(".dashboard_area").hasClass('type') === false){
                    
                    $(".dashboard_area .inner:eq("+idx+") > .total .graph .state").animate({
                        height: ((totalData0/totalData1)*100).toFixed(1)+"%",
                        opacity: 1
                    }, 1400);
                }else{
                    $(".dashboard_area .inner:eq("+idx+") > .total .graph .state").animate({
                        width: ((totalData0/totalData1)*100).toFixed(1)+"%",
                        opacity: 1
                    }, 1400);
                }
    
                // 전체 진척률 (추후 수정)
                let totalVal = ((totalData0/totalData1)*100).toFixed(1);
                var totalValChk = Math.ceil(totalVal);
                var totalNum = 0;
                var totalCntNum = setInterval(function(){
                    totalNum++;
                    $(item).find("> em").text(totalNum);
                    if(totalNum == totalValChk){
                        $(item).find("> em").text(totalVal); // 최종결과 값
                        clearInterval(totalCntNum);
                        if(totalNum == 100){
                            $(item).find("> em").text(parseInt(totalVal));
                            $(item).find("> em").addClass("finish");
                        };
                    };
                }, (100/totalVal)*10);
            });            
        }, 600);
    },
    getParamSrch : function(param){ // get 방식
        // window.location.href="index.html?client="+param;
        window.open("./index.html?client="+param);

    },
    getParameterName : function(path){ // parameter value 가져오기
        path = path.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + path + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    switchChk : function(){
        if ($('.cvUtil .cvBtn_switch input').is(':checked')){
            $('body.cvGuide').addClass('dark');
            $('header .logo img').attr('src', './guide/inc/img/logo.png');
        }else{
            $('body.cvGuide').removeClass('dark');
            $('header .logo img').attr('src', './guide/inc/img/logo_red.png');
        }
    },
    switchMode : function(){
        comm.switchChk();
        //comm.switchGraph();
        $('.cvBtn_switch input').bind('click', function(){
            comm.switchChk();
        })
    },    
    loadInit : function(){
        if($(".loading_wrap").length == 0){
            $("body").append('<div class="loading_wrap"><div class="loading"><div class="icon"></div><p class="txt">데이터 로딩중</p></div></div>');
        };
    },
    loadRemove : function(){
        if($(".loading_wrap").length > 0){
            $('.loading_wrap').remove();
        };
    },
    iptTexDel : function(){
        // 공통 텍스트필드 삭제 스크립트
        if( $(".ipt_wrap .ipt.del").length > 0 ){
            $(".ipt_wrap .ipt.del").each(function(idx, item){                
                $(item).after('<button type="button" class="btn_del" tabindex=-1><span class="blind">해당 필드 입력값 삭제</span></button>');

                $(item).closest(".ipt_wrap").find(".btn_del").bind("mousedown", function(e){
                    e.preventDefault();
                    $(this).closest(".ipt_wrap").find(".ipt").val("").focus();
                    $(this).closest(".ipt_wrap").removeClass("on");
                });
                
                $(item).bind({
                    "change paste keydown keyup" : function(){
                        if($(this).val() != ""){
                            $(this).closest(".ipt_wrap").addClass("on");
                        }else {
                            $(this).parent(".ipt_wrap").removeClass("on");
                        }
                    },
                    "focusin" : function(){
                        if($(this).val() != ""){
                            $(this).closest(".ipt_wrap").addClass("on");
                        }
                    },
                    "focusout" : function(){
                        $(this).closest(".ipt_wrap").removeClass("on");
                    }
                });
            });
        };
    }
};

// 검색
var search = {
    dataArraySrch : [],
    dataArraySrchMenu : [],
    depCode : "",
    time : 600,
    srchDataCall : function(){
        if(comm.dataArray != null && comm.dataArray.length == 0 && search.dataArraySrch != null && search.dataArraySrch.length == 0){ // data check
            comm.dataCall(); // 기본 데이터 정보 수집
        };
        
        if(comm.dataArray != null && comm.dataArray.length > 0 && search.dataArraySrch.length == 0){ // data check
            // $.each(comm.dataArray, function(idx, item){
            comm.dataArray.forEach(function(item, idx){
                let join0 = [];
                let join1 = [];
                for(let i=0; i<item.length; i++){
                    for(let j=0; j<item[i].length; j++){
                        $.ajax({
                            url: item[i][j]+"?"+Math.round(100000*Math.random()),
                            type: "get",
                            dataType : "json",
                            async : false,
                            cache : false,
                            success: function(data){
                                const infoData = data["root_comment"];
                                for(let h=0; h<infoData.length; h++){
                                    if(i == 0){
                                        join0.push(infoData[h]);
                                    }else if(i == 1){
                                        join1.push(infoData[h]);
                                    };
                                };
                                
                                search.dataArraySrch[idx] = [join0, join1];
                                // console.log("search", search.dataArraySrch);
                            },
                            error: function(){
                                $(".cvContent .cont").empty();
                                $(".cvContent .cont").append(
                                    '<p class="noData">데이터를 가져오지 못했습니다. <br> 네트워크 환경을 다시 확인하여 주십시오.</p>'
                                );
                            }
                        });
                    };
                };
            });
            // });
        };
    },
    searchFn : function(srchVal){
        if(search.dataArraySrch != null && search.dataArraySrch.length == 0){
            search.srchDataCall(); // 검색 데이터 정보 수집
            comm.loadInit();
            search.time = 10;
        };
        
        search.dataArraySrchMenu = [];
        if(search.dataArraySrch != null && search.dataArraySrch.length > 0 && search.dataArraySrchMenu.length == 0){ // data check
            let idxFind = $(".navList.rdo .part > span input:radio[name=rdo]:checked").closest("li.part").index();
            setTimeout(function(){
                for(let i=0; i<search.dataArraySrch[idxFind].length; i++){
                    console.log( $(".navList.rdo .part:eq("+idxFind+") .subList > li input:radio:checked").val() );
                    search.dataArraySrch[idxFind][i].reduce(function (total, val, idx, array){
                        switch ( $(".navList.rdo .part:eq("+idxFind+") .subList > li input:radio:checked").val() ){
                            case "menu":
                                // 메뉴명 검색
                                // if( val.depth1 == srchVal || val.depth2 == srchVal || val.depth3 == srchVal || val.depth4 == srchVal ){ // 정확한 글자수 체크
                                // console.log(`find val.depth1 : "${srchVal}" find index : "${srchVal}" result number : ${val.depth1.indexOf(srchVal)}`);
                                // if( val.depth1.includes(srchVal) == srchVal || val.depth2.includes(srchVal) == srchVal || val.depth3.includes(srchVal) == srchVal || val.depth4.includes(srchVal) == srchVal ){ // 두 글자 이상 텍스트 체크
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
                                            console.log(data);
                                            search.dataArraySrchMenu.push(val);
                                        };
                                    },
                                    error: function(){
                                        console.log("json data error (경로가 잘못되었거나 html 파일이 없습니다.) : ", val);
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
                                break;
                            case "comment":
                                // 비고란 검색
                                if( val.comment.match(srchVal) == srchVal ){
                                    return search.dataArraySrchMenu.push( val );
                                };
                        };
                    }, 0);
                };

                if($(".dataTag").length > 0){
                    $(".dataTag").remove();
                };
                
                if( search.dataArraySrchMenu.length == 0 ){
                    $(".cvContent .page_list > table tbody").html('<tr><td colspan="11"><p class="noData">검색한 데이터를 찾지 못하였습니다.</p></td></tr>');
                }else{
                    // page list 삽입
                    if( $(".cvGuide.search .cont .page_list").length > 0 ){
                        // $.each(search.dataArraySrchMenu, function(idx, item){
                        search.dataArraySrchMenu.forEach(function(item, idx){
                            if(search.depCode != null && search.dataArraySrchMenu != null){ // html && data 있을 때
                                $(".cvContent .cont .page_list tbody").append(search.depCode);
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
                        // });
                    };
                };
                
                if( $(".cvContent .page_list > table tbody > tr").length > 0 ){
                    setTimeout(comm.countState, 100);
                    comm.loadRemove();
                    $(".srch_wrap button.cvBtn_srch").attr("disabled", false);
                };
            }, search.time);
        };
    },
    slide : function(){
        $(".cvLnb .nav .navList.rdo .part:eq(0) .subList").stop(true, true).slideDown(200); 
        if( $(".cvLnb .nav .navList.rdo .part").length > 1 ){
            $(".cvLnb .nav .navList.rdo .part > span .ipt[type=radio]").bind("change", function(e){
                $(e.target).closest(".navList.rdo").find("> .part .subList").stop(true, true).slideUp(200);
                $(e.target).closest(".part").find("> .subList").stop(true, true).slideDown({
                    duration: 200
                });
            });
        };
    },
    srchPath : function(){
        var count = "";
        for(let i=0; i<$(".cvGnb li .menu_list").length; i++){
            if(i==0){ count += "age="+$(".cvGnb li .menu_list").length };
            count += "&menu"+(i+1)+"="+$("#list_"+(i+1)).text();
        };
        $(".cvGnb li .menu_search").attr("href", "./search.html?"+count);
    },
    srchCtgSet : function(){
        var srchCtgCode = $(".cvLnb .navList.rdo").html();
        $(".cvLnb .navList.rdo").empty();
        for(let i=0; i<comm.getParameterName("age"); i++){
            $(".cvLnb .navList.rdo").append(srchCtgCode);
            $(".cvLnb .navList.rdo .part:eq("+i+") label.tit").text(comm.getParameterName("menu"+(i+1)));
            
            $(".cvLnb .navList.rdo .part:eq("+0+") > span .ipt[type=radio]").attr({
                "checked":true
            });
            
            $(".cvLnb .navList.rdo .part:eq("+i+") > span .ipt[type=radio]").attr({
                "id":"rdo_"+i
            });
            $(".cvLnb .navList.rdo .part:eq("+i+") label.tit").attr({
                "for":"rdo_"+i
            });

            $(".cvLnb .navList.rdo .part:eq("+i+") .subList > li .ipt[type=radio]").attr({
                "name":"rdo_"+i
            });
            for(let j=0; j<$(".cvLnb .navList.rdo .part .subList > li").length; j++){
                $(".cvLnb .navList.rdo .part:eq("+i+") .subList > li:eq("+j+") .ipt[type=radio]").attr({
                    "id":"rdo_"+i+"_"+j
                });
                $(".cvLnb .navList.rdo .part:eq("+i+") .subList > li:eq("+j+") .ipt[type=radio]+label").attr({
                    "for":"rdo_"+i+"_"+j
                });
            };
        };        

        search.slide();
    },
};

// 아코디언
var acco = {
	accoInit : function(){ // 초기화
        $(".cvLnb .navList > li.part > .tit").addClass("cvBtn_acco");

        for(let i=0; i<$(".cvLnb .navList > li.part").length; i++){
            if($(".cvLnb .navList > li.part:eq("+i+")").hasClass("on") == true){
                $(".cvLnb .navList > li.part:eq("+i+") > .tit").append('<span class="blind">접기</span>');
                $(".cvLnb .navList > li.part:eq("+i+")").find(".body").stop(true, true).slideDown(200);
            }else{
                $(".cvLnb .navList > li.part:eq("+i+") > .tit").append('<span class="blind">펼치기</span>');
                $(".cvLnb .navList > li.part:eq("+i+")").find(".body").stop(true, true).slideUp(200);
            };
        };

        $(".cvLnb .navList button.tit.cvBtn_acco").unbind("click").bind("click", function(e){
            acco.accoClick(this);
        });
	},
	accoOverIn : function(target){ // over
		$(target).addClass("on");
		// $(target).find("> .blind").text("접기");
		$(target).find(".body").stop(true, true).slideDown({
			duration: 200
		});
	},
	accoOverOut : function(target){
        $(target).closest(".acco").find("li").removeClass("on");
        // $(target).find("> .blind").text("펼치기");
        $(target).closest(".acco").find("li .body").stop(true, true).slideUp(200);
	},
	accoClick : function(target, callback){ // click
		if( $(target).closest(".part").find(".body").length > 0 ){ // 소카테고리 있을때만
			if( $(target).closest(".acco.single").length > 0){ // 한개씩
				if( $(target).closest(".part.on").length > 0 ){ // 펼침상태
					$(target).closest(".part.on").removeClass("on");
					$(target).find("> .blind").text("펼치기");
					$(target).closest(".part").find(".body").stop(true, true).slideUp(200);
				}else{
                    $(target).closest(".acco").find("> .part").removeClass("on");
                    $(target).closest(".part").addClass("on");
                    $(target).closest(".acco").find("> .part .tit .blind").text("펼치기");
                    $(target).find("> .blind").text("접기");
                    $(target).closest(".acco").find("> .part .body").stop(true, true).slideUp(200);
                    $(target).closest(".part").find(".body").stop(true, true).slideDown({
                        duration: 200
                    });
				};
			}else{
                if( $(target).closest(".part.on").length > 0 ){
                    $(target).closest(".part").removeClass("on");
					$(target).find("> .blind").text("펼치기");
					$(target).closest(".part").find(".body").stop(true, true).slideUp(200);
				}else{
                    $(target).closest(".part").addClass("on");
                    $(target).closest(".acco").find("> .part .tit .blind").text("펼치기");
					$(target).find("> .blind").text("접기");
					$(target).closest(".part").find(".body").stop(true, true).slideDown({
                        duration: 200
					});
				};
			};
            // callback 처리
            if(callback != null){
                callback(target);
            };
		};
	}
};