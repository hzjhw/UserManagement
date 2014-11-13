/**
 * @description 属性添加或修改视图
 * @namespace AttributesDetail
 * @author yongjin on 2014/11/13
 */
define('AttributesDetail', ['jquery', 'AttributesModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'option'],
    function (require, exports, module) {
        var AttributesDetail, AttributesModel, HandlebarsHelper, Est, BaseDetail, option;

        AttributesModel = require('AttributesModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');
        option = require('option');

        AttributesDetail = BaseDetail.extend({
            el: '#jhw-main',
            events: {
                'click #reset': 'reset',
                'click #attributes-add-btn': 'addAttribute',
                'click #attributes-remove-btn': 'removeAttribute'
            },
            template: HandlebarsHelper.compile($("#attributes-detail-tpl").html()),

            initialize: function () {
                this.initModel(AttributesModel, this);
            },

            showAttribute: function(){
                $("#multi-attribute").show();
            },

            attributeRender: function(){
                var ctx = this;
                var options = { el: '#multi-attribute' , add: function(){
                    ctx.resetIframe();
                }};
                if (this.model.get('attributeOptionList').length > 0){
                    options.items = this.model.get('attributeOptionList');
                    this.showAttribute();
                }
                this.optionsInstance = new option(options);
            },

            render: function () {
                var ctx = this;
                try{
                    this.$el.html(this.template(this.model.toJSON()));
                } catch (e){
                    console.error('AttributesDetail.render');
                }
                // 产品分类
                this.getProductCategory({ select: true, extend: true })
                    .then(function (list) {
                        ctx.initSelect({
                            render: '#s1',
                            target: '#model-categoryId',
                            items: list
                        });
                    });

                this.initSelect({
                    render: '#s2',
                    target: '#model-attributeType',
                    itemId: 'value',
                    items: [
                        {text: '文本', value: 'text'},
                        {text: '数字', value: 'number'},
                        {text: '字母', value: 'alphaint'},
                        {text: '单选项', value: 'select'},
                        {text: '多选项', value: 'checkbox'},
                        {text: '日期', value: 'date'}
                    ]
                }).then(function(select){
                    if (select === 'select' || select === 'checkbox'){
                        $("#multi-attribute").show();
                    } else{
                        $("#multi-attribute").hide();
                    }
                });

                this.attributeRender();

                // 验证
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: '#J_Form'
                    }).render();
                });
                // 保存
                $('#submit', this.el).on('click', function () {
                    $("#J_Form input, #J_Form textarea").each(function () {
                        ctx.model.set($(this).attr('name'), $(this).val());
                    });
                    ctx.model.set("attributeOptionList", Est.pluck(ctx.optionsInstance.getItems(), 'value'));
                    ctx.saveItem(function () {
                    });
                });
                return this;
            }
        });

        module.exports = AttributesDetail;

    });