define("BaseModel",["jquery","underscore","backbone","dialog","BaseUtils"],function(t,e,s){var i,a,n,l;i=t("backbone"),a=t("dialog"),l=t("BaseUtils"),n=i.Model.extend({defaults:{checked:!1,children:[]},baseId:"",url:function(){var t=this.baseUrl;if(!t)return"";"function"===Est.typeOf(t)&&(t=t.call(this)),this.params=this.params?this.params:"";var e=Est.isEmpty(this.params)?"":"?";return this.isNew()&&Est.isEmpty(this.id)?t+e+this.params:t+("/"==t.charAt(t.length-1)?"":"/")+this.id+e+this.params},_initialize:function(){this.validateMsg=null,debug("9.BaseModel._initialize")},parse:function(t){var e=this;if(Est.isEmpty(t)){var s="function"===Est.typeOf(this.url)?this.url():this.url;return debug("服务器返回的数据为空， 点击"+s+"是否返回数据？无？ 检查XxxModel中的baseUrl、baseId参数是否配置正确？还无？联系王进"),l.tooltip("数据异常, 稍后请重试！"),!1}if(t.msg&&!this.hideTip){var i=[];t.success?(e.isNew()&&i.push({value:"继续添加",callback:function(){e.set("id",null),e.set(e.baseId,null)}}),i.push({value:"确定",callback:function(){if("undefined"!=typeof window.topDialog)window.topDialog.close(),window.topDialog=null,$&&$(".btn-back").click();else try{app.getDialogs().pop().close().remove()}catch(t){}this.close()},autofocus:!0})):i.push({value:"确定",callback:function(){this.close()},autofocus:!0}),a({title:"提示：",content:t.msg,width:250,button:i}).show()}if("boolean"===Est.typeOf(t.success)&&!t.success)return e.attributes._response=t,e.attributes;if(t.attributes&&t.attributes.data){var n=Est.keys(t.attributes);n.length>1&&Est.each(n,function(e){"data"!==e&&(t.attributes.data[e]=t.attributes[e])}),t=t.attributes.data}return t&&(t.id=t[e.baseId||"id"],t.checked=!1,t.time=(new Date).getTime()),t},_saveField:function(t,e,s){var i=s.async||!0,a=new e.initModel({id:t.id||e.model.get("id")});a.clear(),a.set(t),a.set("silent",!0),s.hideTip&&(a.hideTip=!0),a.set("editField",!0),debug(function(){return a.baseUrl?void 0:"当前模型类未找到baseUrl, 请检查XxxModel中的baseUrl"},{type:"error"}),a.baseUrl&&a.save(null,{success:function(i,a){"undefined"!=typeof s.success&&s.success.call(e,t,a)},wait:i})},_getChildren:function(t){return _.map(this.get("children"),function(e){return"string"==typeof e||"number"==typeof e?t.get(e):e})},_toggle:function(){this.set("checked",!this.get("checked"))},_validation:function(t,e){return!t.silent&&e&&e.call(this,t),this.validateMsg}}),s.exports=n});