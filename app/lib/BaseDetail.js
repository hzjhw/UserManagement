define("BaseDetail",["SuperView","HandlebarsHelper","Utils","Service"],function(e,t,i){var s,n,o,a,r;n=e("SuperView"),o=e("HandlebarsHelper"),a=e("Utils"),r=e("Service"),s=n.extend({_initialize:function(e){this._options=Est.extend(e||{},this.options),this.template=o.compile(e.template),this._initList(this._options),this._initModel(e.model,this),this._options.enterRender&&this._enterEvent()},_initList:function(e){var t=this;return this.list=e.render?this.$(e.render):this.$el,0===this.list.size()&&(this.list=$(e.render)),debug(function(){return t.list&&0!==t.list.size()?void 0:"当前"+t.options.viewId+"视图无法找到选择符， 检查XxxDetail中的_initialize方法中是否定义render或 实例化对象(new XxxDetail({...}))中是否存入el; 或template模板是否引入， 或是否是iframe对话框中未重新实例化Application对象， 或检查template模板是否存在"+(t._options.render?t._options.render:t.el)},{type:"error"}),this.list},_render:function(){this.list.append(this.template(this.model.toJSON())),window.topDialog&&this.$(".form-actions").hide(),setTimeout(function(){a.resetIframe()},1e3)},_initModel:function(e,t){t.passId=this.options.id||Est.getUrlParam("id",window.location.href),debug(function(){return e?void 0:"XxxDetail未找到模型类， 请检查继承BaseDetail时是否设置model参数，如XxxDetail = BaseDetail.extend({model: XxxModel, initialize: function(){..}})"},{type:"error"}),Est.isEmpty(this.passId)?(t.passId=(new Date).getTime(),t.model=new e,t.model.set("_data",t._options.data),t.model.set("_isAdd",t._isAdd=!0),t.render()):(t.model=new e,t.model.set("id",t.passId),t.model.set("_data",t._options.data),t.model.fetch().done(function(){t.model.set("_isAdd",t._isAdd=!1),t.render()}))},_form:function(e){return this.formSelector=e,this.formElemnet=this.$(this.formSelector),this},_validate:function(e){var t=this;return e=e||{},BUI.use("bui/form",function(i){t.formValidate=new i.Form({srcNode:t.formSelector}).render(),e.url&&e.fields&&Est.each(e.fields,function(i){app.addData(i,t.formValidate.getField(i)),debug(function(){return t.formValidate.getField(i)?void 0:"字段不匹配，检查input元素name值是否以vali-开头？"},{type:"error"}),app.getData(i).set("remote",{url:e.url,dataType:"json",callback:function(e){return e.success?"":e.msg}})})}),this},_init:function(e){var t=this,i=!0;e=e||{},$("#submit",this.el).on("click",function(){var s=$(this),n=t.preText=$(this).html();i=!0,t.formElemnet.submit(),$("input, textarea, select",$(t.formSelector)).each(function(){var e,s,n;e=$(this).attr("name"),$(this).hasClass("bui-form-field-error")&&(i=!1);var o=$(this).attr("id");if(o&&-1!==o.indexOf("model")){switch(this.type){case"radio":s=$(this).is(":checked")?$(this).val():n=!0;break;case"checkbox":s=$(this).is(":checked")?Est.isEmpty($(this).attr("true-value"))?!0:$(this).attr("true-value"):Est.isEmpty($(this).attr("false-value"))?!1:$(this).attr("false-value");break;default:s=$(this).val()}n||t.model.set(o.replace(/^model\d?-(.+)$/g,"$1"),s)}}),i&&("undefined"!=typeof e.onBeforeSave&&e.onBeforeSave.call(t),s.html("提交中..."),t._save(function(i){e.onAfterSave&&(e.onAfterSave=Est.inject(e.onAfterSave,function(){return new Est.setArguments(arguments)},function(){s.html(n)}),e.onAfterSave.call(t,i)),s.html(n)}))})},_save:function(e){this._saveItem(e)},_saveItem:function(e,t){return debug("BaseDetail._saveItem"),Est.isEmpty(this.model.url())?void debug("XxxModel模型类未设置url参数！",{type:"error"}):void this.model.save(null,{wait:!0,success:function(i){console.log("BaseDetail._saveSuccess"),app.addModel(Est.cloneDeep(i.attributes)),top&&(top.model=i.attributes),e&&"function"==typeof e&&e.call(t,i)}})},_reset:function(){this.model.set(this.model.defaults)},_empty:function(){this.model.off(),this.$el.empty().off()},_close:function(){debug("BaseDetail.close"),this.undelegateEvents(),this.stopListening(),this.off()}}),i.exports=s});