
function changeAlbumId(obj) {
	var id = $.trim($(obj).val());
	if (id.length > 0) {
		options.post_params = {
			'username' : username,
			"albumId" : id
		};
		$(".uploadButtonWrap").html("<span id='uploadButton'></span>");
		swfu = new SWFUpload(options);
	}
}
function popupAddProp() {
	art.dialog.prompt('请输入文件夹名称', function(data, topWin) {
		if (data.trim() == '') {
			art.dialog.alert('文件夹名称不能为空！');
			return false;
		}
		paramName = data;
		$.ajax({
			type : "post",
			url : "/user_v2/album/albumajaxAdd.action",
			data : {
				name : paramName,
				adesc : ''
			},
			success : function(result) {
				$("#albumId").append(
						'<option value="' + result + '" selected="selected">'
								+ data + '</option>');
			}
		});
	});
}

function addPic(obj, id) {
	
	var isCheck = $(obj).hasClass("isCheck");
	if(maxPicLength==1&& isCheck==false){
		$("#choiceFileList .fnicon").click();
	}
	var $choiceFileList = $("#choiceFileList");
	if (isCheck) {
		for ( var i = 0, len = itemList.length; i < len; i++) {
			var sourceObj = itemList[i];
			if (itemList[i] === obj) {
				itemList.splice(i, 1);
			}
		}
		$("#"+id,$("#showNewUploadFileContent")).removeClass("isCheck");
		$("#"+id,$("#showResFilesContent")).removeClass("isCheck");
		$("#"+id,$("#choiceFileList")).removeClass("isCheck");
		$choiceFileList.sortable();
		resetCheckOfFilesList(id,false);
		choiceLength--;
	} else if((maxPicLength-choiceLength)!=0){
		itemList.push(obj);
		$("#"+id,$("#showNewUploadFileContent")).addClass("isCheck");
		$("#"+id,$("#showResFilesContent")).addClass("isCheck");
		$("#"+id,$("#iconContent")).addClass("isCheck");
		$temp = $(obj).clone();
		$choiceFileList.append($temp);
		$(".fnicon",$temp).bind("click",function(){
			removePic($(this),$temp.attr("id"))	
		});
		$choiceFileList.sortable();
		resetCheckOfFilesList(id,true);
		choiceLength++;
	}
	reBindChoiceFileList();
}
function removePic(obj,id){
	
	$("#"+$(obj).parents(".isCheck").attr("id"),$("#showNewUploadFileContent")).removeClass("isCheck");
	$("#"+$(obj).parents(".isCheck").attr("id"),$("#showResFilesContent")).removeClass("isCheck");
	$("#"+$(obj).parents("li:first").attr("id"),$("#iconContent")).removeClass("isCheck");
	$(obj).parents(".isCheck").remove();
	resetCheckOfFilesList(id,false);
	choiceLength--;
	
}
function resetCheckOfFilesList(id,flag){
	for(var i = 0,len=resFilesList.length;i<len;i++){
		if(id==resFilesList[i].id){
			resFilesList[i].isCheck = flag;
		}
	}
}
function loadSrcResFilesList(){
	$("#showResFilesContent").addClass("ajaxLoading2").find(".noFile").text("正在加载中...");
	$.ajax({
		type	: "post",
		url		: "/user_v2/album/albumajaxopen",
		data	: {
			
		},
		cache	: false,
		success	: function(result){
			printSrcResFilesList = $.parseJSON(result);
			
			$("#showResFilesContent").removeClass("ajaxLoading2")
			
			// 重新初始化FileList
			initResFilesList();
			
			// 再次调用显示资源库文件
			showResFilesList();
			
			initSearchMoudle();
		}
	});
}
function loadIconList(){
	$("#showResFilesContent").addClass("ajaxLoading2").find(".noFile").text("正在加载中...");
	$.ajax({
		type : "post",
		url : "/user_v2/album/albumajaxIconOpen",
		data : {

		},
		cache : false,
		success : function(result) {
			
			printIconResFilesList = $.parseJSON(result);
			
			$("#iconContent").removeClass("ajaxLoading2")
			
			// 重新初始化FileList
			initIconFilesList();
			
			// 再次调用显示资源库文件
			showIconList();
			
			initIconSearchMoudle();
			
		}
	})
}
//取源数据进行组装实际使用的资源列表数据
function initResFilesList(){
	var newResFilesList = [];
	$.each(printSrcResFilesList, function(i, srcFile){
		var newFile = {};
		newFile["id"] = srcFile["attId"];
		newFile["serverPath"] = srcFile["serverPath"];
		newFile["isCheck"] = false;
		newFile["belongId"] = srcFile["belongId"];
		newFile["fileName"] = srcFile["filename"];
		// 重放进全局使用的filesList
		newResFilesList.push(newFile);
	});
	
	
	//合并图片
	if(resFilesList.length>0){
		Array.prototype.push.apply(resFilesList,newResFilesList);
	}else{
		resFilesList = newResFilesList;
	}
	pageOption2.FILTER_RESULT = resFilesList.slice(0);
	
}
function initIconFilesList(){
	var newResFilesList = [];
	$.each(printIconResFilesList, function(i, srcFile){
		var newFile = {};
		newFile["id"] = srcFile["attId"];
		newFile["serverPath"] = srcFile["serverPath"];
		newFile["isCheck"] = false;
		newFile["belongId"] = srcFile["belongId"];
		newFile["fileName"] = srcFile["filename"];
		// 重放进全局使用的filesList
		newResFilesList.push(newFile);
	});
	//合并图片
	resIconFilesList = newResFilesList;
	pageOption3.FILTER_RESULT = resIconFilesList.slice(0);
}
function clearAllNode(parentNode){
    while (parentNode.firstChild) {
      var oldNode = parentNode.removeChild(parentNode.firstChild);
       oldNode = null;
     }
   } 

