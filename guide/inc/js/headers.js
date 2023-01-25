var tableOrder = 1;
function inputBind(){
	$('#tableOrder').bind({
		'change':function(){
			tableOrder = $(this).val();
		}
	});
	$('#code:not(.labelCode)').bind({
		'change paste keyup focusout':function(){
			makeHeaders();
		}
	});
	$('#code.labelCode').bind({
		'change paste keyup focusout':function(){
			makeLabel();
		}
	});
	$('input[name="labelColChk"], input[name="labelColrdo"], #theadEq').bind({
		'change':function(){
			makeLabel();
		}
	});
	$('#copyHTML').bind({
		'click':function(){
			var txt = $('#makedTable').val();
			copyToClipboardTable(txt);
			common.popAlert('#popAlert');
			setTimeout(function(){
				common.alertClose('#popAlert');
			},500);
		}
	});

	// ㅍ다국어 코드
	enCodeMode = $('input[name="codeSel"]:checked').val();
	$('input[name="codeSel"]').bind({
		'change':function(){
			enCodeMode = $('input[name="codeSel"]:checked').val();
			console.log("enCodeMode : " + enCodeMode );
			enCodeMake();
		}
	});
	$('#pageMarkup').bind({
		'change paste keyup focusout':function(){
			enCodeMake();
		}
	});

	// 인풋, 레이블 연결
	$('#pageMarkupInput').bind({
		'change paste keyup focusout':function(){
			iptForMake();
		}
	});
}

