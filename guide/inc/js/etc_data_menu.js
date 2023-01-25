var projectName = "우리카드";

// GNB
var topMenuStr =
'<header>'+
'	<h1 class="logo"><a href="../index.html"><img src="/path/img/logo.png" alt="" title="projectName"></a></h1>'+
'	<button type="button" class="btnLnb"><i class="fas fa-bars"></i><i class="blind">LNB 열기/닫기</i></button>'+
'	<nav class="wgGnb">'+
'		<ul class="clfix">'+
'			<li><a href="/path/menu/@etcpage_list.html?mm=1&sm=1&func=tobeList&page=tb_crd">컨텐츠 현행화</a></li>'+
'		</ul>'+
'	</nav>'+
'</header>';

// LNB
var lnbStart = 
'<div class="wgLnb">'+
'	<div class="nav">'+
'		<div class="selectLnb">'+
'			<select></select>'+
'			<i class="fas fa-chevron-down"></i>'+
'		</div>'+
'		<h2></h2>';
var lnbEnd = 
'	</div>'+
'</div>';


// Card List
function tobeList(_append){
	var funcCode = 'tobeList';
	var str = 
	'<ul>'+
	'	<li class="on"><a href="#">카드</a>'+
	'		<ul class="depth">'+
	'			<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=TB_CRD">주요카드</a></li>'+
	'			<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=TB_CRD_O">비주요카드</a></li>'+
	'		</ul>'+
	'	</li>'+
	'	<li class="on"><a href="#">이벤트</a>'+
	'		<ul class="depth">'+
	'			<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=TB_EVT">최근 이벤트</a></li>'+
	'			<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=TB_EVT_O">지난 이벤트</a></li>'+
	'		</ul>'+
	'	</li>'+
	'	<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=TB_GUD">가이드</a></li>'+
	'	<li><a href="../menu/@etcpage_list.html?mm=code&sm=code&func='+funcCode+'&page=all">전체 보기</a></li>'+
	'</ul>';
	wgListMake(_append, str);
}


