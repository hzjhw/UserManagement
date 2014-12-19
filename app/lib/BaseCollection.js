define("BaseCollection",["jquery","underscore","backbone","PaginationModel","Pagination","localStorage"],function(t,e,i){var n,a,o,s;n=t("backbone"),o=t("PaginationModel"),s=t("Pagination"),a=n.Collection.extend({_initialize:function(){debug("2.BaseCollection._initialize"),this._baseUrl=this.url,this.paginationModel||(this.paginationModel=new o)},parse:function(t){return this._parsePagination(t),this.paginationModel&&(this._parseUrl(this.paginationModel),this._paginationRender()),t.attributes.data},_parseUrl:function(t){debug("7.BaseCollection._parseUrl");var e=1,i=16;if(t&&t.get("pageSize")&&(i=t.get("pageSize"),e=t.get("page")),"function"!=typeof this.url){var n="";Est.isEmpty(this._itemId)||(n="/"+this._itemId),this.url=this._baseUrl+n+"?page="+e+"&pageSize="+i}},_parsePagination:function(t){debug("6.BaseCollection._parsePagination"),t.attributes=t.attributes||{page:1,per_page:10,count:10},this.paginationModel&&(this.paginationModel.set("page",t.attributes.page),this.paginationModel.set("pageSize",t.attributes.per_page),this.paginationModel.set("count",t.attributes.count))},_paginationRender:function(){var t=this;this.pagination?this.pagination.render():this.pagination=new s({model:t.paginationModel})},_load:function(t,e,i){debug("4.BaseCollection._load"),this._parseUrl(i);var n=Est.promise;return new n(function(i){return t.fetch({success:function(){debug("before"),i(t),e.collection._reset(),debug("collection reset end"),e._empty()}})})},_setItemId:function(t){this._itemId=t,debug("根据ID查列表"+this._itemId)},_empty:function(){if(debug("BaseCollection._empty"),this.collection)for(var t=this.collection.length;t>-1;)this.collection.remove(this.collection[t]),t--}}),i.exports=a});