var headersArry = [];
function makeHeaders(){
	previewMake();
	$('.previewTable th').removeAttr('scope');
	// th에 아이디 부여
	headersArry = [];
	for( var i = 0 ; i < $('.previewTable thead th').length ; ++ i ){
		$('.previewTable thead th:eq('+i+')').attr('id', 'xcell_'+tableOrder+'_'+i);
		headersArry.push('xcell_'+tableOrder+'_'+i);
	}
	// tbody에 th 유무에 따라 분리 처리리
	// tbody에 th가 없고 headers를 1:1 매칭할 경우
	var theadTDNum = $('.previewTable thead th').length;
	var theadTRNum = $('.previewTable thead tr').length;
	var tbodyTDNum = 0;
	for ( var i = 0 ; i < theadTRNum ; ++i ) {
		tbodyTDNum += $('.previewTable thead tr:eq('+i+') td').length;
	}
	if ( $('.previewTable tbody th').length == 0 && tbodyTDNum == theadTDNum ) {
		var appendCnt = 0;
		for ( var i = 0 ; i < $('.previewTable tbody tr').length ; ++i ) {
			$('.previewTable tbody td').each(function(){
				$(this).attr('headers', headersArry[appendCnt%headersArry.length]);
				appendCnt++;
			});
		}
	// tbody에도 th가 없거나 thead와 1:1 매칭이 아닌 경우
	} else {
		var totalCol = 0;
		$('.previewTable colgroup col').each(function(){
			( $(this).attr('span') )?totalCol+= $(this).attr('span'):totalCol++;
		});
		for ( var i = 0 ; i < $('.previewTable tbody th').length ; ++i ) {
			$('.previewTable tbody th:eq('+i+')').attr('id', 'ycell_'+tableOrder+'_'+i);
		}
		for( var i = 0 ; i < $('.previewTable tr').length ; ++ i ){
			for ( var j = 0 ; j < totalCol ; ++j) {
				if ( $('.previewTable tr:eq('+i+') > *:eq('+j+')').attr('rowspan') != undefined ){
					var target = $('.previewTable tr:eq('+i+') > *:eq('+j+')');
					var targetID = $(target).attr('id');
					var rowspanNum = Number( $(target).attr('rowspan') );
					var targetTxt = $(target).html();
					$(target).data('rowspan', rowspanNum ).attr('data-rowspan', rowspanNum );
					$(target).removeAttr('rowspan');
					for ( var k = 0; k < rowspanNum; ++k ) {
						if (j != 0) {
							$('.previewTable tr:eq('+Number(i+k)+')').find('*:eq('+Number(j-1)+')').after('<th id="'+targetID+'" class="remove">'+targetTxt+'</th>');
						} else {
							$('.previewTable tr:eq('+Number(i+k)+')').find('*:eq('+j+')').before('<th id="'+targetID+'" class="remove">'+targetTxt+'</th>');
						}
					}
				}
				if ( $('.previewTable tr:eq('+i+') > *:eq('+j+')').attr('colspan') != undefined ){
					var target = $('.previewTable tr:eq('+i+') > *:eq('+j+')');
					var targetID = $(target).attr('id');
					var colspanNum = Number( $(target).attr('colspan') );
					var targetTxt = $(target).html();
					$(target).data('colspan', colspanNum ).attr('data-colspan', colspanNum );
					$(target).removeAttr('colspan');
					for ( var k = 0; k < colspanNum; ++k ) {
						$('.previewTable tr:eq('+i+') > *:eq('+j+')').after('<th id="'+targetID+'" class="remove">'+targetTxt+'</th>');
					}
				}
			}
		}
		// 연결
		$('.previewTable td').each(function(){
			var nowX = $(this).index();
			var nowY = $(this).parent().index();
			var idStrX = "";
			var lastHeaderID = "";
			for( var i = 0 ; i < $('.previewTable thead tr').length ; ++ i ){
				if ( $('.previewTable thead tr:eq('+i+') th:eq('+nowX+')').attr('id') != undefined ){
					if ( $('.previewTable thead tr:eq('+i+') th:eq('+nowX+')').attr('id') != lastHeaderID ){
						lastHeaderID = $('.previewTable thead tr:eq('+i+') th:eq('+nowX+')').attr('id');
						idStrX = $('.previewTable thead tr:eq('+i+') th:eq('+nowX+')').attr('id') + " ";
					}
				}
			}
			var idStrY = "";
			if ( $('.previewTable tbody tr:eq('+nowY+') th').last().attr('id') != undefined ){
				idStrY = $('.previewTable tbody tr:eq('+nowY+') th').last().attr('id');
			}

			var idStr = idStrX + idStrY;
			$(this).attr('headers', idStr );
		});
		// 지우기
		$('.previewTable .remove').remove();
		$('.previewTable th, .previewTable td').each(function(){
			if ( $(this).data('rowspan') != undefined ){
				$(this).attr('rowspan', $(this).data('rowspan'));
				$(this).removeAttr('data-rowspan');
			}
			if ( $(this).data('colspan') != undefined ){
				$(this).attr('colspan', $(this).data('colspan'));
				$(this).removeAttr('data-colspan');
			}
		});
		$('.previewTable tfoot td, .previewTable tfoot td').removeAttr('headers');
	}
	var resultTxt = $('.previewTable').html();
	$('#makedTable').val(resultTxt);
}


function makeLabel() {
	var labelArry = [];
	var theadTxt = "";
	var lineCnt = 1;
	previewMake();

	$('input[name="labelColChk"]').each(function(){
		if (this.checked){
			labelArry.push(this.value);
		}
	});
	if ( $('#labelColrdo0').prop('checked') ){
		theadTxt = $('.previewTable thead tr > *:eq('+$('#theadEq').val()+')').text() + " ";
		console.log("제목 포함");
	}
	for ( var i = 0 ; i < $('.previewTable tbody tr').length ; ++i ) {
		if ( $('.previewTable tbody tr:eq('+i+') input[type="checkbox"]').length > 0 || $('.previewTable tbody tr:eq('+i+') input[type="radio"]').length > 0 ) {
			var labelName = "";
			for ( var j = 0 ; j < labelArry.length ; ++j ) {
				console.log("labelArry" + labelArry.length );
				labelName += $('.previewTable tbody tr:eq('+i+') td:eq('+labelArry[j]+')').text() + " ";
			}
			$('.previewTable tbody tr:eq('+i+') input[type="checkbox"] + label .blind, .previewTable tbody tr:eq('+i+') input[type="radio"] + label .blind').text(lineCnt); //다 못쳤음
			lineCnt++;
		}
	}

	var resultTxt = $('.previewTable').html();
	$('#makedTable').val(resultTxt);

	$('.previewTable').empty();
	$('.previewTable').append(resultTxt);
}

