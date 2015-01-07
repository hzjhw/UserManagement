define("BaseItem",["jquery","underscore","backbone","dialog","HandlebarsHelper","BaseUtils"],function(e,t,i){var o,s,l,n,d;o=e("backbone"),s=e("dialog"),n=e("HandlebarsHelper"),d=e("BaseUtils"),l=o.View.extend({constructor:function(e){this.options=e||{},o.View.apply(this,arguments)},_initialize:function(e){var t=this;this._options=e||{},this.model.stopCollapse=!1,Est.extend(this._options,this.options),this.collapsed=this.model.get("_options")?this.model.get("_options")._extend:!1,this._options.template&&(this.template=n.compile(this._options.template)),this.model.bind("reset",this.render,this),this.model.bind("change",this.render,this),this.model.bind("destroy",this.remove,this),this.model.view&&this.model.view.remove(),this.model.view=this,this.model.get("dx")%2===0&&this.$el.addClass("bui-grid-row-even");var i=this.model.get("id")||"";this.$el.addClass("_item_el_"+i.replace(/^[^1-9]+/,"")),this.$el.hover(function(){t.$el.addClass("hover")},function(){t.$el.removeClass("hover")}),this._options.enterRender&&this._enterEvent()},_render:function(){debug("12.do BaseItem._render [item render]"),this._onBeforeRender(),this._options&&this._options.filter&&this._options.filter.call(this,this.model),this.$el.html(this.template(this.model.toJSON())),this._options.modelBind&&this._modelBind();var e=this.model.get("_options");if(e._subRender&&this.model.get("children")&&this.model.get("children").length>0){var t=this,i=null,o=this.model.get("level")||1,s=this.$(e._subRender+":first");this._setupEvents(e),_.each(this.model._getChildren(e._collection),function(l){e._items&&(l=new e._model(l)),l.set("_options",e),l.set("level",o+1),i=new e._item({model:l,data:t._options._data}),i._setInitModel(t.initModel),i._setViewId(t._options.viewId),s.append(i.$el),i._render()})}return this._onAfterRender(),this},_setViewId:function(e){this._options.viewId=e},_setInitModel:function(e){this.initModel=e},_enterEvent:function(){var e=this;e._options.enterRender&&this.$("input").keyup(function(t){t.keyCode===CONST.ENTER_KEY&&e.$(e._options.enterRender).click()})},_setupEvents:function(e){var t=this;t._toggleCollapse.call(this,e),this.$(e._collapse+":first").click(function(){t._toggleCollapse.call(t,e)})},_toggleCollapse:function(e){var t=this;this.model.stopCollapse||(t.collapsed=!t.collapsed,t.collapsed?(this.$(e._collapse+":first").removeClass("x-caret-down"),this.$(e._subRender+":first").slideUp(CONST.COLLAPSE_SPEED).addClass("hide")):(this.$(e._collapse+":first").addClass("x-caret-down"),this.$(e._subRender+":first").slideDown(CONST.COLLAPSE_SPEED).removeClass("hide")))},_onBeforeRender:function(){return new Est.promise(function(){})},_onAfterRender:function(){return new Est.promise(function(){})},_close:function(){debug("BaseItem._close"),this.stopListening()},_clear:function(){debug("ProductItem._clear"),this.model.destroy()},_toggleChecked:function(e){if(this._checkAppend="undefined"==typeof this.model.get("_options")._checkAppend?!0:this.model.get("_options")._checkAppend,this.model.set("checked",this._checkAppend?!this.model.get("checked"):!0),this.model.get("checked")?this._itemActive({add:this._checkAppend}):this.$el.removeClass("item-active"),e.shiftKey){var t=app.getData("curChecked"),i=this.model.collection.indexOf(this.model);Est.each(this.model.collection.models,function(e){e.get("dx")>t&&e.get("dx")<i&&(e.set("checked",!0),e.view.$el.addClass("item-active"))})}else app.addData("curChecked",this.model.collection.indexOf(this.model));e&&e.stopImmediatePropagation()},_itemActive:function(e){e=e||{};var t=app.getData("itemActiveList");e.add||(Est.each(t,function(e){var t=$("."+e);t.removeClass("item-active")}),t.length=0),this.$el.addClass("item-active"),t.push(this.$el.attr("class").replace(/^.*(_item_el_.+?)\s+.*$/g,"$1"))},_moveUp:function(e){return e.stopImmediatePropagation(),this._itemActive(),this.collapsed=!0,this._options.viewId?void app.getView(this._options.viewId)._moveUp(this.model):(debug("当前视图viewId不存在，无法完成上移操作，检查new XxxList({})options中的viewId是否定义？",{type:"error"}),!1)},_moveDown:function(e){return e.stopImmediatePropagation(),this._itemActive(),this.collapsed=!0,this._options.viewId?void app.getView(this._options.viewId)._moveDown(this.model):(debug("当前视图viewId不存在，无法完成下移操作，检查new XxxList({})options中的viewId是否定义？",{type:"error"}),!1)},_saveSort:function(){var e=this,t=this.$(".input-sort").val();this.model._saveField({id:this.model.get("id"),sort:t},e,{success:function(){e.model.set("sort",t)},hideTip:!0})},_getPage:function(){var e=this.model.collection.paginationModel;return e?e.get("page"):1},_editField:function(t){var i=this,o=Est.promise;return app.getData("editFieldDialog")&&app.getData("editFieldDialog").close(),new o(function(o){var s=e("dialog"),l=i.model.attributes[t.field],n=s({title:t.title||"修改",content:'<input id="property-returnValue-demo" type="text" class="text" value="'+l+'" />',button:[{value:"确定",autofocus:!0,callback:function(){var e=$("#property-returnValue-demo").val();this.close(e),this.remove()}}]});n.addEventListener("close",function(){var e={},s=i.model.previous(t.field);this.returnValue.length>=1&&this.returnValue!==s&&(e.id=i.model.get("id"),e[t.field]=this.returnValue,i.model._saveField(e,i,{success:function(e){i.model.set(e)}}),o(i,this.returnValue))}),n.show(i.$(t.target||"div").get(0)),app.addData("editFieldDialog",n)})},_modelBind:function(){var e=this;this.$("input, textarea, select").each(function(){$(this).change(function(){var t,i,o=$(this).attr("id");if(o&&-1!==o.indexOf("model")){switch(this.type){case"radio":t=$(this).is(":checked")?$(this).val():i=!0;break;case"checkbox":t=$(this).is(":checked")?Est.isEmpty($(this).attr("true-value"))?!0:$(this).attr("true-value"):Est.isEmpty($(this).attr("false-value"))?!1:$(this).attr("false-value");break;default:t=$(this).val()}i||e.model.set(o.replace(/^model\d?-(.+)$/g,"$1"),t)}})})},_del:function(e){e&&e.stopImmediatePropagation(),debug("1.BaseItem._del");var t=this;app.getData("delItemDialog")&&app.getData("delItemDialog").close(),seajs.use(["dialog-plus"],function(e){var i=e({title:"温馨提示：",content:"是否删除！",width:150,button:[{value:"确定",autofocus:!0,callback:function(){t.model.destroy()}},{value:"取消",callback:function(){this.close()}}]}).show(t.$el.find(".delete").get(0));app.addData("delItemDialog",i)})},_edit:function(e){debug("1.BaseItem._edit");var t=this;this._itemActive(),seajs.use(["dialog-plus"],function(i){window.dialog=i;var o=[];e.hideSaveBtn||o.push({value:"保存",callback:function(){return this.title("提交中.."),this.iframeNode.contentWindow.$("#submit").click(),!1},autofocus:!0}),e.hideResetBtn||o.push({value:"重置",callback:function(){return this.iframeNode.contentWindow.$("#reset").click(),!1}}),o.push({value:"关闭"}),window.detailDialog=i({id:"edit-dialog",title:e.title||"修改",width:e.width||1e3,height:e.height||"auto",url:e.url||t._options.detail+"?id="+t.model.id,button:o,oniframeload:function(){var t=e.load||function(){};this.iframeNode.contentWindow.topDialog=window.detailDialog,this.iframeNode.contentWindow.app=app,t.call(this,this.iframeNode.contentWindow)},onclose:function(){t.model.set(Est.cloneDeep(window.model)),e.reload&&t.model.fetch({wait:!0,success:function(){t.model.reset&&t.model.reset()}}),e.close&&e.close.call(this),this.remove(),window.detailDialog=null,window.model={}}}),window.detailDialog.showModal()})}}),i.exports=l});