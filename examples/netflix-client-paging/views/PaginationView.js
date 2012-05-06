(function (views) {

	views.PaginationView = Backbone.View.extend({

		events: {
			'click a.first': 'gotoFirst',
			'click a.prev': 'gotoPrev',
			'click a.next': 'gotoNext',
			'click a.last': 'gotoLast',
			'click a.page': 'gotoPage',
			'click .howmany a': 'changeCount',
			'click a.sortAsc': 'sortByAscending',
			'click a.sortDsc': 'sortByDescending',
            'click a.filter': 'filter'
		},

		tagName: 'aside',

		pagingTemplate: _.template($('#tmpClientPagination').html()),

		initialize: function () {

			this.collection.on('reset', this.render, this);
			this.collection.on('change', this.render, this);
			this.$el.appendTo('#pagination');

		},
		render: function () {
			var html = this.pagingTemplate(this.collection.info());
			this.$el.html(html);
		},

		gotoFirst: function (e) {
			e.preventDefault();
			this.collection.goTo(1);
		},

		gotoPrev: function (e) {
			e.preventDefault();
			this.collection.previousPage();
		},

		gotoNext: function (e) {
			e.preventDefault();
			this.collection.nextPage();
		},

		gotoLast: function (e) {
			e.preventDefault();
			this.collection.goTo(this.collection.information.lastPage);
		},

		gotoPage: function (e) {
			e.preventDefault();
			var page = $(e.target).text();
			this.collection.goTo(page);
		},

		changeCount: function (e) {
			e.preventDefault();
			var per = $(e.target).text();
			this.collection.howManyPer(per);
		},

		sortByAscending: function (e) {
			e.preventDefault();
			var currentSort = this.getSortOption();
			this.collection.pager(currentSort, 'asc');
			this.preserveSortOption(currentSort);
		},

		getSortOption: function () {
			return $('#sortByOption').val();
		},

		preserveSortOption: function (option) {
			$('#sortByOption').val(option);
		},

		sortByDescending: function (e) {
			e.preventDefault();
			var currentSort = this.getSortOption();
			this.collection.pager(currentSort, 'desc');
			this.preserveSortOption(currentSort);
		},
        
        getFilterField: function () {
            return $('#filterByOption').val();
        },
        
        getFilterValue: function () {
            return $('#filterString').val();
        },
        
        preserveFilterField: function (field) {
            $('#filterByOption').val(field);
        },
        
        preserveFilterValue: function (value) {
          $('#filterString').val(value);
        },
        
        filter: function (e) {
            e.preventDefault();
            
            var fields = this.getFilterField();
            /*Note that this is an example! 
             * You can create an array like 
             * 
             * fields = ['Name', 'Description', ...];
             */
            
            var filter = this.getFilterValue();

            this.collection.pager('', '', fields, filter);
            
            this.preserveFilterField(fields);
            this.preserveFilterValue(filter);
        }
	});
})( app.views );