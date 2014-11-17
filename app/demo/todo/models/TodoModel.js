/**
 * @description TodoModel
 * @namespace TodoModel
 * @author yongjin on 2014/10/31
 */
define('TodoModel', ['jquery', 'underscore', 'backbone'], function(require, exports, module){

    var Backbone = require('backbone');

    var TodoModel = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },
        toggle: function(){
            this.save({
                completed: !this.get('completed')
            });
        },
        url: "http://jihui88.com/rest/api/product"
    });
    module.exports = TodoModel;
});