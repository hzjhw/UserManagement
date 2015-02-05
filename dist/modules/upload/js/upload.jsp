<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上传图片</title>
<link rel="stylesheet" type="text/css"
	href="/user_v2/css/user-merge-index.css" />
<link rel="stylesheet" href="/user/abbcc/css/common.css">
<link rel="stylesheet" href="/user_v2/css/css3.css">
<link href="<s:url value="/css/jquery-ui.min.css"/>" rel="stylesheet" />
<link href="/common/picUpload/upload/css/default.css" rel="stylesheet"
	type="text/css" />
<link href="/common/picUpload/css/upload.css" rel="stylesheet" />
<link id="artDialogSkin" href="/js/artDialog3.0.5/skin/default.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="/common/picUpload/js/user-merge-index.js"></script>

<script type="text/javascript" src="/js/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="/common/picUpload/upload/js/swfupload.js"></script>
<script type="text/javascript">
	var username = '${sessionScope.abbccuser.username}';
</script>
<script type="text/javascript"
	src="/common/picUpload/upload/js/handlers.js"></script>
<script type="text/javascript" src="/common/picUpload/js/upload.js"></script>

</head>
<body>
	<div id="contaner-div">

		<div id="tabs" class="tabs">
			<ul>
				<li><a id="upload2_select" href="#upload2">上传</a></li>
				<li><a id="sources_select" href="#sources">从资源库选择</a></li>
				<li><a id="icon_select" href="#icon">图标</a></li>
			</ul>
			<div id="upload2" class="tabContent">
				<div class="tabContentLeft">
					<div class="top_menu">
						<s:action name="albumshowAll" namespace="/user_v2/album"></s:action>
						<div class="left">
							<div class="uploadButtonWrap">
								<span id="uploadButton"></span>
							</div>
						</div>
						<div class="left" style="vertical-align: middle;">
							<span>上传到：</span>
							<s:select list="#request['albumList']" listKey="key"
								cssClass="text" listValue="value" name="albumId" id="albumId"
								theme="xhtml" onchange="changeAlbumId(this)" />
							<input id="popupAddProp" onClick="popupAddProp()" type="button"
								maxlength="20" value="添加文件夹" />
						</div>

					</div>

					<div class="clearfloat"></div>

					<div id="uploadProcess"></div>
					<div class="clearfloat"></div>
					<!--File show "position:relative;"直写外面为了IE6下出现解析异常-->
					<ul id="showNewUploadFileContent"
						class="showFilesContent startToUpload" style="position: relative;">
					</ul>
					<!--//end File show-->
					<div class="clearfloat"></div>
				</div>
			</div>
			<div id="sources" class="tabContent">
				<div class="tabContentLeft">
					<!--sources_menu-->
					<div class="top_menu">
						<div class="left">
							<input id="search" style="outline: none; width: 90px"
								value=" 搜索文件名" type="text" class="searchOutText" />
							<div id="clearsearch" title='清除搜索' class='clearbtn'
								style="display: none;"></div>
						</div>
						<div class="left">文件夹：</div>

						<div class="left">
							<s:select list="#request['albumList']" listKey="key"
								cssClass="text" listValue="value" name="albumId" id="picForder"
								theme="xhtml" onchange="changeResFiles(this)" />
						</div>
						<div class="left">
							<input id="managerSiteImg" type="button" value="管理"
								onclick="window.open('/user_v2/album/albumshow')" />
						</div>

					</div>

					<div class="clearfloat"></div>

					<!--File show  "position:relative;"直写外面为了IE6下出现解析异常-->
					<div id="showResFilesContent" class="showFilesContent"
						style="position: relative;">
								<div class="pro-load" style="width:470px;height:300px;">&nbsp;</div>
						</div>
					<!--//end File show-->

					<div class="clearfloat"></div>

					<div class="pageContainer">
						<a id="prePageBtn2" href="javascript:;" hidefocus="true"
							style="margin-right: 5px; outline: none">上一页</a> <span
							id="currentPageBtn2"></span> <a id="nextPageBtn2"
							href="javascript:;" hidefocus="true"
							style="margin-left: 5px; outline: none">下一页</a>
					</div>

				</div>
			</div>
			<div id="icon" class="tabContent">
				<div class="tabContentLeft">
					<!--sources_menu-->
					<div class="top_menu">
						<div class="left">
							<input id="searchicon" style="outline: none; width: 90px"
								value=" 搜索文件名" type="text" class="searchOutText" />
							<div id="clearsearchicon" title='清除搜索' class='clearbtn'
								style="display: none;"></div>
						</div>
					</div>

					<div class="clearfloat"></div>

					
					<div id="iconContent" class="showFilesContent"
						style="position: relative;">
								<div class="pro-load" style="width:470px;height:300px;">&nbsp;</div>
						</div>
					<!--//end File show-->

					<div class="clearfloat"></div>

					<div class="pageContainer">
						<a id="prePageBtn3" href="javascript:;" hidefocus="true"
							style="margin-right: 5px; outline: none">上一页</a> <span
							id="currentPageBtn3"></span> <a id="nextPageBtn3"
							href="javascript:;" hidefocus="true"
							style="margin-left: 5px; outline: none">下一页</a>
					</div>

				</div>
			</div>

		</div>
		<ul class="choiceFileList" id="choiceFileList">
		</ul>
		<s:hidden id="pic_num" value="%{#parameters.pn[0]}"></s:hidden>
		<s:hidden id="pageType" value="%{#parameters.pageType[0]}"></s:hidden>
		<div class="submitBtn"
			style="left: 516px; position: absolute; top: 37px; width: 160px;">
			<input type="button" id="submitBtn" class="button blue" value="提交"></input><input
				id="cboxCloseBtn" type="button" class="button white" value="关闭"></input>
		</div>
		<div class="clear"></div>

	</div>
</body>
</html>