function showFiles($cont,pageType){
	var resFilesList2 = getListByPage(pageType.PAGE,pageType.PAGE_SIZE,pageType);
	if(resFilesList2.length > 0){
		for(i=0,len = resFilesList2.length;i<len;i++){
			var obj = resFilesList2[i];
			$cont.append(createImage(obj["serverPath"],obj["id"],{type:1,isCheck:obj["isCheck"],fileName:obj["fileName"]}));
		}
	}else{
		var tr = "";
		if(file_setting_type_list.length > 0){
			tr = "<div class=\"noFile\">资源库中没有当前类型的文件</div>";
		}else{
			tr = "<div class=\"noFile\">资源库还没有文件</div>";
		}
		$cont.append(tr);
	}
	
	var maxPage = totalCount % pageType.PAGE_SIZE == 0 ? totalCount / pageType.PAGE_SIZE : Math.floor(totalCount/pageType.PAGE_SIZE) + 1;
	if(maxPage == 0) { maxPage = 1; };//防止没有数据时
	if(pageType.PAGE > maxPage){ pageType.PAGE = maxPage };
	$('#current'+pageType.PAGE_BTN).html(pageType.PAGE + '/' + maxPage + '页');
	/* page button 可视性 add by shynee 2011-6-23 */
	if(maxPage == 1){
		disabledPageBtn( 'pre'+pageType.PAGE_BTN, true ,pageType);
		disabledPageBtn( 'next'+pageType.PAGE_BTN, true ,pageType);
	}else{
		if( pageType.PAGE == maxPage ){
			disabledPageBtn( 'pre'+pageType.PAGE_BTN, false,pageType );
			disabledPageBtn( 'next'+pageType.PAGE_BTN, true,pageType );
		} else if ( pageType.PAGE == 1 ) {
			disabledPageBtn( 'pre'+pageType.PAGE_BTN, true ,pageType);
			disabledPageBtn( 'next'+pageType.PAGE_BTN, false ,pageType);
		} else {
			disabledPageBtn( 'pre'+pageType.PAGE_BTN, false,pageType );
			disabledPageBtn( 'next'+pageType.PAGE_BTN, false ,pageType);
		}
	}
}
//显示资源库的文件列表
function showResFilesList(){
	clearAllNode(document.getElementById("showResFilesContent"))
	showFiles($("#showResFilesContent"),pageOption2);
}

//显示图标文件
function showIconList(){
	clearAllNode(document.getElementById("iconContent"))
	showFiles($("#iconContent"),pageOption3);
}

