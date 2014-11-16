/**
 * @description 属性添加或修改视图
 * @namespace AttributesDetail
 * @author yongjin on 2014/11/13
 */
define('AttributesDetail', ['jquery', 'AttributesModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'AttributesAdd'],
    function (require, exports, module) {
        var AttributesDetail, AttributesModel, HandlebarsHelper, Est, BaseDetail, AttributesAdd;

        AttributesModel = require('AttributesModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');
        AttributesAdd = require('AttributesAdd');

        AttributesDetail = BaseDetail.extend({
            el: '#jhw-main',
            events: {
                'click #reset': 'reset'
            },
            template: HandlebarsHelper.compile($("#attributes-detail-tpl").html()),
            initialize: function () {
                this.initModel(AttributesModel, this);
            },
            render: function () {
                var ctx = this;
                // 添加元素
                this.$el.html(this.template(this.model.toJSON()));
                // 产品分类
                this.getProductCategory({ select: true, extend: true })
                    .then(function (list) {
                        ctx.initSelect({
                            render: '#s1',
                            target: '#model-categoryId',
                            items: list
                        });
                    });
                // 属性选择框
                this.attributeSelect();
                // 属性选项
                this.attributeRender();
                // 绑定提交与验证
                this.form("#J_Form").validate().init(function () {
                    this.model.set("attributeOptionList", Est.pluck(this.optionsInstance.getItems(), 'value'))
                });
                return this;
            },
            showAttribute: function () {
                $("#multi-attribute").show();
            },
            attributeSelect: function () {
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
                }).then(function (select) {
                    if (select === 'select' || select === 'checkbox') {
                        $("#multi-attribute").show();
                    } else {
                        $("#multi-attribute").hide();
                    }
                });
            },
            attributeRender: function () {
                var ctx = this;
                var options = { el: '#multi-attribute', add: function () {
                    ctx.resetIframe();
                }};
                if (this.model.get('attributeOptionList').length > 0) {
                    options.items = this.model.get('attributeOptionList');
                    this.showAttribute();
                }
                this.optionsInstance = new AttributesAdd(options);
            }
        });

        module.exports = AttributesDetail;

    });