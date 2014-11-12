/**
 * @description main
 * @namespace main
 * @author yongjin on 2014/11/12
 */

// 模型类
var UserModel = Backbone.Model.extend({
    url: 'http://jihui88.com/rest/api/paymentconfig/detail', // 请求地址
    defaults: {
        name: '未登录'
    }
});
var view = Backbone.View.extend({
    el: '#container',
    template : _.template($("#form-template").html()),
    events: {
        'click #submit': 'submit'
    },
    initialize: function(){
        this.model = new UserModel();
        this.render();
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON));
        return this;
    },
    submit: function(){
        var ctx = this;
		this.model.set('name', '111');
        // 为模型类  赋值
        $("#addMember input").each(function () {
            ctx.model.set($(this).attr('name'), $(this).val());
        });
		$("#addMember select").each(function () {
            ctx.model.set($(this).attr('name'), $(this).val());
        });

        // 保存模型类
        this.model.save(null, {
            wait: true,
            success: function (response) {
                console.log(response);
            }
        });
    }
});

new view();
