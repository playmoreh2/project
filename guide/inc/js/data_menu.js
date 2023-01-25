var projectName = "하나SFA";

// GNB
var topMenuStr =
'<header>'+
'	<h1 class="logo"><a href="../index.html"><img src="/path/img/logo.png" alt="" title="projectName"></a></h1>'+
'	<button type="button" class="btnLnb"><i class="fas fa-bars"></i><i class="blind">LNB 열기/닫기</i></button>'+
'	<nav class="wgGnb">'+
'		<ul class="clfix">'+
'			<li><a href="/path/rule/dashboard.html?mm=1&sm=1">Summary</a></li>'+
'			<li><a href="/path/template/@layout.html?mm=1&sm=1&page=layout_mw">Template</a></li>'+
'			<li><a href="/path/menu/@page_list.html?mm=1&sm=1&func=menuList&page=SFA_CM">하나 SFA</a></li>'+
'		</ul>'+
'	</nav>'+
'	<div class="util">'+
'		<a href="#" class="btnSearch onlyPC" target="_blank" title="Toggle PrintMode" onclick="printMode(this);return false;"><i class="fas fa-print"></i></a>'+
'		<a href="/path/util/resolution.html" class="btnSearch" target="_blank" title="해상도알아내기"><i class="fas fa-mobile-alt"></i></a>'+
'		<a href="/path/util/search.html?page=menuList" class="btnSearch onlyPC" target="_blank" title="퍼블리싱페이지 검색"><i class="fas fa-search"></i></a>'+
'	</div>'+
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

// Summary
var summaryStr =
'<ul>'+
'	<li><a href="dashboard.html?mm=code&sm=code">Dashboard</a></li>'+
// '	<li><a href="basic_guide.html?mm=code&sm=code">Basic Guide</a></li>'+
// '	<li><a href="folder_tree.html?mm=code&sm=code">Folder Structure</a></li>'+
// '	<li><a href="wah_guide.html?mm=code&sm=code">Web accessibility</a>'+
/*'		<ul class="depth">'+
'			<li><a href="wah_guide.html?mm=code&sm=code">Overview</a></li>'+
'			<li><a href="wah_semantic.html?mm=code&sm=code">SEMANTIC</a></li>'+
'			<li><a href="wah_aria.html?mm=code&sm=code">ARIA</a></li>'+
'			<li><a href="wah_wcag.html?mm=code&sm=code">WCAG</a></li>'+
'			<li><a href="wah_seo.html?mm=code&sm=code">SEO</a></li>'+
'		</ul>'+*/
'	</li>'+
// '	<li><a href="pub_notice.html?mm=code&sm=code">Publisher Notice</a>'+
// '	<li><a href="dev_guide.html?mm=code&sm=code">Develper Guide</a>'+
'</ul>';

//Template
var templateStr =
'<ul>'+
'	<li><a href="#">Layout</a>'+
'		<ul class="depth">'+
'			<li><a href="@layout.html?mm=code&sm=code&page=layout_mw">Mobile Basic</a></li>'+
'			<li><a href="@layout.html?mm=code&sm=code&page=layout_pc">PC Basic</a></li>'+
'		</ul>'+
'	</li>'+
'	<li class="on"><a href="#">Component</a>'+
'		<ul class="depth">'+
'			<li><a href="/html/_alba_/alba_guide.html" target="_blank">PC Component</a></li>'+
'			<li><a href="/html_m/_guide_/guide.html" target="_blank">Mobile Component</a></li>'+
'		</ul>'+
'	</li>'+
// '	<li class="open"><a href="#">Mobile</a>'+
// '		<ul class="depth">'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_text_basic">Text</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_title">Title</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_button">Button</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_form">Form</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_card">카드</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_location">location</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_table">Table</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_bbs">BBS</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_search">Search</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_summary">Summary</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_tab">Tab</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_tooltip">Tooltip</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_list">Text List</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_list_data">Data List</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_accordion">Accordion</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_terms">Terms</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_msg">Message</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_popup">Popup</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_content">콘텐츠</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=mw_icon">Icon</a></li>'+
// '			<li><a href="@m.template.html?mm=code&sm=code&page=temp">Temp</a></li>'+
// '		</ul>'+
// '	</li>'+
// '	<li><a href="#">PC</a>'+
// '		<ul class="depth">'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_text_basic">Text</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_title">Title</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_button">Button</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_link">Link</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_form">Form</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_formlist">FormList</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_location">location</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_table">Table</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_bbs">BBS</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_search">Search</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_summary">Summary</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_tab">Tab</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_tooltip">Tooltip</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_list">Text List</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_list_data">Data List</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_accordion">Accordion</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_terms">Terms</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_banner">배너(롤링)</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_msg">Message</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_popup">Popup</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_certif">Certificate</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_content">콘텐츠</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=pc_icon">Icon</a></li>'+
// '			<li><a href="@template.html?mm=code&sm=code&page=temp">Temp</a></li>'+
// '		</ul>'+
// '	</li>'+
// '	<li><a href="@template.html?mm=code&sm=code&page=voiceReader_test">Voice Reader Test</a></li>'+
'</ul>';


// menu List
function menuList(_append){
	var funcCode = 'menuList';
	var str =
	'<ul>'+
	'	<li class="on"><a href="#">PC</a>'+
	'		<ul class="depth">'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_CM">공통/메인</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_CS">고객관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_SD">가입설계</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_CN">계약관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_AT">활동관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_RF">자료실</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_AD">관리자메뉴</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=SFA_GA">GA 관리</a></li>'+
	'		</ul>'+
	'	</li>'+
	'	<li class="on"><a href="#">Mobile</a>'+
	'		<ul class="depth">'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_CM">공통/마이페이지</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_CS">고객관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_SD">가입설계</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_CN">계약관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_AT">활동관리</a></li>'+
	'			<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=M_SFA_RF">자료실</a></li>'+
	'		</ul>'+
	'	</li>'+
	'	<li><a href="../menu/@page_list.html?mm=code&sm=code&func='+funcCode+'&page=all">하나 SFA 전체 보기</a></li>'+
	'</ul>';
	wgListMake(_append, str);
}


