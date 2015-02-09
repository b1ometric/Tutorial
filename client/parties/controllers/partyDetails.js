angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteorObject', '$meteorCollection',
  function($scope, $stateParams, $meteorObject, $meteorCollection){

    $scope.users = $meteorCollection(Meteor.users, false).subscribe('users');
    
    $scope.party = $meteorObject(Parties, $stateParams.partyId).subscribe('parties');

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
}]);