/**
 * @description 属性列表显示
 * @namespace AttributesList
 * @author yongjin on 2014/11/16
 */

define('AttributesShow', ['jquery', 'HandlebarsHelper', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseModel', 'Est'],
    function (require, exports, module) {
        var AttributesShow, model, item, collection, HandlebarsHelper, BaseCollection, BaseItem, BaseList, BaseModel, Est, itemTemp;

        HandlebarsHelper = require('HandlebarsHelper');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseList = require('BaseList');
        BaseModel = require('BaseModel');
        Est = require('Est');
        itemTemp = require('http://jihui88.com/member/common/attributes/attributes_show_item.html');

        model = BaseModel.extend({
            defaults: { key: '选项', value: '' },
            baseId: 'attId'
        });

        collection = BaseCollection.extend({
            url: function () {
                return 'http://jihui88.com/rest/api/attr/list/' + this.getCategoryId();
            },
            model: model,
            setCategoryId: function (categoryId) {
                this.categoryId = categoryId;
            },
            getCategoryId: function () {
                return this.categoryId;
            }
        });

        item = BaseItem.extend({
            tagName: 'div',
            className: 'control-group',
            template: HandlebarsHelper.compile(itemTemp),
            events: {
                'change input': 'update',
                'click input[type=checkbox]': 'resetCheckbox'
            },
            initialize: function () {
                this.__proto__.constructor.__super__.initialize.apply(this, arguments);
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            resetCheckbox: function () {
                var array = [];
                $("input[type=checkbox]:checked", this.$el).each(function () {
                    array.push($(this).val());
                });
                $('input[type=hidden]', this.$el).val(array.join(","));
            },
            update: function () {
                //this.model.set(this.$('input').attr("name").replace('attr-', ''), this.$('input').val());
            }
        });

        AttributesShow = BaseList.extend({
            el: '#attributes-list',
            events: {
                'click .option-add': 'add',
                'click .option-remove': 'remove',
                'click .getItemsBtn': 'getItems'
            },
            initialize: function (options) {
                var ctx = this;
                this.options = options || {};
                this.$el.empty();
                this.list = this.$el;
                if (options.items) {
                    this.initCollection(collection, item, this, {})
                        .then(function (opts) {
                            Est.each(options.items, function (item) {
                                var fields = item.productAttribute;
                                fields.element = item.element.substring(1, item.element.length -1);
                                ctx.collection.push(new model(fields));
                            }, this);
                        });
                }
                else {
                    this.initCollection(collection, item, this, {
                        beforeLoad: function () {
                            this.setCategoryId(options.categoryId);
                        }
                    }).then(function (options) {
                        ctx.initPagination(options);
                        ctx.load(options);
                    });
                }

                return this;
            },
            add: function () {
                this.collection.push(new model());
                if (typeof this.options.add !== 'undefined') {
                    this.options.add.call(this);
                }
            },
            remove: function () {
                this.collection.pop();
                this.render();
            },
            getItems: function () {
                // 转换成[{key: '', value: ''}, ... ] 数组格式
                return Est.pluck(this.collection.models, 'attributes');
            }
        });

        module.exports = AttributesShow;

    });