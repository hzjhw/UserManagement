/**
 * @description model
 * @namespace model
 * @author yongjin on 2014/10/31
 */
if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module){
        var Todo = Backbone.Model.extend({
            defaults: function(){
                return {
                    title: "enpty todo...",
                    order:Todos.nextOrder(),
                    done: false
                }
            },
            toggle: function(){
                this.save({
                    done: !this.get("done")
                });
            },
            url: "http://jihui88.com/user_v2/pulish2"
        });
        module.exports = Todo;
    });
}