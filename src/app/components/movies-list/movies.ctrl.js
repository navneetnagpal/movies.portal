appModule.controller('moviesCtrl',['$scope','moviesService',function($scope,moviesService){
	$scope.allList = moviesService.getAll().items.slice();
	var PAGE_SIZE=5;
	$scope.reset = function(){
		$scope.totalPages=Math.round($scope.allList.length/PAGE_SIZE,0);
		$scope.currentPage=1;
		$scope.sortBy="date";
	};

	$scope.onSearch = function(){
		if ($scope.keyword.trim()){
			$scope.allList = _.filter(moviesService.getAll().items.slice(),function(item){				 
				return item.title.toLowerCase().indexOf($scope.keyword.trim().toLowerCase())>-1
			});
		} else {
			$scope.allList =moviesService.getAll().items.slice();
		}
		 
		$scope.reset();
		$scope.refresh();
	};

	$scope.changeSortBy = function(){
		$scope.allList = _.sortBy($scope.allList,$scope.sortBy);
		switch($scope.sortBy){
			case 'date':
				$scope.allList=$scope.allList.reverse();
				break;
		}
		$scope.currentPage = 1;
		$scope.refresh();
	};

	$scope.refresh=function(){
		$scope.list=$scope.allList.slice().splice(( ($scope.currentPage-1)*PAGE_SIZE),PAGE_SIZE);
	};
	
	

	$scope.hasNext = function(){
		return $scope.currentPage<$scope.totalPages;
	};
	$scope.hasPrev = function(){
		return $scope.currentPage>1;
	};
	$scope.next = function(){
		$scope.currentPage++;
		$scope.refresh();
	};
	$scope.prev = function(){
		$scope.currentPage--;

		$scope.refresh();
	};
$scope.reset();
	$scope.refresh();

}]);