// 다국어 코드 (s)
var enCodeMode = "continue";

function enCodeMake() {
	$('.previewTable').empty();
	var str = $('#pageMarkup').val();

	var header = str.substring(0, str.indexOf('<body>')+6);
	var footer = str.substring(str.indexOf('</body>'), str.length);
	var contents = str.substring(str.indexOf('<body>')+6, str.indexOf('</body>'));
	if( str.indexOf('</body>') == -1 ) {
		contents = str;
		header = "";
		footer = "";
	}
	var replaceContents = contents.replace(/<br>/gi, '__br__').replace('<script type="text/javascript">','sscript').replace('</script>', '__/script__');
	$('.previewTable').append(replaceContents);
	if( enCodeMode != 'continue' ) {
		enCodeRemove();
	}
	if( enCodeMode != 'remove' ) {
		enCodeInit();
	}
	var resultTxt = $('.previewTable').html();
	var replaceTxt = header + resultTxt.replace(/__br__/gi,'<br>').replace('sscript','<script type="text/javascript">').replace('__/script__','</script>') + footer;
	var finalTxt = resultTxt.replace(/&lt;/gi,'<').replace(/&gt;/gi,'<');
	$('#makedTable').val(finalTxt);
}

function enCodeInit() {
	var codeCnt = 1;
	var arry = [];
	// 코드추출
	$('.previewTable *').each(function(){
		if( $(this).data('jexMl') != undefined ) {
			var code = Number( $(this).data('jexMl').substr(4,8) );
			arry.push( code );
		}
	});
	$('.previewTable *[title]').each(function(){
		if( $(this).data('jexMlTitle') != undefined ) {
			var code = Number( $(this).data('jexMlTitle').substr(4,8) );
			arry.push( code );
		}
	});
	$('.previewTable *[placeholder]').each(function(){
		if( $(this).data('jexMlPlaceholder') != undefined ) {
			var code = Number( $(this).data('jexMlPlaceholder').substr(4,8) );
			arry.push( code );
		}
	});
	if ( arry.length > 0 ) {
		codeCnt = Math.max.apply(null, arry ) + 1;
	}

	// 심기
	$('.previewTable *').each(function(){
		if( $(this).children().length == 0 && $(this).text() != "" ) {
			if( $(this).data('jexMl') == undefined || $(this).data('jexMl') == "" && $(this).parent().is('.caseBox') == false ) {
				$(this).attr('data-jex-ml', 'MLV_' + getCode( codeCnt ) );
				codeCnt++;
			}
		}
	});
	$('.previewTable *[title]').each(function(){
		if( $(this).data('jexMlTitle') == undefined || $(this).data('jexMlTitle') == "" ) {
			$(this).attr('data-jex-ml-title', 'MLV_' + getCode( codeCnt ) );
			codeCnt++;
		}
	});
	$('.previewTable *[placeholder]').each(function(){
		if( $(this).data('jexMlPlaceholder') == undefined || $(this).data('jexMlPlaceholder') == "" ) {
			$(this).attr('data-jex-ml-placeholder', 'MLV_' + getCode( codeCnt ) );
			codeCnt++;
		}
	});

	$('.previewTable .txtList > li, .previewTable .txtItem > li, .finishBox .txtL, .finishBox .txt').each(function(){
		console.log('p가 걸린다');
		if( $(this).data('jexMl') == undefined || $(this).data('jexMl') == "" ) {
			$(this).attr('data-jex-ml', 'MLV_' + getCode( codeCnt ) );
			codeCnt++;
		}
	});
}

function getCode(codeCnt) {
	var resultCnt;
	if ( codeCnt < 10 ) {
		resultCnt = codeCnt;
		resultCnt = "000"+codeCnt;
	} else if ( codeCnt < 100 ) {
		resultCnt = "00"+codeCnt;
	} else if ( codeCnt < 1000 ) {
		resultCnt = "0"+codeCnt;
	} else {
		resultCnt = codeCnt;
	}
	return resultCnt;
}

