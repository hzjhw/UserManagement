define('TodosCollection', ['jquery', 'underscore', 'backbone', 'localStorage', 'TodoModel'],
    function (require, exports, module) {
        var TodoModel, TodosCollection, Backbone, localStorage;

        TodoModel = require('TodoModel');
        Backbone = require('backbone');
        Backbone.localStorage = require('localStorage');


        TodosCollection = Backbone.Collection.extend({
            model: TodoModel,

            localStorage: new Backbone.LocalStorage('todos-backbone'),

            completed: function () {
                return this.filter(function (todo) {
                    return todo.get('completed');
                });
            },

            remaining: function () {
                return this.without.apply(this, this.completed());
            },

            nextOrder: function () {
                if (!this.length) {
                    return 1;
                }
                return this.last().get('order') + 1;
            },

            comparator: function (todo) {
                return todo.get('order');
            }
        });

        module.exports = TodosCollection;
    })