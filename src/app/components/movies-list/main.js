appModule.directive('moviesList',[function(){

	return {
        templateUrl: 'app/components/movies-list/movies-list.html',
        restrict: 'EA', 
        link: function(scope, element) {
        	var searchBox=$(element.find('.search-box'));
            scope.toggleWatch = function(){
				this.item.inwatch=!this.item.inwatch;
			};
			searchBox.bind('keyup',(function(){
				if (typeof(scope.onSearch)==='function'){
					scope.onSearch.call(this,$(this).val());
				}
			}));
        }
    };
}]);