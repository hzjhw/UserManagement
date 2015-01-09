define("BaseModel",["jquery","underscore","backbone","dialog","BaseUtils"],function(e,t,i){var s,n,l,a;s=e("backbone"),n=e("dialog"),a=e("BaseUtils"),l=s.Model.extend({defaults:{checked:!1,children:[]},baseId:"",url:function(){var e=this.baseUrl;return e?this.isNew()&&Est.isEmpty(this.id)?e:e+("/"==e.charAt(e.length-1)?"":"/")+this.id:""},_initialize:function(){this.validateMsg=null,debug("9.BaseModel._initialize")},parse:function(e){var t=this;if(Est.isEmpty(e)){var i="function"===Est.typeOf(this.url)?this.url():this.url;return debug("服务器返回的数据为空， 点击"+i+"是否返回数据？无？ 检查XxxModel中的baseUrl、baseId参数是否配置正确？还无？联系王进"),a.tooltip("数据异常, 稍后请重试！"),!1}if(e.msg&&!this.hideTip){var s=[];e.success?(t.isNew()&&s.push({value:"继续添加",callback:function(){t.set("id",null),t.set(t.baseId,null)}}),s.push({value:"确定",callback:function(){"undefined"!=typeof window.topDialog&&(window.topDialog.close(),window.topDialog=null),this.close(),$(".btn-back").click()},autofocus:!0})):s.push({value:"确定",callback:function(){this.close()},autofocus:!0}),n({title:"提示：",content:e.msg,width:250,button:s}).show()}return e.attributes&&(e=e.attributes.data),e&&(e.id=e[t.baseId],e.checked=!1,e.time=(new Date).getTime()),e},_saveField:function(e,t,i){var s=i.async||!0,n=new t.initModel({id:e.id||t.model.get("id")});n.clear(),n.set(e),n.set("silent",!0),i.hideTip&&(n.hideTip=!0),n.set("editField",!0),n.save(null,{success:function(s,n){"undefined"!=typeof i.success&&i.success.call(t,e,n)},wait:s})},_getChildren:function(e){return _.map(this.get("children"),function(t){return"string"==typeof t||"number"==typeof t?e.get(t):t})},_toggle:function(){this.set("checked",!this.get("checked"))},_validation:function(e,t){return!e.silent&&t&&t.call(this,e),this.validateMsg}}),i.exports=l});