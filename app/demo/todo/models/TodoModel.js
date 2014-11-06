/**
 * @description TodoModel
 * @namespace TodoModel
 * @author yongjin on 2014/10/31
 */
define(function(require, exports, module){
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