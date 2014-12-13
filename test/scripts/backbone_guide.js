/**
 * @description backbone_guide
 * @namespace backbone_guide
 * @author yongjin on 2014/11/2
 */
// ajax重载， 解决跨域问题
  var sample = Backbone.Collection.extend({
    model: ProductModel,
    sync: function(method, model, options){
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: this.url,
            processData: false
        }, options);
        return $.ajax(params);
    }
});

// 保存详细信息
this.model.save(null, {
    data: {
        name: 'aaa'
    },
    beforeSend: function(){
    },
    success: function(model, response, options){
        console.log(response);
    }
});




/** == Model == */
var product = new Product({
    name: 'a'
});
// 取值
product.get("name");
product.escape("cdesc");
product.attributes;
// 赋值
product.set('name', 'aaa');
product.set({
    name: 'aa'
});
// 删除
product.unset('price');
product.clear(); // 删除所有
// change事件
product.on('change', function(model){
    console.dir(model);
});
product.on('change:name', function(model, value){
    console.log(value);
});

// 获取修改前的数据
model.previous('name');
model.previousAttributes();
// 验证不通过事件
product.on('error', function(model, error){
    console.log(error);
});
// 针对单个字段进行验证
product.set('price', 0, {
    error: function(model, error){
        console.log(error);
    }
});
// 同步服务器
product.save();
product.destroy();
product.fetch();

product.save(null, {
    success: function(model){
        console.dir(model);
    },
    wait: true // 判断上传是否成功， 若失败则回滚数据
});

// patch: true     只抓取修改过的数据提交到服务器上
product.save({}, {patch: true});


// 事件
product.on('destroy', function(model){
    console.log("success");
});

// 三种方式 从服务器里抓取数据并回调
var _thisView = this;

// #1
// This works, as long as you remember to pass in the 'this' context
// as the last parameter.
//this.model.on('change', this.render, this); // one way to bind callback
this.listenTo(this.model,'change', this.render);
this.model.fetch();

// #2
// This will work, but you have to call bindAll to make sure 'this' refers
// to the views in render() when it's called (so this.model works).
_.bindAll(this, "render");
this.model.fetch({
    success: _thisView.render
});

// #3
// This uses jQuery's Deferred functionality to bind render() to the model's
// fetch promise, which is called after the AJAX request completes
this.model.fetch().done(function () {
    _thisView.render();
});

/** == Event == */

product.on("change", function(model){
    console.dir(model);
});

product.trigger("change", this.model);
// unbind事件
product.off('change:name');

// 当所有on事件都执行后   触发all事件
product.on('all', function(){

});
// 停止事件
product.stopListening();

/** == Collection == */
var products = new ProductList([product1, product2]); // 创建
var product2 = product1.clone(); // 克隆

// 添加
products.add({});
products.push({}, {at: 1});
products.unshift({});

// 删除
products.remove(products.models[2]);
products.pop();
products.shift();

// 获取
products.get('1001'); // 根据ID获取
products.at(1);
products.where({
    name: 'a'
});

// 刷新页面数据时 ， 可传递数组    此方法不会触发  model的 add 和 remove事件
product.reset([{}, {}]);
product.reset();

// 排序   度娘

// 同步到服务器
products.fetch({
    add: true,
    success: function(collection, response){
        console.dir(collection.models);
    }
});
products.create({}, {
    success: function(model, response){
        console.dir(model);
    }
});

/** == View == */

var product = new Product({
    name: 'aaa'
});
var ProductView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#node").html()),
    initinlize: function(){
        this.$el = $("#container");
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
var productView = new ProductView({
    model: product
});


// 实例化一个View
// 绑定到botton1
var view = new View({el: button1});

// 绑定到botton2
view.setElement(button2);

button1.trigger('click');
button2.trigger('click'); // returns true



/** == Form == */

events: {
    'click #add' : 'addBook'
},
addBook: function(e){
    e.preventDefault();
    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            formData[ el.id ] = $( el ).val();
        }
    });

    this.collection.add( new app.Book( formData ) );
}

// remove views
events: {
    'click .delete': 'deleteBook'
}

deleteBook: function(){
    this.model.destroy();
    this.remove();
}



Backbone.View.extend({
    render: function(){
        that = this;
        $.ajax("GET", "/template/foo.html", function(template){
            var html = _.template(template);
            that.$el.html(html);
        });
        return this;
    }
});


view.render().done(function(){
    $("#page-content").html(view.el);
});


MyView = new Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function(done) {
        var view = this;
        app.fetchTemplate('/path/to/template.html', function(t) {
            $(view.el).html(t(view.model.toJSON()));
            done(view.el);
        });
    }
};



// radio
var view = Backbone.View.extend({
        initialize:function () {
            // on click is ok
            this.model.on('click', this.click, this);
            // cannot bind using backbone events change for some reasons, have to use jquery to setup the event
            $('input[name="my-dropdown"]', this.el).on('change', $.proxy(this.onselect, this));
        }
);