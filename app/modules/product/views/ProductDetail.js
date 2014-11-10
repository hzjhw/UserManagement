/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail',['jquery', 'underscore', 'backbone', 'ProductModel', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductDetail, ProductModel, Handlebars, Est, Backbone;

        ProductModel = require('ProductModel');
        Handlebars = require('handlebars');
        Backbone = require('backbone');
        Est = require('Est');

        ProductDetail = Backbone.View.extend({

            el: '#product-add-container',

            events: {
                'change #model-name': 'setName',
                'change #model-protype': 'setProtype',
                'change #model-photo': 'setPhoto',
                'click #product-reset': 'reset'
            },

            template: Handlebars.compile($("#product-detail-tpl").html()),

            initialize: function () {
                console.log('ProductDetail.initialize');
                var ctx = this;
                this.passId = Est.getUrlParam('id', window.location.href);
                if (!Est.isEmpty(this.passId)){
                    this[this.passId] = new ProductModel();
                    this[this.passId].set('id', this.passId);
                    this[this.passId].fetch().done(function(){
                        ctx.render().resetIframe();
                    });
                } else{
                    this.passId = new Date().getTime();
                    this[this.passId] = new ProductModel();
                    this.render().resetIframe();
                }
            },

            saveItem: function (callback, context) {
                console.log('ProductDetail.saveItem');
                this[this.passId].save(null, {
                    wait: true,
                    success: function(response){
                        console.log('ProductDetail.saveSuccess');
                        debugger
                        if (top) { top.model = response.attributes; }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },

            render: function () {
                console.log('ProductDetail.render');
                var ctx = this;

                this.$el.html(this.template(this[this.passId].toJSON()));

                BUI.use(['bui/tab','bui/mask'],function(Tab) {
                    var tab = new Tab.TabPanel({
                        render: '#tab',
                        elCls: 'nav-tabs',
                        panelContainer: '#panel',
                        autoRender: true,
                        children: [
                            {title: '常规', value: '1', selected: true},
                            {title: '高级', value: '2'},
                            {title: '搜索引擎优化', value: '3'}
                        ]
                    });
                });

                // 分类
                BUI.use('bui/select',function(Select){
                    var items = [
                            {text:'分类1',value:'Category_00000000000000000001683'},
                            {text:'选项2',value:'Category_00000000000000000001684'},
                            {text:'选项3',value:'Category_00000000000000000001685'}
                        ],
                        select = new Select.Select({
                            render:'#s1',
                            valueField:'#hide',
                            items:items
                        });
                    select.render();
                    select.on('change', function(ev){
                        ctx[ctx.passId].set('category', ev.item.value);
                    });
                });
                // 时间
                BUI.use('bui/calendar',function(Calendar){
                    new Calendar.DatePicker({
                        trigger:'.calendar',
                        autoRender : true
                    });
                });

                // 验证
                BUI.use('bui/form',function(Form){
                    new Form.Form({
                        srcNode : '#J_Form'
                    }).render();
                });

                // 保存
                $('#product-submit', this.el).on('click', function(){
                    ctx.saveItem(function(){
                    });
                });

                return this;
            },

            setName : function(){
                console.log('ProductDetail.setName');
                this[this.passId].set('name', $("#model-name").val());
            },

            setProtype: function(){
                console.log('ProductDetail.setProtype');
                this[this.passId].set('protype', $('#model-protype').val());
            },

            setPhoto: function(){
                console.log('ProductDetail.setPhoto');
                this[this.passId].set('photo', $('#model-photo').val());
            },

            reset: function(){
                debugger
                this[this.passId].set(this[this.passId].defaults);
            },

            resetIframe: function(){
                window.detailDialog.height($(document).height());
            },

            remove: function(){
                console.log('ProductDetail.remove');
                this[this.passId].destroy();
                this[this.passId]= null;
                return this;
            },

            close: function(){
                console.log('ProductDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }

        });

        module.exports = ProductDetail;

    });