define("BaseList",["jquery","underscore","backbone","BaseUtils"],function(t,e,i){var o,n,s;n=t("backbone"),s=t("BaseUtils"),o=n.View.extend({constructor:function(t){this.options=t||{},n.View.apply(this,arguments)},_initialize:function(t){return this._initCollection(t.collection,t)},_initCollection:function(t,e){debug("1.ProductView._initialize"),this._options=e||{};var i=this,o=Est.promise;return this.dx=0,this.views=[],this.$el.empty(),this._options.template&&this.$el.append($(this._options.template)),this._data=this._options.data,this._options.enterRender&&this._enterEvent(),this.list=this._options.render?$(this._options.render):this.$el,this.allCheckbox=this.$("#toggle-all")[0],this._options.sortField="sort",this._options.model||debug('BaseList中initialize参数中未添加模型类， 检查config.js是否addModule("model"), 或头部是否引入'),this.collection||(this.collection=new t),this.options.itemId&&this.collection._setItemId(this.options.itemId),this._options.subRender&&(this.composite=!0),this._initItemView(this._options.item,this),this._initModel(this._options.model),this._initBind(),this._options.items&&Est.each(this._options.items,function(t){this.collection.push(new i.initModel(t))},this),new o(function(t){t(i)})},_render:function(){this._addAll(),debug("BaseList._render")},_filterRoot:function(){var t=this,e=[];t.composite=!1,t.collection.comparator=function(t){return t.get("sort")},t.collection.sort(),Est.each(t.collection.models,function(i){e.push({categoryId:i.attributes[t._options.categoryId],belongId:i.attributes[t._options.parentId]})}),this.collection.each(function(i){for(var o=e.length,n=[];o>0;){var s=e[o-1];s.belongId===i.get(t._options.categoryId)&&(n.unshift(s.categoryId),e.splice(o,1)),o--}i.set("children",n),("01"===i.get("isroot")||!i.get("isroot")&&"/"===i.get("parentId")||!i.get("isroot")&&Est.isEmpty(i.get("parentId")))&&(i.set("level",1),t._addOne(i))}),debug(t.collection)},_addOne:function(t){var e=this;if(!this.filter&&!this.composite){t.set("dx",this.dx++),t.set("_options",{_item:e._options.item,_collection:e.collection,_subRender:e._options.subRender,_collapse:e._options.collapse,_extend:e._options.extend,_checkAppend:e._options.checkAppend});var i=new this.item({model:t,data:this._data});i._setInitModel(this.initModel),this.list.append(i._render().el),this.views.push(i)}},_initPagination:function(t){var e=this;e.collection&&e.collection.paginationModel&&e.collection.paginationModel.on("reloadList",function(i){e._load.call(e,t,i)})},_load:function(t,e){var i=this,o=Est.promise;return t=t||{},new o(function(o){t.beforeLoad&&t.beforeLoad.call(i,i.collection),t.page&&i.collection.paginationModel.set("page",t.page),t.pageSize&&i.collection.paginationModel.set("pageSize",t.pageSize),(t.page||t.pageSize)&&(e=i.collection.paginationModel),i.collection.url&&(i._options.filter&&(i.filter=!0),i._options.subRender&&(i.composite=!0),i.collection._load(i.collection,i,e).then(function(t){0===t.length&&console.log("从服务器上传回来的列表为空！"),i._options.subRender&&i._filterRoot(),i._options.filter&&i._filter(i._options.filter,i._options),o(t)}))})},_initBind:function(){this.collection&&(this.collection.bind("add",this._addOne,this),this.collection.bind("reset",this._render,this))},_enterEvent:function(){var t=this;this._options.enterRender&&this.$("input").keyup(function(e){e.keyCode===CONST.ENTER_KEY&&t.$(t._options.enterRender).click()})},_initItemView:function(t){this.item=t},_initModel:function(t){this.initModel=t},_empty:function(){if(this.dx=0,debug("5.ProductView._empty"),this.collection)for(var t=this.collection.length;t>-1;)this.collection.remove(this.collection[t]),t--;this.collection.paginationModel&&(this.dx=this.collection.paginationModel.get("pageSize")*(this.collection.paginationModel.get("page")-1)),Est.each(this.views,function(t){t.off().remove()}),this.views=[]},_addAll:function(){debug("ProductView._addAll"),this._empty(),this.collection.each(this._addOne,this)},_search:function(t){var e=this;this.filter=!0,t=Est.extend({onBeforeAdd:function(){}},t),this._load({page:1,pageSize:5e3}).then(function(){e.filter=!1,e._filter(t.filter||e._options.filter,t)})},_filter:function(t,e){var i=this,o=[],n=i.collection.models.length;for(i.filter=!1;n>0;){var s=i.collection.models[n-1],l=!0;Est.each(t,function(t){return!l||Est.isEmpty(t.value)||s.attributes[t.key]&&-1!==s.attributes[t.key].indexOf(t.value)?void 0:(i.collection.remove(s),l=!1,!1)}),l&&e.onBeforeAdd&&e.onBeforeAdd.call(this,s),l&&o.unshift(s),n--}Est.each(o,function(t){i._addOne(t)})},_detail:function(t){debug("1.BaseList._detail"),t=t||{};var e=this;seajs.use(["dialog-plus"],function(i){window.dialog=i;var o=[];t.hideSaveBtn||o.push({value:"保存",callback:function(){return this.title("正在提交.."),this.iframeNode.contentWindow.$("#submit").click(),!1},autofocus:!0}),t.hideResetBtn||o.push({value:"重置",callback:function(){return this.iframeNode.contentWindow.$("#reset").click(),!1}}),o.push({value:"关闭"}),window.detailDialog=i({id:"detail-dialog",title:t.title||"添加",height:t.height||"auto",width:t.width||850,padding:t.padding||0,url:t.url||e._options.detail,button:o,oniframeload:function(){this.iframeNode.contentWindow.detailDialog=window.detailDialog,t.oniframeload&&t.oniframeload.call(this,this.iframeNode.contentWindow)},onclose:function(){e._options.subRender&&(e.composite=!0),e.collection._load(e.collection,e).then(function(){e._options.subRender?(e.composite=!0,e._filterRoot()):e._render()}),this.remove(),this.returnValue&&$("#value").html(this.returnValue)}}),window.detailDialog.showModal()})},_toggleAllChecked:function(){var t=this.allCheckbox.checked;this.collection.each(function(e){e.set("checked",t)})},_saveSort:function(t){var e={id:t.get("id")};e[this._options.sortField||"sort"]=t.get(this._options.sortField),t._saveField(e,this,{async:!1,hideTip:!0})},_exchangeOrder:function(t,e,i){var o={},n={},s=this.collection.at(t),l=this.collection.at(e),c=s.view.model.get("dx"),d=l.view.model.get("dx");if(o.dx=d,n.dx=c,i.path){var a=s.view.model.get(i.path),h=l.view.model.get(i.path);o[i.path]=h,n[i.path]=a}return s.view.model.set(o),l.view.model.set(n),this.collection.models[e]=this.collection.models.splice(t,1,this.collection.models[e])[0],e>t?s.view.$el.before(l.view.$el):s.view.$el.after(l.view.$el),i.success&&i.success.call(this,s,l),this},_moveUp:function(t){debug("_moveUp");var e,i,o=this.collection.indexOf(t),n=[];if(this._options.subRender){i=t.get("belongId"),this.collection.each(function(t){i===t.get("belongId")&&n.push(t)});var s=Est.findIndex(n,function(e){return e.get("id")===t.get("id")});if(0===s)return;e=this.collection.indexOf(n[s-1])}else{if(0===o)return;e=o-1}t.stopCollapse=!0,this._exchangeOrder(o,e,{path:this.sortField||"sort",success:function(e,i){e.get("id")&&i.get("id")&&(this._saveSort(e),this._saveSort(i),t.stopCollapse=!1)}})},_moveDown:function(t){debug("_moveDown");var e,i,o=this.collection.indexOf(t),n=[];if(this._options.subRender){i=t.get("belongId"),this.collection.each(function(t){i===t.get("belongId")&&n.push(t)});var s=Est.findIndex(n,function(e){return e.get("id")===t.get("id")});if(s===n.length-1)return;e=this.collection.indexOf(n[s+1])}else{if(o===this.collection.models.length-1)return;e=o+1}t.stopCollapse=!0,this._exchangeOrder(o,e,{path:this._options.sortField,success:function(e,i){e.get("id")&&i.get("id")&&(this._saveSort(e),this._saveSort(i),t.stopCollapse=!1)}})},_getCheckboxIds:function(){var t=Est.pluck(Est.filter(this.collection.models,function(t){return t.attributes.checked}),"id");return 0===t.length?void s.tip("至少选择一项"):t},_batch:function(t){var e=this;t=Est.extend({tip:"操作成功！"},t),(this.checkboxIds=this._getCheckboxIds())&&$.ajax({type:"POST",async:!1,url:t.url,data:{ids:e.checkboxIds.join(",")},success:function(){s.tip(t.tip),e._load()}})},_batchDel:function(){var t=this;s.comfirm({success:function(){t._batch({url:t.collection.batchDel,tip:"删除成功"})}})},_setOption:function(t){return Est.extend(this._options,t),this}}),i.exports=o});