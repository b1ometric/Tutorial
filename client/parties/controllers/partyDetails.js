angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteorObject', '$meteorCollection', '$meteorMethods',
  function($scope, $stateParams, $meteorObject, $meteorCollection, $meteorMethods){

    $scope.party = $meteorObject(Parties, $stateParams.partyId).subscribe('parties');
    
    $scope.users = $meteorCollection(Meteor.users, false).subscribe('users');

/*
    //TODO: Neither of these save functions work
    
    $scope.party = $meteorObject(Parties, $stateParams.partyId, false);
    
    //$scope.save = function() {
    //  $scope.party.save();
    //};

    $scope.save = function() {
      $scope.party.save().then(function(numberOfDocs){
        console.log('save success doc affected ', numberOfDocs);
      }, function(error){
        console.log('save error', error);
      });
    };

    $scope.reset = function() {
      $scope.party.reset();
    };
*/
    
  $scope.invite = function(user){
    $meteorMethods.call('invite', $scope.party._id, user._id).then(
      function(data){
        console.log('success inviting', data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  };
    
  $scope.canInvite = function (){
    if (!$scope.party)
      return false;

    return !$scope.party.public &&
      $scope.party.owner === Meteor.userId();
  };
    
}]);