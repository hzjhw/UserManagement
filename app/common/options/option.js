/**
 * @description option
 * @namespace option
 * @author yongjin on 2014/11/13
 */

define('option', ['jquery', 'HandlebarsHelper', 'BaseCollection', 'BaseItem', 'BaseView', 'BaseModel', 'Est'],
    function(require, exports, module){
        var option, model, item, collection, HandlebarsHelper, BaseCollection, BaseItem, BaseView, BaseModel, Est;

        HandlebarsHelper = require('HandlebarsHelper');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseView = require('BaseView');
        BaseModel = require('BaseModel');
        Est = require('Est');

        model = BaseModel.extend({
            defaults: { key: '选项', value: '' }
        });

        collection = BaseCollection.extend({
            model: model
        });

        item = BaseItem.extend({
            tagName: 'div',
            className: 'control-group',
            template : HandlebarsHelper.compile($('#option-item-template').html()),
            events: {
                'click .delete': 'del',
                'change input': 'update'
            },
            initialize: function(){
                this.__proto__.constructor.__super__.initialize.apply(this, arguments);
            },
            render: function(){
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            update: function(){
                this.model.set(this.$('input').attr("name"), this.$('input').val());
            }
        });

        option = BaseView.extend({
            el: '#multi-attribute',
            template: HandlebarsHelper.compile($("#option-template").html()),
            events: {
                'click .option-add': 'add',
                'click .option-remove': 'remove',
                'click .getItemsBtn': 'getItems'
            },
            initialize: function (options) {
                this.options = options || {};
                this.$el.empty();
                this.$el.html(this.template({}));
                this.list = $("#attributes-container", this.$el);

                this.initCollection(collection, this);
                this.initItemView(item, this);
                this.initBind();

                if (options.items){
                    Est.each(options.items, function(item){
                        this.collection.push(new model({
                            key: '选项',
                            value: item
                        }));
                    }, this);
                } else{
                    this.add();
                }
                return this;
            },
            add: function(){
                this.collection.push(new model());
                if (typeof this.options.add !== 'undefined'){
                    this.options.add.call(this);
                }
            },
            remove: function(){
                this.collection.pop();
                this.render();
            },
            getItems: function(){
                // 转换成[{key: '', value: ''}, ... ] 数组格式
                return Est.pluck(this.collection.models, 'attributes');
            }
        });

        module.exports = option;

});