angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteorCollection', '$meteorSubscribe', '$rootScope',
  function($scope, $meteorCollection, $meteorSubscribe, $rootScope){

    $meteorSubscribe.subscribe('users');
    
    $scope.orderProperty = 'name';
    
    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };

    $scope.creator = function(party){
      if (!party)
        return;
      var owner = $scope.getUserById(party.owner);
      if (!owner)
        return "nobody";

      if ($rootScope.currentUser)
        if ($rootScope.currentUser._id)
          if (owner._id === $rootScope.currentUser._id)
            return "me";

      return owner;
    };
    
    $scope.parties = $meteorCollection(Parties).subscribe('parties');

    $scope.remove = function(party){
      $scope.parties.remove(party);
    };
    
    $scope.removeAll = function(){
      $scope.parties.remove();
    };

}]);