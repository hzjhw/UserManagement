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
            '*other': 'default'
        },

        index: function () {

        },

        product: function (id) {
            seajs.use(['jquery', 'ProductView'], function(jquery, ProductView){
                new ProductView();
            });

            define('main', function(require, exports, module){
                require('http://jihui88.com/member/modules/product/templates/product_item.html');
                require('http://jihui88.com/member/modules/product/templates/product_list.html');
                require('http://jihui88.com/member/common/pagination/pagination.html');
            });

            seajs.use(['main'], function(main){

            });
        },

        productCategory: function(){
            seajs.use(['jquery', 'ProductCategoryView'], function(jquery, ProductCategoryView){
                new ProductCategoryView();
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
