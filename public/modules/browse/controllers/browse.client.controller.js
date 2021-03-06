'use strict';

angular.module('browse').controller('BrowseController', ['$scope', '$stateParams', '$location', 'Authentication', 'User',
  function($scope, $stateParams, $location, Authentication, User) {
    $scope.authentication = Authentication;

    // $scope.create = function() {
    //   var article = new Articles({
    //     title: this.title,
    //     content: this.content
    //   });
    //   arti cle.$save(function(response) {
    //     $location.path('articles/' + response._id);
    //
    //     $scope.title = '';
    //     $scope.content = '';
    //   }, function(errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // $scope.remove = function(article) {
    //   if (article) {
    //     article.$remove();
    //
    //     for (var i in $scope.articles) {
    //       if ($scope.articles[i] === article) {
    //         $scope.articles.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.article.$remove(function() {
    //       $location.path('articles');
    //     });
    //   }
    // };

    // $scope.update = function() {
    //   var article = $scope.article;
    //
    //   article.$update(function() {
    //     $location.path('articles/' + article._id);
    //   }, function(errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // this is our query method.
    $scope.find = function() {
      //$scope.users = [];
      // the users part refers to the html
      $scope.artists = User.query();//passes this guy to the html that calls this function
      window.foo = $scope;
    };

     $scope.findOne = function() {
       $scope.artist = User.get({//this is a .Where function? - yea i'm pretty sure
         userId: $stateParams.userId
       });
       window.foo = $scope;
     };
  }
]);
