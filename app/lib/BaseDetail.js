define("BaseDetail",["jquery","underscore","backbone","HandlebarsHelper","BaseUtils","BaseService"],function(e,t,s){var i,n,o,a,r;n=e("backbone"),o=e("HandlebarsHelper"),a=e("BaseUtils"),r=e("BaseService"),i=n.View.extend({constructor:function(e){this.options=e||{},n.View.apply(this,arguments)},_initialize:function(e){this._options=e||{},Est.extend(this._options,this.options),this.template=o.compile(e.template),this._initModel(e.model,this),this._options.enterRender&&this._enterEvent()},_render:function(){this.$el.html(this.template(this.model.toJSON())),setTimeout(function(){a.resetIframe()},1e3)},_enterEvent:function(){var e=this;this._options.enterRender&&this.$("input").keyup(function(t){t.keyCode===CONST.ENTER_KEY&&e.$(e._options.enterRender).click()})},_initModel:function(e,t){t.passId=Est.getUrlParam("id",window.location.href)||this.options.id,Est.isEmpty(this.passId)?(t.passId=(new Date).getTime(),t.model=new e,t.model.set("_isAdd",t._isAdd=!0),t.render()):(t.model=new e,t.model.set("id",t.passId),t.model.fetch().done(function(){t.model.set("_isAdd",t._isAdd=!1),t.render()})),t.model.set("_data",t._options.data)},_form:function(e){return this.formSelector=e,this.formElemnet=this.$(this.formSelector),this},_validate:function(e){var t=this;return e=e||{},BUI.use("bui/form",function(s){t.formValidate=new s.Form({srcNode:t.formSelector}).render(),e.url&&e.fields&&Est.each(e.fields,function(s){app.addData(s,t.formValidate.getField(s)),app.getData(s).set("remote",{url:e.url,dataType:"json",callback:function(e){return e.success?"":e.msg}})})}),this},_init:function(e){var t=this,s=!0;e=e||{},$("#submit",this.el).on("click",function(){var i=$(this),n=t.preText=$(this).html();s=!0,t.formElemnet.submit(),$("input, textarea, select",$(t.formSelector)).each(function(){var e,i,n;e=$(this).attr("name"),$(this).hasClass("bui-form-field-error")&&(s=!1);var o=$(this).attr("id");if(o&&-1!==o.indexOf("model")){switch(this.type){case"radio":i=$(this).is(":checked")?$(this).val():n=!0;break;case"checkbox":i=$(this).is(":checked")?Est.isEmpty($(this).attr("true-value"))?!0:$(this).attr("true-value"):Est.isEmpty($(this).attr("false-value"))?!1:$(this).attr("false-value");break;default:i=$(this).val()}n||t.model.set(o.replace(/^model\d?-(.+)$/g,"$1"),i)}}),"undefined"!=typeof e.onBeforeSave&&e.onBeforeSave.call(t),s&&(i.html("提交中..."),t._save(function(s){e.onAfterSave&&(e.onAfterSave=Est.inject(e.onAfterSave,function(){return new Est.setArguments(arguments)},function(){i.html(n)}),e.onAfterSave.call(t,s)),i.html(n)}))})},_save:function(e){this._saveItem(e)},_saveItem:function(e,t){debug("BaseDetail._saveItem"),this.model.save(null,{wait:!0,success:function(s){console.log("BaseDetail._saveSuccess"),top&&(top.model=s.attributes),e&&"function"==typeof e&&e.call(t,s)}})},_reset:function(){this.model.set(this.model.defaults)},_empty:function(){this.model.off(),this.$el.empty().off()},_close:function(){debug("BaseDetail.close"),this.undelegateEvents(),this.stopListening(),this.off()}}),s.exports=i});