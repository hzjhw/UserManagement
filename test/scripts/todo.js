/**
 * @description todo
 * @namespace todo
 * @author yongjin on 2014/10/31
 */
// 所有模块都通过 define 来定义
define(function(require, exports, module) {

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

    var TodoList = Backbone.Collection.extend({
        model: Todo,
        nextOrder: function(){
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        done: function(){
            return this.where({done: true});
        }
    });
    var Todos = new TodoList;

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        events: {
            'click .toggle': 'toggleDone'
        },
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        },
        toggleDone: function(){
            this.model.toggle();
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#todoapp"),
        events: {
            "keypress #new-todo": "createOnEnter"
        },
        initialize: function(){
            this.input = this.$("#new-todo");
            this.listenTo(Todos, 'add', this.addOne);
            Todos.fetch();
        },
        render: function(){

        },
        addOne: function(todo){
            var view = new TodoView({model: todo});
            this.$("#todo-list").append(view.render().el);
        },
        createOnEnter: function(e){
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;
            Todos.create({title: this.input.val()});
            this.input.val(''); // 清空
        }
    });

    var App = new AppView;

    // 或者通过 module.exports 提供整个接口
    module.exports = App;

});
