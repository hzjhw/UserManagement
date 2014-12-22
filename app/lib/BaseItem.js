define("BaseItem",["jquery","underscore","backbone","dialog","HandlebarsHelper","BaseUtils"],function(e,t,i){var o,s,l,n,d;o=e("backbone"),s=e("dialog"),n=e("HandlebarsHelper"),d=e("BaseUtils"),l=o.View.extend({_initialize:function(e){var t=this;this._options=e||{},this.model.stopCollapse=!1,this.collapsed=this.model.get("_options")?this.model.get("_options")._extend:!1,this._options.template&&(this.template=n.compile(this._options.template)),this.model.bind("reset",this.render,this),this.model.bind("change",this.render,this),this.model.bind("destroy",this.remove,this),this.model.view&&this.model.view.remove(),this.model.view=this,this.model.get("dx")%2===0&&this.$el.addClass("bui-grid-row-even");var i=this.model.get("id")||"";this.$el.addClass("_item_el_"+i.replace(/^[^1-9]+/,"")),this.$el.hover(function(){t.$el.addClass("hover")},function(){t.$el.removeClass("hover")}),this._options.enterRender&&this._enterEvent()},_render:function(){debug("11.ProductItem._render [item display]"),this._onBeforeRender(),this.$el.html(this.template(this.model.toJSON()));var e=this.model.get("_options");if(e._subRender&&this.model.get("children")&&this.model.get("children").length>0){var t=this,i=null,o=this.model.get("level"),s=this.$(e._subRender+":first");this._setupEvents(e),_.each(this.model._getChildren(e._collection),function(l){l.set("_options",e),l.set("level",o+1),i=new e._item({model:l,data:t._options._data}),i._setInitModel(t.initModel),s.append(i.$el),i._render()})}return this._onAfterRender(),this},_setInitModel:function(e){this.initModel=e},_enterEvent:function(){var e=this;e._options.enterRender&&this.$("input").keyup(function(t){t.keyCode===CONST.ENTER_KEY&&e.$(e._options.enterRender).click()})},_setupEvents:function(e){var t=this;t._toggleCollapse.call(this,e),this.$(e._collapse+":first").click(function(){t._toggleCollapse.call(t,e)})},_toggleCollapse:function(e){var t=this;this.model.stopCollapse||(t.collapsed=!t.collapsed,t.collapsed?(this.$(e._collapse+":first").removeClass("x-caret-down"),this.$(e._subRender+":first").slideUp(CONST.COLLAPSE_SPEED).hide()):(this.$(e._collapse+":first").addClass("x-caret-down"),this.$(e._subRender+":first").slideDown(CONST.COLLAPSE_SPEED).show()))},_onBeforeRender:function(){return new Est.promise(function(){})},_onAfterRender:function(){return new Est.promise(function(){})},_close:function(){debug("BaseItem._close"),this.stopListening()},_clear:function(){debug("ProductItem._clear"),this.model.destroy()},_toggleChecked:function(e){this._checkAppend="undefined"==typeof this.model.get("_options")._checkAppend?!0:this.model.get("_options")._checkAppend,this.model.set("checked",this._checkAppend?!this.model.get("checked"):!0),this.model.get("checked")?this._itemActive({add:this._checkAppend}):this.$el.removeClass("item-active"),e&&e.stopImmediatePropagation()},_itemActive:function(e){e=e||{};var t=app.getData("itemActiveList");e.add||(Est.each(t,function(e){$("."+e).removeClass("item-active")}),t.length=0),this.$el.addClass("item-active"),t.push(this.$el.attr("class").replace(/^.*(_item_el_.+?)\s+.*$/g,"$1"))},_moveUp:function(e){e.stopImmediatePropagation(),this._itemActive(),this.collapsed=!0,app.getView(this._options.viewId)._moveUp(this.model)},_moveDown:function(e){e.stopImmediatePropagation(),this._itemActive(),this.collapsed=!0,app.getView(this._options.viewId)._moveDown(this.model)},_saveSort:function(){var e=this,t=this.$(".input-sort").val();this.model._saveField({id:this.model.get("id"),sort:t},e,{success:function(){e.model.set("sort",t)},hideTip:!0})},_editField:function(t){var i=this,o=Est.promise;return app.getData("editFieldDialog")&&app.getData("editFieldDialog").close(),new o(function(o){var s=e("dialog"),l=i.model.attributes[t.field],n=s({title:t.title||"修改",content:'<input id="property-returnValue-demo" type="text" class="text" value="'+l+'" />',button:[{value:"确定",autofocus:!0,callback:function(){var e=$("#property-returnValue-demo").val();this.close(e),this.remove()}}]});n.addEventListener("close",function(){var e={},s=i.model.previous(t.field);this.returnValue.length>=1&&this.returnValue!==s&&(e.id=i.model.get("id"),e[t.field]=this.returnValue,i.model._saveField(e,i,{success:function(e){i.model.set(e)}}),o(i,this.returnValue))}),n.show(i.$(t.target||"div").get(0)),app.setData("editFieldDialog",n)})},_del:function(e){e.stopImmediatePropagation(),debug("1.BaseItem._del");var t=this;app.getData("delItemDialog")&&app.getData("delItemDialog").close(),seajs.use(["dialog-plus"],function(e){var i=e({title:"温馨提示：",content:"是否删除！",width:150,button:[{value:"确定",autofocus:!0,callback:function(){t.model.destroy()}},{value:"取消",callback:function(){this.close()}}]}).show(t.$el.find(".delete").get(0));app.setData("delItemDialog",i)})},_edit:function(e){debug("1.BaseItem._edit");var t=this;this._itemActive(),seajs.use(["dialog-plus"],function(i){window.dialog=i;var o=[];e.hideSaveBtn||o.push({value:"保存",callback:function(){return this.title("正在提交.."),this.iframeNode.contentWindow.$("#submit").click(),!1},autofocus:!0}),e.hideResetBtn||o.push({value:"重置",callback:function(){return this.iframeNode.contentWindow.$("#reset").click(),!1}}),o.push({value:"关闭"}),window.detailDialog=i({id:"edit-dialog",title:e.title||"修改",width:e.width||850,height:e.height||"auto",url:e.url||t._options.detail+"?id="+t.model.id,button:o,oniframeload:function(){var t=e.oniframeload||function(){};this.iframeNode.contentWindow.detailDialog=window.detailDialog,t.call(this,this.iframeNode.contentWindow)},onclose:function(){t.model.set(Est.cloneDeep(window.model)),e.reload&&t.model.fetch({wait:!0,success:function(){t.model.reset()}}),e.close&&e.close.call(this),this.remove(),window.model={}}}),window.detailDialog.showModal()})}}),i.exports=l});