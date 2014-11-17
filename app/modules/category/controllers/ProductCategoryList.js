/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryList
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryList', ['jquery',  'CategoryModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'Est'],
    function (require, exports, module) {
        var ProductCategoryList, ProductCategoryCollection, ProductCategoryItem, CategoryModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, listTemp, itemTemp;

        CategoryModel = require('CategoryModel');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseList = require('BaseList');
        Est = require('Est');
        HandlebarsHelper = require('HandlebarsHelper');
        listTemp = require('http://jihui88.com/member/modules/category/views/category_product_list.html');
        itemTemp = require('http://jihui88.com/member/modules/category/views/category_product_item.html');

        ProductCategoryCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/category/product?pageSize=1000',
            model: CategoryModel
        });

        ProductCategoryItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile(itemTemp),
            events: {
                'click .name': 'editName',
                'click .delete': 'deleteItem',
                'click .edit': 'editItem'
            },

            initialize: function () {
                this.__proto__.constructor.__super__.initialize.apply(this, arguments);
            },

            render: function () {
                console.log('11.ProductCategoryItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            editItem: function () {
                this.edit({
                    title: '产品分类修改',
                    url: 'http://jihui88.com/member/modules/category/product_category_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this.editField({
                    title: '修改分类名称',
                    field: 'name',
                    target: '.name'
                },this);
            },

            deleteItem: function () {
                this.del(this);
            }
        });

        ProductCategoryList = BaseList.extend({
            el: '#jhw-main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-category-add': 'openAddDialog'
            },

            initialize: function(){
                var ctx = this;
                this.$el.empty();
                this.$el.append($(listTemp));
                this.list = $("#product-category-list-ul", this.$el);
                this.initCollection(ProductCategoryCollection, this).then(function(collection){
                    Est.sortBy(collection.models, function(item){
                        return item.attributes.sort;
                    });
                    Est.bulidTreeNode(collection.models, 'grade', '00', {
                        categoryId: 'categoryId',// 分类ＩＤ
                        belongId: 'belongId',// 父类ＩＤ
                        childTag: 'cates', // 子分类集的字段名称
                        sortBy: 'sort', // 按某个字段排序
                        callback: function(item){}  // 回调函数
                    });
                    ctx.render();
                });
                this.initItemView(ProductCategoryItem, this);
                return this;
            },

            render: function(){
                this.addAll();
            },

            openAddDialog: function(){
                this.detail({
                    title: '分类添加',
                    url: 'http://jihui88.com/member/modules/category/product_category_detail.html?time=' + new Date().getTime()
                });
            }
        });

        module.exports = ProductCategoryList;
    });