function enCodeRemove(){
	$('.previewTable *').removeAttr('data-jex-ml data-jex-ml-placeholder data-jex-ml-title');
}
// 다국어 코드 (e)


// 인풋, 레이블 연결 (s)
function iptForMake(){
	$('.header').hide();
	$('.previewTable').empty();
	var str = $('#pageMarkupInput').val();

	var header = str.substring(0, str.indexOf('<body>')+6);
	var footer = str.substring(str.indexOf('</body>'), str.length);
	var contents = str.substring(str.indexOf('<body>')+6, str.indexOf('</body>'));
	if( str.indexOf('</body>') == -1 ) {
		contents = str;
		header = "";
		footer = "";
	}
	var replaceContents = contents.replace(/<br>/gi, '__br__').replace('<script type="text/javascript">','sscript').replace('</script>', '__/script__');
	$('.previewTable').append(replaceContents);
	iptIDInit();
	var resultTxt = $('.previewTable').html();
	$('#makedTable').val(header + resultTxt.replace(/__br__/gi,'<br>').replace('sscript','<script type="text/javascript">').replace('__/script__','</script>') + footer);
	$('.header').hide();
}

function iptIDInit() {
	var codeCnt = 1;
	$('input, select').removeAttr('title');
	$('select').removeAttr('name').attr('id', "");
	$('input.ipt').each(function(){
		$(this).attr('id', 'inputTxt_'+codeCnt);
		codeCnt++;
	});
	codeCnt = 1;
	$('.iptGroup').each(function(){
		$(this).find('input[type=checkbox]').attr('name', 'checkboxSet_'+codeCnt);
		codeCnt++;
	});
	codeCnt = 1;
	$('.iptGroup').each(function(){
		$(this).find('input[type=radio]').attr('name', 'radioSet_'+codeCnt);
		codeCnt++;
	});
	codeCnt = 1;
	$('.iptGroup input[type=checkbox]').each(function(){
		if ($(this).prev().text() == "") {
			contents = 1;
		}
		var idFirst = $(this).attr('name')+"_";
		$(this).attr('id', idFirst+codeCnt);
		if ( $(this).next().is('label') ) {
			$(this).next().attr('for', idFirst+codeCnt);
		}
		codeCnt++;
	});
	codeCnt = 1;
	$('.iptGroup input[type=radio]').each(function(){
		if ($(this).prev().text() == "") {
			contents = 1;
		}
		var idFirst = $(this).attr('name')+"_";
		$(this).attr('id', idFirst+codeCnt);
		if ( $(this).next().is('label') ) {
			$(this).next().attr('for', idFirst+codeCnt);
		}
		codeCnt++;
	});


	codeCnt = 1;
	$('input[type=checkbox]').each(function(){
		if ( $(this).closest('.iptGroup').length == 0 ) {
			$(this).attr('id', 'chkSingle_'+codeCnt );
			if ( $(this).next().is('label') ) {
				$(this).next().attr('for', 'chkSingle_'+codeCnt );
			}
			codeCnt++;
		}
	});
	codeCnt = 1;
	$('.iptGroup input[type=radio]').each(function(){
		if ( $(this).closest('.iptGroup').length == 0 ) {
			$(this).attr('id', 'rdoSingle_'+codeCnt );
			if ( $(this).next().is('label') ) {
				$(this).next().attr('for', 'rdoSingle_'+codeCnt );
			}
			codeCnt++;
		}
	});
}

// 인풋, 레이블 연결 (e)

function previewMake(){
	$('.previewTable').empty();
	var str = $('#code').val();
	$('.previewTable').append(str);
}

function copyToClipboardTable(val){
	var t = document.createElement('textarea');
	document.body.appendChild(t);
	t.value = val;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
}

$(document).ready(function() {
	inputBind();
	makeHeaders();
});