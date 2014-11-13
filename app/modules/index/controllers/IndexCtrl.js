/**
 * @description 首页
 * @namespace IndexCtrl
 * @author yongjin on 2014/10/31
 */
seajs.use(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'product': 'product',
            'category/product': 'productCategory',
            'attributes': 'attributes',

            '*other': 'default'
        },

        index: function () {

        },

        product: function (id) {
            seajs.use(['jquery', 'ProductView'], function(jquery, ProductView){
                new ProductView();
            });

            define('product/template', function(require){
                require('http://jihui88.com/member/modules/product/templates/product_item.html');
                require('http://jihui88.com/member/modules/product/templates/product_list.html');
                require('http://jihui88.com/member/common/pagination/pagination.html');
            });

            seajs.use(['product/template'], function(template){

            });
        },

        productCategory: function(){
            seajs.use(['jquery', 'ProductCategoryView'], function(jquery, ProductCategoryView){
                new ProductCategoryView();
            });
            define('category/product', function(require){
                require('http://jihui88.com/member/modules/category/templates/category_product_item.html');
                require('http://jihui88.com/member/modules/category/templates/category_product_list.html');
                require('http://jihui88.com/member/common/pagination/pagination.html');
            });

            seajs.use(['category/product'], function(template){

            });
        },

        attributes: function(){
            seajs.use(['jquery', 'AttributesView'], function(jquery, AttributesView){
                new AttributesView();
            });
            define('attributes/template', function(require){
                require('http://jihui88.com/member/modules/category/templates/attributes_item.html');
                require('http://jihui88.com/member/modules/category/templates/attributes_list.html');
                require('http://jihui88.com/member/common/pagination/pagination.html');
            });

            seajs.use(['attributes/template'], function(template){

            });
        },

        default: function (other) {
            //$(document.body).append("This route is not hanled.. you tried to access: " + other);

        }

    });
    new router;
    Backbone.history.start();
});

seajs.use(['jquery', 'TopView', 'LeftView'],
    function (jquery, TopView, LeftView) {
        new TopView();
        new LeftView();
    });
