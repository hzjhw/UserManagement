define("BaseView",["jquery","underscore","backbone","HandlebarsHelper"],function(e,t,i){var n,o,s;o=e("backbone"),s=e("HandlebarsHelper"),n=o.View.extend({_initialize:function(e){var t=o.Model.extend({});return this._options=e||{},this._options.data=this._options.data||{},this.template=s.compile(this._options.template),this.model=new t(this._options.data),this},_render:function(){this.trigger("before",this),this.$el.html(this.template(this.model.toJSON())),this._options.enterRender&&this._enterEvent(),this.trigger("after",this)},_enterEvent:function(){var e=this;this._options.enterRender&&this.$("input").keyup(function(t){t.keyCode===CONST.ENTER_KEY&&e.$(e._options.enterRender).click()})},_empty:function(){debug("BaseView.remove"),this.model.destroy()}}),i.exports=n});