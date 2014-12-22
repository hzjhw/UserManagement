define("BaseModel",["jquery","underscore","backbone","dialog"],function(e,t,i){var n,s,a;n=e("backbone"),s=e("dialog"),a=n.Model.extend({defaults:{checked:!1,children:[]},baseId:"",url:function(){var e=this.baseUrl;return e?this.isNew()&&!this.id?e:e+("/"==e.charAt(e.length-1)?"":"/")+this.id:""},_initialize:function(){this.validateMsg=null,debug("10.BaseModel._initialize [add to collection] or 3.[add to detail]")},parse:function(e){var t=this;if(e.msg&&!this.hideTip){var i=[];e.success?(i.push({value:"继续添加",callback:function(){t.set("id",null),t.set(t.baseId,null)}}),i.push({value:"确定",callback:function(){"undefined"!=typeof window.detailDialog&&window.detailDialog.close(),this.close()},autofocus:!0})):i.push({value:"确定",callback:function(){this.close()},autofocus:!0}),s({title:"提示：",content:e.msg,width:250,button:i}).show()}return e.attributes&&(e=e.attributes.data),e.id=e[t.baseId],e.checked=!1,e.time=(new Date).getTime(),e},_saveField:function(e,t,i){var n=i.async||!0,s=new t.initModel({id:e.id||t.model.get("id")});s.clear(),s.set(e),s.set("silent",!0),i.hideTip&&(s.hideTip=!0),s.set("editField",!0),s.save(null,{success:function(n,s){"undefined"!=typeof i.success&&i.success.call(t,e,s)},wait:n})},_getChildren:function(e){return _.map(this.get("children"),function(t){return"string"==typeof t||"number"==typeof t?e.get(t):t})},_toggle:function(){this.set("checked",!this.get("checked"))},_validation:function(e,t){return!e.silent&&t&&t.call(this,e),this.validateMsg}}),i.exports=a});