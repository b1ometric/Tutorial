Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {

angular.module('socially',['angular-meteor', 'ui.router']);

angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('parties', {
        url: '/parties',
        templateUrl: 'parties-list.tpl',
        controller: 'PartiesListCtrl'
      })
      .state('partyDetails', {
        url: '/parties/:partyId',
        templateUrl: 'party-details.tpl',
        controller: 'PartyDetailsCtrl'
      });

      $urlRouterProvider.otherwise("/parties");
}]);  
  
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
  
angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteorObject',
  function($scope, $stateParams, $meteorObject){

    $scope.party = $meteorObject(Parties, $stateParams.partyId);

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
  
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {

      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];

      for (var i = 0; i < parties.length; i++)
        Parties.insert({name: parties[i].name, description: parties[i].description});

    }
   });
}
  
}  