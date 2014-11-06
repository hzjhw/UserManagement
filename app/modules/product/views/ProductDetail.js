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
                'change #model-photo': 'setPhoto'
            },

            template: Handlebars.compile($("#product-detail-tpl").html()),

            initialize: function () {
                debugger
                this.render();
            },

            render: function () {
                var ctx = this;

                this.$el.html(this.template(this.model.toJSON()));

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
                        ctx.model.set('category', ev.item.value);
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
                    ctx.saveItem();
                });

                return this;
            },

            setName : function(){
                this.model.set('name', $("#model-name").val());
            },

            setProtype: function(){
                this.model.set('protype', $('#model-protype').val());
            },

            setPhoto: function(){
                this.model.set('photo', $('#model-photo').val());
            },

            saveItem: function () {
                this.model.save(null, {
                    success: function(response){
                        console.dir(response);
                    },
                    wait: true
                });
                return this.model;
            },

            close: function(){
                this.stopListening();
                this.off();
            }

        });

        module.exports = ProductDetail;

    });