function bindImgHover(){
	$.each(uploadFilesList,function(){
		$("#showResFilesContent").prepend(this);
	});
}


function getListByPage(page,pageSize,pageType){
	var newAllList = new Array();
	var newList = new Array();
	
	newAllList = pageType.FILTER_RESULT;
	totalCount = newAllList.length;
	
	var maxPage = totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount/pageSize) + 1;
	page = page < 1 ? 1 : page;
	page = page > maxPage ? maxPage : page;
	var start = ((page - 1) * pageSize < 0) ? 0 : ((page - 1) * pageSize);
	var end = (start + pageSize) < 0 ? 0 : (start + pageSize);
	end = end > totalCount ? totalCount : (start + pageSize);
		
		for(i = start; i < end ; i++){
			newList.push(newAllList[i]);
		}
	return newList;
}

function disabledPageBtn( btnId , disabled,pageType ){
	var btn = $('#' + btnId);
	if( disabled ){
		btn.addClass('disablePageBtn');
		btn.unbind('click');
	}else{
		btn.removeClass('disablePageBtn');
		btn.unbind('click');
		if( btnId == ('pre'+pageType.PAGE_BTN )){
			btn.bind('click', function(){
				if(pageType.PAGE_BTN =='PageBtn2')
					prePage(pageType,resFilesList,showResFilesList);
				else
					prePage(pageType,resIconFilesList,showIconList);
				return false;
			})
		}else{
			btn.bind('click', function(){
				if(pageType.PAGE_BTN =='PageBtn2')
					nextPage(pageType,resFilesList,showResFilesList);
				else
					nextPage(pageType,resIconFilesList,showIconList);
				return false;
			})
		}
	}
}
function nextPage(pageType,list,callback){
	if(list && list.length > 0){
		var totalCount = list.length;
		var maxPage = totalCount % pageType.PAGE_SIZE == 0 ? totalCount / pageType.PAGE_SIZE : Math.floor(totalCount/pageType.PAGE_SIZE) + 1;
		if(pageType.PAGE + 1 <= maxPage){
			pageType.PAGE++;
		}
		$("#checkall").attr("checked", false);
		callback();
	}
}
function prePage(pageType,list,callback){
	if(list && list.length > 0){
		if(pageType.PAGE - 1 > 0){
			pageType.PAGE--;
		}
		$("#checkall").attr("checked", false);
		callback();
	}
}
function changeResFiles(obj){
	var id = $(obj).val();
	pageOption2.FILTER_RESULT.length=0;
	for(var i = 0,len = resFilesList.length;i<len;i++){
		if(resFilesList[i].belongId==id){
			pageOption2.FILTER_RESULT.push(resFilesList[i]);
		}
	}
	showResFilesList();
}
function filterThisKeyWord2(){
	var filterResult = [];
	$(resFilesList).each(function(i,obj){
		if((obj.fileName.toLowerCase()).indexOf(pageOption2.FILTER_NAME) >= 0){
					filterResult.push(obj);
		}
	});
	pageOption2.FILTER_RESULT = filterResult;
}
function filterThisKeyWord3(){
	var filterResult = [];
	$(resIconFilesList).each(function(i,obj){
		if((obj.fileName.toLowerCase()).indexOf(pageOption3.FILTER_NAME) >= 0){
					filterResult.push(obj);
		}
	});
	pageOption3.FILTER_RESULT = filterResult;
}
function searchModule(serTextObj,clearBtnObj,pageType,callback){
	//搜索绑定
	var timer = null;
	$(clearBtnObj).hide();
	$(serTextObj).focusout(function(){
		if($(this).val()==""){
			$(clearBtnObj).hide();
		}
	});
	$(serTextObj).focusin(function(){
		if($(this).val()==" 搜索文件名"){
			if($(this).hasClass("searchOutText")){
				$(this).removeClass("searchOutText");
			}
			$(this).val("");
		}
	}).focusout(function(){
		if($(this).val()==""){
			$(this).addClass("searchOutText");
			$(this).val(" 搜索文件名");
		}
	});
	
	//搜索
	$(serTextObj).keyup(function(){
		var _this = this;
		timer&&clearTimeout(timer);
		timer = setTimeout(function(){
			$("#checkall").attr("checked", false);
			var keyword = $(_this).val();
			pageType.FILTER_NAME = keyword.toLowerCase();
			callback();
			if($(_this).val()!=""){
				$(clearBtnObj).show();
			}
		},500);
		
	});
	
	//清除搜索
	$(clearBtnObj).bind("click",function(){
		$(serTextObj).val('');
		var keyword = $(this).val();
		pageType.FILTER_NAME = keyword.toLowerCase();
		callback();
		if(!$(serTextObj).hasClass("searchOutText")){
			$(serTextObj).addClass("searchOutText");
		}
		$(serTextObj).val(" 搜索文件名");
		$(clearBtnObj).hide();
	});
			
}
function initIconSearchMoudle(){
	searchModule($("#searchicon"),$("#clearsearchicon"),pageOption3,function(){
		filterThisKeyWord3();
		showIconList();
	});
}

