define("BaseList",["jquery","underscore","backbone","BaseUtils","HandlebarsHelper"],function(t,i,e){var o,n,s,l;n=t("backbone"),s=t("BaseUtils"),l=t("HandlebarsHelper"),o=n.View.extend({constructor:function(t){this.options=t||{},n.View.apply(this,arguments)},_initialize:function(t){return debug("1.BaseList._initialize"),this.dx=0,this.views=[],app.emptyDialog(),setTimeout(function(){},1),this._init(t.collection,t)},_init:function(t,i){return this._initOptions(i),this._initTemplate(),this._initEnterEvent(),this._initList(this._options),this._initCollection(t),this._initItemView(this._options.item,this),this._initModel(this._options.model),this._initBind(),this._initPagination(this._options),this._load(this._options),this._afterLoad(),this._finally(),this},_initOptions:function(t){this._options=Est.extend(t||{},this.options),this._options.sortField="sort",this._options.max=this._options.max||99999},_initList:function(t){var i=this;return this.list=t.render?this.$(t.render):this.$el,0===this.list.size()&&(this.list=$(t.render)),debug(function(){return i.list&&0!==i.list.size()?void 0:"当前"+i.options.viewId+"视图无法找到选择符， 检查XxxList中的_initialize方法中是否定义render或 实例化对象(new XxxList({...}))中是否存入el; 或template模板是否引入， 或检查template模板是否存在"+(i._options.render?i._options.render:i.el)},{type:"error"}),this.allCheckbox=this.$("#toggle-all")[0],this.list},_initTemplate:function(){this._data=this._options.data=this._options.data||{},this._options.template&&(this.template=l.compile(this._options.template),this.$el.append(this.template(this._options.data)))},_initCollection:function(t){debug(function(){return this._options.model?void 0:'XxxList中的_initialize({})参数中未添加模型类，XxxList头部是否require请求引入？ 或检查config.js/main.js中是否配置app.addModule("XxxModel")'},{type:"error"}),this.collection||(this.collection=new t(this._options)),this._options.itemId&&this.collection._setItemId(this._options.itemId),this._options.subRender&&!this._options.items&&(this.composite=!0)},_finally:function(){this._options.finally&&this._options.finally.call(this,this._options)},_beforeLoad:function(t){t.beforeLoad&&t.beforeLoad.call(this,this.collection)},_afterLoad:function(){this._options.afterLoad&&this._options.afterLoad.call(this,this._options)},_initItems:function(){"function"===Est.typeOf(this._options.items)&&(this._options.items=this._options.items.apply(this,arguments)),this._options.filter&&(this.collection.push(this._options.items),this._filterCollection(),this._options.items=Est.pluck(Est.cloneDeep(this.collection.models,function(){},this),"attributes")),this._options._page||this._options._pageSize?this._renderListByPagination():Est.each(this._options.items,function(t){this.collection.push(new this.initModel(t))},this)},_render:function(){debug("BaseList._render"),this._addAll(),this.trigger("after",this)},_filterRoot:function(){var t=this,i=[];t.composite=!1,Est.each(t.collection.models,function(e){debug(function(){return"undefined"===Est.typeOf(e.attributes[t._options.categoryId])?"分类ID错误， 检查XxxList中的_initialize({})配置中的categoryId跟api是否一致？当前ID为"+t._options.categoryId+"点击"+t.collection.url+"查看API":"undefined"===Est.typeOf(e.attributes[t._options.parentId])?"父分类ID错误， 检查XxxList中的_initialize({})配置中的parentId跟api是否一致？当前父ID为"+t._options.parentId+"点击"+t.collection.url+"查看API":void 0},{type:"error"}),i.push({categoryId:e.attributes[t._options.categoryId],belongId:e.attributes[t._options.parentId]})}),this.collection.each(function(e){for(var o=i.length,n=[];o>0;){var s=i[o-1];s.belongId===e.get(t._options.categoryId)&&(n.unshift(s.categoryId),i.splice(o,1)),o--}e.set("children",n),("01"===e.get("isroot")||!e.get("isroot")&&"/"===e.get("parentId")||!e.get("isroot")&&Est.isEmpty(e.get("parentId")))&&(e.set("level",1),t._addOne(e))}),debug(t.collection)},_filterItemRoot:function(){},_addOne:function(t){var i=this;if(!this.filter&&!this.composite&&this.dx<this._options.max){t.set("dx",this.dx++),t.set("_options",{_item:i._options.item,_items:i._options.items?!0:!1,_model:i._options.model,_collection:Est.isEmpty(i._options.subRender)?null:i.collection,_subRender:i._options.subRender,_collapse:i._options.collapse,_extend:i._options.extend,_checkAppend:i._options.checkAppend,_data:i.options.data||i._options.data});var e=new this.item({model:t,data:this._data,detail:this._options.detail,route:this._options.route});e._setInitModel(this.initModel),e._setViewId(this._options.viewId||app.getCurrentView()),this.list.append(e._render().el),this.views.push(e)}},_initPagination:function(t){var i=this;i.collection&&i.collection.paginationModel&&i.collection.paginationModel.on("reloadList",function(e){i._load.call(i,t,e)})},_load:function(t,i){var e=this;t=t||this._options||{},this._beforeLoad(t),(t.page||t.pageSize)&&(t.page&&e.collection.paginationModel.set("page",t.page),t._page=t.page,t.pageSize&&e.collection.paginationModel.set("pageSize",t.pageSize),t._pageSize=t.pageSize,i=e.collection.paginationModel,t.page=t.pageSize=null),this._options.items&&(this._empty(),this._initItems()),this._options.viewId&&(Est.cookie(this._options.viewId+"_page",e.collection.paginationModel.get("page")),Est.cookie(this._options.viewId+"_pageSize",e.collection.paginationModel.get("pageSize"))),e.collection.url&&!this._options.items&&(e._options.filter&&(e.filter=!0),e._options.subRender&&(e.composite=!0,e.collection.paginationModel.set("page",1),e.collection.paginationModel.set("pageSize",9e3)),e.collection._load(e.collection,e,i).then(function(i){e.options.instance&&app.addData(e.options.instance,i.models),debug(function(){return 0===i.length?(e.collection.url="function"===Est.typeOf(e.collection.url)?e.collection.url():e.collection.url,"从服务器上传回来的列表为空！检查XxxCollection中是否配置url参数， 点击"+e.collection.url+"查看数据"):void 0}),e._options.subRender&&e._filterRoot(),e._options.filter&&e._filterCollection(),t.afterLoad&&t.afterLoad.call(e,i)}))},_filterCollection:function(){this._filter(this._options.filter,this._options)},_renderListByPagination:function(){this.page=this.collection.paginationModel.get("page"),this.pageSize=this.collection.paginationModel.get("pageSize"),this.startIndex=(this.page-1)*this.pageSize,this.endIndex=this.startIndex+this.pageSize;for(var t=this.startIndex;t<this.endIndex;t++)this.collection.push(this._options.items[t]);return this.collection.paginationModel.set("count",this.collection.models.length),this.collection._paginationRender(),this.collection},_initBind:function(){this.collection&&(this.collection.bind("add",this._addOne,this),this.collection.bind("reset",this._render,this))},_initEnterEvent:function(){var t=this;if(this._options.enterRender){if(!this._options.enterRender)return;this.$("input").keyup(function(i){i.keyCode===CONST.ENTER_KEY&&t.$(t._options.enterRender).click()})}},_initItemView:function(t){this.item=t},_initModel:function(t){this.initModel=t},_empty:function(){if(this.dx=0,debug("- BaseList._empty"),this.collection)for(var t=this.collection.length;t>-1;)this.collection.remove(this.collection[t]),t--;return this.collection.paginationModel&&(this.dx=(this.collection.paginationModel.get("pageSize")||16)*(this.collection.paginationModel.get("page")-1||0)),Est.each(this.views,function(t){t.remove().off()}),this.views=[],this.collection},_addAll:function(){debug("BaseList._addAll and call this._empty"),this._empty(),this.collection.each(this._addOne,this)},_search:function(t){var i=this;this.filter=!0,t=Est.extend({onBeforeAdd:function(){}},t),this._load({page:1,pageSize:5e3,afterLoad:function(){i.filter=!1,i._filter(t.filter||i._options.filter,t)}})},_filter:function(t,i){var e=this,o=[],n=e.collection.models.length;for(e.filter=!1;n>0;){var s=e.collection.models[n-1],l=!0;Est.each(t,function(t){var i=!1,o=Est.getValue(s.attributes,t.key);return i="regexp"===Est.typeOf(t.match)?!t.match.test(o):Est.isEmpty(o)||-1===o.indexOf(t.value),l&&!Est.isEmpty(t.value)&&i?(e.collection.remove(s),l=!1,!1):void 0}),l&&i.onBeforeAdd&&i.onBeforeAdd.call(this,s),l&&o.unshift(s),n--}e._options.items||Est.each(o,function(t){t.set("_isSearch",!0),e._addOne(t)})},_detail:function(t){debug("1.BaseList._detail"),t=t||{},t.end=t.end?"?"+t.end+"&":"";var i=this;seajs.use(["dialog-plus"],function(e){window.dialog=e;var o=[];t.hideSaveBtn||o.push({value:"保存",callback:function(){return this.title(CONST.SUBMIT_TIP),this.iframeNode.contentWindow.$("#submit").click(),!1},autofocus:!0}),t.hideResetBtn||o.push({value:"重置",callback:function(){return this.iframeNode.contentWindow.$("#reset").click(),!1}}),o.push({value:"关闭"}),debug(function(){return Est.isEmpty(i._options.detail)&&Est.isEmpty(t.url)?"您请求的详细页网址是："+(t.url||i._options.detail+t.end)+"页面不显示？ 点击链接是否访问正常？检查XxxList中的_initialize配置是否设置detail参数？若正常， 忽略本信息":void 0},{type:"error"}),window.detailDialog=e({id:"detail-dialog",title:t.title||"添加",height:t.height||"auto",width:t.width||850,padding:t.padding||0,url:t.url||i._options.detail+t.end,button:o,oniframeload:function(){this.iframeNode.contentWindow.topDialog=window.detailDialog,this.iframeNode.contentWindow.app=app,t.load&&t.load.call(this,this.iframeNode.contentWindow)},onclose:function(){i._options.subRender&&(i.composite=!0),i.collection._load(i.collection,i).then(function(){i._options.subRender&&(i.composite=!0,i._filterRoot())}),this.remove(),window.detailDialog=null,this.returnValue&&$("#value").html(this.returnValue)}}),window.detailDialog.showModal()})},_toggleAllChecked:function(){var t=this.allCheckbox.checked;this.collection.each(function(i){i.set("checked",t)})},_saveSort:function(t){var i={id:t.get("id")};i[this._options.sortField||"sort"]=t.get(this._options.sortField),t._saveField(i,this,{async:!1,hideTip:!0})},_exchangeOrder:function(t,i,e){var o={},n={},s=this.collection.at(t),l=this.collection.at(i),a=s.view.model.get("dx"),c=l.view.model.get("dx");if(o.dx=c,n.dx=a,e.path){var d=s.view.model.get(e.path),h=l.view.model.get(e.path);o[e.path]=h,n[e.path]=d}return s.view.model.set(o),l.view.model.set(n),this.collection.models[i]=this.collection.models.splice(t,1,this.collection.models[i])[0],i>t?s.view.$el.before(l.view.$el):s.view.$el.after(l.view.$el),e.success&&e.success.call(this,s,l),this},_moveUp:function(t){debug("_moveUp");var i,e,o=this,n=this.collection.indexOf(t),s=[];if(this._options.subRender){e=t.get(this._options.parentId),this.collection.each(function(t){e===t.get(o._options.parentId)&&s.push(t)});var l=Est.findIndex(s,function(i){return i.get("id")===t.get("id")});if(0===l)return;i=this.collection.indexOf(s[l-1])}else{if(0===n)return;i=n-1}t.stopCollapse=!0,this._exchangeOrder(n,i,{path:this.sortField||"sort",success:function(i,e){i.get("id")&&e.get("id")?(this._saveSort(i),this._saveSort(e),t.stopCollapse=!1):debug("模型类中不存在id, 检查XxxModel中的baseId是否正确？")}})},_moveDown:function(t){debug("_moveDown");var i,e,o=this,n=this.collection.indexOf(t),s=[];if(this._options.subRender){e=t.get(o._options.parentId),this.collection.each(function(t){e===t.get(o._options.parentId)&&s.push(t)});var l=Est.findIndex(s,function(i){return i.get("id")===t.get("id")});if(l===s.length-1)return;i=this.collection.indexOf(s[l+1])}else{if(n===this.collection.models.length-1)return;i=n+1}t.stopCollapse=!0,this._exchangeOrder(n,i,{path:this._options.sortField,success:function(i,e){i.get("id")&&e.get("id")?(this._saveSort(i),this._saveSort(e),t.stopCollapse=!1):debug("模型类中不存在id, 检查XxxModel中的baseId是否正确？")}})},_getCheckboxIds:function(){var t=Est.pluck(Est.filter(this.collection.models,function(t){return t.attributes.checked}),"id");return 0===t.length?void s.tip("至少选择一项"):t},_batch:function(t){var i=this;t=Est.extend({tip:"操作成功！"},t),(this.checkboxIds=this._getCheckboxIds())&&$.ajax({type:"POST",async:!1,url:t.url,data:{ids:i.checkboxIds.join(",")},success:function(){s.tip(t.tip),i._load()}})},_batchDel:function(){var t=this;return this.checkboxIds=this._getCheckboxIds(),0===this.checkboxIds.length?void s.tip("至少选择一项"):void s.comfirm({success:function(){t._batch({url:t.collection.batchDel,tip:"删除成功"})}})},_setOption:function(t){return Est.extend(this._options,t),this}}),e.exports=o});