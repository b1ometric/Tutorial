angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteorCollection', '$rootScope', '$meteorMethods',
  function($scope, $meteorCollection, $rootScope, $meteorMethods){

    $scope.parties = $meteorCollection(Parties).subscribe('parties');
    $scope.users = $meteorCollection(Meteor.users, false).subscribe('users');
    
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
    
    $scope.remove = function(party){
      $scope.parties.remove(party);
    };
    
    $scope.removeAll = function(){
      $scope.parties.remove();
    };
    
    $scope.rsvp = function(partyId, rsvp){
      $meteorMethods.call('rsvp', partyId, rsvp).then(
        function(data){
          console.log('success responding', data);
        },
        function(err){
          console.log('failed', err);
        }
      );
    };
    
    $scope.outstandingInvitations = function (party) {
      return _.filter($scope.users, function (user) {
        return (_.contains(party.invited, user._id) &&
          !_.findWhere(party.rsvps, {user: user._id}));
    });
};

}]);