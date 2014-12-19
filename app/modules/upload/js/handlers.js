var swfu;
var itemList = [];
var $sortlist = $("#choiceFileList");
var maxPicLength = 9;
var printSrcResFilesList=[];
var printIconResFilesList = [];
var uploadFilesList = [];
var choiceLength = 0;
var resFilesList = [];//存储图片
var resIconFilesList = [];//存储图标
var filterFilesList = [];//过滤图片
var file_setting_type_list = ["jpg","jpeg","bmp","png","gif"];
var checkList = [];
var sortOption = {
	opacity : 0.6,
	revert : true,
	cursor : 'move',
	handle : '.isCheck'
};
var totalCount=0;
//文件上传分页
var pageOption1 = {
	PAGE:1,
	PAGE_SIZE:15,
	FILTER_RESULT:[]			//筛选结果
};
//资源库分页
var pageOption2 = {
	PAGE:1,
	PAGE_SIZE:15,
	FILTER_RESULT:[],				//筛选结果
	FILTER_NAME:'', 				//筛选关键字
	FILTER_GROUP_KEY:0,				//筛选默认组
	SORT_DESC:true,
	PAGE_BTN:"PageBtn2"
};
//图标分页
var pageOption3 = {
	PAGE:1,
	PAGE_SIZE:15,
	FILTER_RESULT:[],				//筛选结果
	FILTER_NAME:'', 				//筛选关键字
	FILTER_GROUP_KEY:0,				//筛选默认组
	SORT_DESC:true,
	PAGE_BTN:"PageBtn3"
};
var options = {
	// Backend Settings
	upload_url : "/commonutil/uploadUtil2",
	post_params : {
		"username" : username,
		"id":$("#albumId").val()
	},

	// File Upload Settings
	file_size_limit : "2MB", // 2MB
	file_types : "*.jpg;*.gif;*.jpeg;*.png;*.bmp",
	file_types_description : "JPG Images",
	file_upload_limit : "12",

	// Event Handler Settings - these functions as defined in Handlers.js
	// The handlers are not part of SWFUpload but are part of my website and
	// control how
	// my website reacts to the SWFUpload events.
	file_queue_error_handler : fileQueueError,
	file_dialog_complete_handler : fileDialogComplete,
	upload_progress_handler : uploadProgress,
	upload_error_handler : uploadError,
	upload_success_handler : uploadSuccess,
	upload_complete_handler : uploadComplete,

	// Button Settings
	button_image_url : "upload/images/swfuploadbtn3.png",
	button_placeholder_id : "uploadButton",
	button_width : 71,
	button_height : 23,
	button_text : '',
	button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 12pt; } .buttonSmall { font-size: 10pt; }',
	button_text_top_padding : 0,
	button_text_left_padding : 18,
	button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
	button_cursor : SWFUpload.CURSOR.HAND,

	// Flash Settings
	flash_url : "upload/js/swfupload.swf",

	custom_settings : {
		upload_target : "showNewUploadFileContent"
	},

	// Debug Settings
	debug : false
};

function fileQueueError(file, errorCode, message) {
	try {
		var imageName = "error.gif";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "上传图片不能超过"+option.file_upload_limit+"张.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			alert("上传文件字符大小不能为0");
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			alert("文件过大，最大为2M");
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		default:
			alert(message);
			break;
		}

		//addImage("images/" + imageName);

	} catch (ex) {
		this.debug(ex);
	}

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {

	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  "uploadProcess");
		progress.setProgress(percent);
		if (percent === 100) {
			progress.setStatus("创建缩略图...");
			progress.toggleCancel(false, this);
		} else {
			progress.setStatus("上传中...");
			progress.toggleCancel(true, this);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file,  this.customSettings.upload_target);
		var l = serverData.length;
		var s = serverData.substring(1,l-34);
		var id = serverData.substring(l-33,l-1);
		$("#"+this.customSettings.upload_target).removeClass("startToUpload");
		addImage(s.replace(/\\/g,""),id,file.name);

		progress.setStatus("缩略图生成完毕.");
		progress.toggleCancel(true);


	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			this.startUpload();
		} else {
			var progress = new FileProgress(file,  this.customSettings.upload_target);
			progress.setComplete();
			progress.setStatus("所有图片上传完毕.");
			progress.toggleCancel(false);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	var imageName =  "error.gif";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("取消");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("停止");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "uploadlimit.gif";
			break;
		default:
			alert(message);
			break;
		}
		$("#"+this.customSettings.upload_target).removeClass("startToUpload");
		addImage("images/" + imageName);

	} catch (ex3) {
		this.debug(ex3);
	}

}
function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
}

function createImage(src,id,option){
	var container = document.createElement("li");
	container.setAttribute("id",id);
	
	//设置选中
	if(typeof(option.isCheck) != 'undefined'&& option.isCheck ==true)
	$(container).addClass("isCheck ");
	
	//绑定事件
	if(typeof(option.type) != 'undefined'&& option.type ==1){
	addEventHandler(container,"click",function(){
			addPic(container,id);
	});
	}
	
	//功能按钮
	var checkImg = "<div class='fnicon'> </div>";
	var $checkImg = $(checkImg);
	$(container).append($checkImg);
	addEventHandler($($checkImg).get(0),"click",function(){
		removePic($($checkImg).get(0),id);
	});
	
	var containerSpan = document.createElement("span");
	container.appendChild(containerSpan);
	
	//文件名称
	var fileNameDiv = document.createElement("div");
	fileNameDiv.setAttribute("class","fileName");
	if("fileName" in option){
		fileNameDiv.innerHTML=option.fileName;
	}
	container.appendChild(fileNameDiv);
	
	
	if(typeof(option.type) != 'undefined'&& option.type ==2){
		addEventHandler(checkImg,"click",function(){
				removePic(checkImg,id);
		});
	}
	
	//图片
	var newImg = document.createElement("img");
	containerSpan.appendChild(newImg);
	/*if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}*/

	newImg.onload = function () {
		//fadeIn(newImg, 0);
		var imgW,imgH;
			imgW =  newImg.width 
			imgH = 	newImg.height; 
		
		if(imgW > imgH){
			newImg.setAttribute("width","78");
		}else{
			newImg.setAttribute("height","80");
		}
		
	};
	newImg.src = src;
	return container;
}

function addImage(src,id,name) {
	var checkFlag = true;
	if((maxPicLength-choiceLength)==0){
		checkFlag = false;
	}
	uploadFilesList.push(createImage(src, id,{type:1,isCheck:checkFlag,fileName:name}));
	
	//存储结果
	resFilesList.unshift({
		id:id,
		serverPath:src,
		isCheck:checkFlag,
		belongId:$("#albumId").val(),
		fileName:name
	});
	
	//向上传页面添加图片
	document.getElementById("showNewUploadFileContent").appendChild(
			createImage(src, id,{type:1,isCheck:checkFlag,fileName:name}));
	//向选择页添加图片
	if(checkFlag){
		document.getElementById("choiceFileList").appendChild(createImage(src, id,{type:2,isCheck:true,fileName:name}));
		$("#choiceFileList").sortable();
		reBindChoiceFileList();
		choiceLength++;
	}
	//向资源库添加图片
	pageOption2.FILTER_RESULT= resFilesList;
	showResFilesList();
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */

function FileProgress(file, targetID) {
	this.fileProgressID = "divFileProgress";

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.style.display="display";
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";
	this.fileProgressElement.style.display="none";
};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfuploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};
