/**
 * @description main
 * @namespace main
 * @author yongjin on 2014/11/12
 */

// 模型类
var UserModel = Backbone.Model.extend({
    baseId: 'productId', // 主键标识
    baseUrl: 'http://jihui88.com/rest/api/user/info', // 请求地址
    defaults: {
        name: '未登录'
    },
    url: function () {
        var base = this.baseUrl;
        if (this.isNew() && !this.id) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    },
    initialize: function () {
        console.log('10.BaseModel.initialize [add to collection] or 3.[add to detail]');
    },
    parse: function (response, options) {
        var ctx = this;
        if (response.attributes) {
            response = response.attributes.data;
        }
        response.id = response[ctx.baseId];
        return response;
    }
});
var view = Backbone.View.extend({
    el: '#container',
    template: _.template($("#form-template").html()),
    events: {
        'click #submit': 'submit',
        'click #edit': 'edit'
    },
    initialize: function () {
        this.model = new UserModel();
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON));
        return this;
    },
    // 保存
    submit: function () {
        var ctx = this;
        // 为模型类  赋值
        $("#J_Form input").each(function () {
            ctx.model.set($(this).attr('name'), $(this).val());
        });

        // 保存模型类
        this.model.save(null, {
            wait: true,
            success: function (response) {
                console.log(response);
            }
        });
    },
    // 修改
    edit: function () {
        var ctx = this;
        this.model.set('id', 'ooooooo1');
        this.model.fetch({
            success: function () {
                ctx.model.set('name', '222');
                ctx.model.save(null, {
                    success: function (response) {
                        alert(response);
                    }
                });
            }
        });
    }

});

new view();
