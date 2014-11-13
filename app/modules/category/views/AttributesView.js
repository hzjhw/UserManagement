/**
 * @description 分类属性列表视图
 * @namespace CategoryAttrView
 * @author yongjin on 2014/11/13
 */
define('AttributesView', ['jquery', 'AttributesItem', 'AttributesCollection', 'BaseView', 'Est'],
    function (require, exports, module) {
        var AttributesView, AttributesItem, AttributesCollection, BaseView, Est, template;

        AttributesItem = require("AttributesItem");
        AttributesCollection = require("AttributesCollection");
        BaseView = require('BaseView');
        Est = require('Est');
        template = require('http://jihui88.com/member/modules/category/templates/attributes_list.html');

        AttributesView = BaseView.extend({
            el: '#jhw-main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click #attributes-add': 'openAddDialog'
            },

            initialize: function(){
                var ctx = this;
                this.$el.empty();
                this.$el.append($(template));
                this.list = $("#attributes-list-ul", this.$el);
                this.initCollection(AttributesCollection, this).then(function(collection){
                    ctx.render();
                });
                this.initItemView(AttributesItem, this);
                return this;
            },

            render: function(){
                this.addAll();
            },

            openAddDialog: function(){
                this.detail({
                    title: '属性添加',
                    url: 'http://jihui88.com/member/modules/category/attributes_detail.html?time=' + new Date().getTime()
                });
            }
        });

        module.exports = AttributesView;
    });