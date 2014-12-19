
// 产品默认值
var productDefaults = {
    name: '',
    type: 'NM',
    unit: '件',
    price: 0,
    sort: 1,
    loginView: '1',
    ads: '2',
    prodtype: '',
    category: '',
    isBest: false,
    isNew: false,
    photo2: [],
    photoId: 'Attach_0000000000000000000011056',
    photo: 'upload/g/g2/ggggfj/picture/2014/09/01/01bcc9d6-4790-403f-a546-eb97fc3aee31.jpg',
    checked: false
};
// 分类默认值
var categoryDefaults = {
    grade: '00', // 产品以00开头， 新闻以01开头
    isroot: '01', // 是否是根目录
    isdisplay: 1, // 是否显示
    name: '',
    sort: 1,
    state: '01',
    belongId: null, // 父类ID
    type: '10' // 产品
}


// 模型类
// 模型类
var UserModel = Backbone.Model.extend({
    url: 'http://jihui88.com/rest/api/member/detail', // 请求地址
    defaults: {
        name: '未登录',
    defaults: productDefaults, // 默认值 [修改]
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
}});
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
                console.dir(response);
            }
        });
    },
    // 修改
    edit: function () {
        var ctx = this;
        // 设置ID
        this.model.set('id', 'Product_000000000000000000116135');
        // 获取详细信息
        this.model.fetch({
            success: function () {
                // 设置内容
                ctx.model.set('name', '222');
                // 保存内容
                ctx.model.save(null, {
                    success: function (response) {
                        console.dir(response);
                    }
                });
            }
        });
    }

});

new view();
