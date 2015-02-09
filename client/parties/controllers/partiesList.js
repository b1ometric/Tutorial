angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteorCollection',
  function($scope, $meteorCollection){

    $scope.parties = $meteorCollection(Parties);

    $scope.remove = function(party){
      $scope.parties.remove(party);
    };
    
    $scope.removeAll = function(){
      $scope.parties.remove();
    };

}]);