function initSearchMoudle(){
	searchModule($("#search"),$("#clearsearch"),pageOption2,function(){
		filterThisKeyWord2();
		showResFilesList();
	});
}

function reBindChoiceFileList(){
	$("#choiceFileList li").unbind("hover");
	$("#choiceFileList li").hover(function(){
		$(this).find(".fnicon").show();
	},function(){
		$(this).find(".fnicon").hide();
	});
}
function closeUploadDialog(){
	parent.$("#cboxClose").click();
	parent.$(".xheModalClose").click();
	parent.$(".aui_close").click();	
	return true;
}

(function($){ $.getUrlParam = function(name) { var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"), r = window.location.search.substr(1).match(reg); if (r !=null) return unescape(r[2]); return null; } })(jQuery);
$(function() {
	
	maxPicLength = parseInt($("#pic_num").val());
	$("#tabs").tabs();
	// tab绑定点击资源库加载
	$("#sources_select").one("click", function(){
		loadSrcResFilesList();
	});
	
	$("#icon_select").one("click",function(){
		loadIconList();
	});
	
	changeAlbumId($("#albumId"));
	$("#choiceFileList").sortable({
	});
	/*$("#choiceFileList li").live("mouseover",function(){
		$(this).find(".check").show();
	});
	$("#choiceFileList li").live("mouseout",function(){
		$(this).find(".check").hide();
	});*/
	$("#submitBtn").click(function(){
		
		var alubmArr = [],
			pageType = $.getUrlParam("pageType"),
			valueId = $.getUrlParam('valueId'),
			callbackFn = $.getUrlParam('callbackFn');
		var items = $("#choiceFileList li");
		$.each(items,function(){
			alubmArr.push({
				src:$(this).find("img").attr("src"),
				id:$(this).attr("id"),
				fileName:$(this).find(".fileName").html()
			});
		});
		
		if(valueId){
            var val = valueId,
                src = alubmArr[0].src,
                src = src.substring(src.indexOf("upload"), src.length);
            parent.$("#"+val).val(src.replace("_5",''));
        }
        if(typeof(callbackFn)=='string' && callbackFn.length >0){
            var src = alubmArr[0].src,
                src = src.substring(src.indexOf("upload"), src.length),
                fns = callbackFn.split("."),
                callbackFns = parent;
            for(var i = 0,len = fns.length;i<len;i++){
                callbackFns = callbackFns[fns[i]];
            }
            callbackFns(src.replace("_5",''), valueId);
            closeUploadDialog();
        }
		if (pageType =='xheditor'){
			var img = "";
			$.each(alubmArr,function(){
				img+="<img src='"+this.src.replace("_5","")+"' alt='"+this.fileName+"'/>";
			});
			callback(img);
		}
		else if(pageType == 'fn'){
            parent.doPicSetFn(alubmArr);
            if(typeof(parent.$.colorbox) !='undefind'){
                parent.$.colorbox.close();
            }
        }
		else{
			parent.doPicSetFn(alubmArr);
			if(typeof(parent.$.colorbox) !='undefind'){
				parent.$.colorbox.close();
			}
		}
        if(typeof(parent.$.colorbox) !='undefind'){
            parent.$.colorbox.close();
        }
		
		
		
		//if(typeof(parent.art.dialog)!='undefined')
			//parent.art.dialog.close();
	});
	$("#cboxCloseBtn").click(function(){
		closeUploadDialog();
	});
});