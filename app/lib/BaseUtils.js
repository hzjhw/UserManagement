define("BaseUtils",["jquery","HandlebarsHelper"],function(e,t,i){var a,o;o=e("HandlebarsHelper"),a={initSelect:function(e){var t=Est.promise;return new t(function(t){var i={},a=e.target||"#category",o=e.render||"#s1",n=e.itemId||"value",l=e.width||"150",c=e.items||[];BUI.use("bui/select",function(s){i[o]=new s.Select({render:o,valueField:a,width:l,items:c}),i[o].render(),i[o].on("change",function(i){$(a).val(Est.trim(i.item[n])),"undefined"!=typeof e.change&&e.change.call(this,i.item[n]),t(i.item[n])})})})},openUpload:function(e){"undefined"==typeof e&&console.error("图片上传配置不能为空"),e=Est.extend({title:"上传图片",width:650,height:350,albumId:"",padding:5,username:"",attId:"",auto:!1,replace:!1,type:"local"},e),e.url=CONST.HOST+"/modules/upload/upload.html?albumId="+e.albumId+"&username="+e.username+"&replace="+(e.replace?"01":"00")+"&attId="+e.attId+"&auto="+e.auto+"&uploadType="+e.type,this.iframeDialog(e)},initDate:function(e){BUI.use("bui/calendar",function(t){new t.DatePicker({trigger:e.render||".calendar",showTime:e.showTime||!1,autoRender:!0})})},initCombox:function(e){var t=Est.promise;return new t(function(){var t={},i=e.target||"#category",a=e.render||"#s1",o=(e.itemId||"categoryId",e.width||"500"),n=e.items||[];BUI.use("bui/select",function(e){t[a]=new e.Combox({render:a,showTag:!0,valueField:i,elCls:"bui-tag-follow",width:o,items:n}),t[a].render()})})},initEditor:function(e){seajs.use(["xheditor"],function(){function t(e){$(e).xheditor({tools:"Preview,Fullscreen,Source,|,contact,abbccQQ,abbccMap,abbccLayout,abbccQrcode,|,Table,abbccImages,abbccFlash,Media,|,FontColor,BackColor,|,Align,Underline,Italic,Bold,|,FontSize,Fontface,|,Link,Unlink",layerShadow:2,html5Upload:!1,upBtnText:"浏览",upLinkExt:"jpg,png,bmp",upImgUrl:"/fileUpload/uploadByJson",upFlashUrl:"/fileUpload/uploadByJson",upMediaUrl:"/fileUpload/uploadByJson",upFlashExt:"swf",upMediaExt:"wmv,avi,wma,mp3,mid",linkTag:!0,internalScript:!0,inlineScript:!0})}$(function(){$(e.render||".ckeditor").each(function(){t($(this))})})})},tip:function(e,t){t=t||{time:2e3,title:"提示信息："},seajs.use(["dialog-plus"],function(i){window.dialog=i,window.tipsDialog=i({id:"tip-dialog",title:t.title,width:200,content:e}).show(),setTimeout(function(){window.tipsDialog.close()},t.time)})},comfirm:function(e){var t={title:"温馨提示：",content:"是否删除！",success:function(){},target:null};Est.extend(t,e),seajs.use(["dialog-plus"],function(e){e({title:t.title,content:t.content,width:150,button:[{value:"确定",autofocus:!0,callback:function(){t.success.call(this)}},{value:"取消",callback:function(){this.close()}}]}).show(t.target)})},resetIframe:function(e){var t=$(document).height();try{e?(e.height(t),e.reset()):window.detailDialog&&window.detailDialog.height&&(window.detailDialog.height(t),window.detailDialog.reset())}catch(i){console.error("【error】: BaseDetail.resetIframe"+i)}},dialog:function(e){var t=[];e.success&&t.push({value:"确定",autofocus:!0,callback:function(){e.success.apply(this,arguments)}}),t.push({value:"关闭",callback:function(){this.close()}}),e=Est.extend({title:"对话框",width:150,content:"",button:t},e),e.target&&(e.target=$(e.target).get(0)),"function"==typeof e.load&&(e.oniframeload=e.load),seajs.use(["dialog"],function(t){window[e.id||"dialog"]=t(e).show(e.target)})},initCopy:function(e,t){var i=this;seajs.use(["ZeroClipboard"],function(a){var o=new a($(e).get(0),{moviePath:CONST.HOST+"/swf/ZeroClipboard.swf"});o.on("ready",function(){o.on("copy",function(e){e.clipboardData.setData("text/plain",t.callback||$(e.target).attr("data-clipboard-text"))}),o.on("aftercopy",function(e){i.tip("复制成功",{time:1e3}),console.log("Copied text to clipboard: "+e.data["text/plain"]),t.success&&t.success.call(this,e.data["text/plain"])})}),o.on("error",function(e){a.destroy(),t.failed&&t.failed.call(this,e.message)})})},iframeDialog:function(e){var t=[];e.success&&t.push({value:"确定",autofocus:!0,callback:function(){e.success.call(this)}}),t.push({value:"关闭",callback:function(){this.close()}}),e=Est.extend({title:"窗口",url:"",width:150,height:"auto",target:null,button:t},e),seajs.use(["dialog-plus"],function(t){window[e.id||"iframeDialog"]=t(e).show(e.target)})}},i.exports=a});