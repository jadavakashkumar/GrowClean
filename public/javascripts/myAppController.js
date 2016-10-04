var app=angular.module('GrowClean',['ngRoute','ui.bootstrap','ngAnimate','ngTouch','ngSanitize', 'ngResource','addCtrl','queryCtrl','geolocation','gservice']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
      
  };
});

// Routing Defined
app.config(function($routeProvider){
  $routeProvider
    // SPA Application and pages to be loaded
    /*.when('/app/signup', {
      templateUrl: 'home.html'
    })*/
    .when('/addform',{
      controller: 'addCtrl',
      templateUrl: 'addForm.html'
    })
    .when('/queryform',{
      controller: 'queryCtrl',
      templateUrl: 'queryForm.html'
    });
});

app.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});

app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});

// Authentication Controller
app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
   $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/addform');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
     $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/addform');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});




//angular carousel 
app.controller('CarouselController', function($scope){
 $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [
   
    ];
  var currIndex = 0;

  $scope.addSlide = function() {
    slides.push({
      image: 'images/one.jpg',
      id: currIndex++
    });
    slides.push({
      image: 'images/two.jpg',
      id: currIndex++
    });
    slides.push({
      image: 'images/three.jpg',
      id: currIndex++
    });
  };
  for (var i = 0; i < 1; i++) {
    $scope.addSlide();
  }
});

//Heat Map Popup Window

app.controller('ModalDemoCtrl', function ($uibModal, $log) {
  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return $ctrl;
        }
      }
    });

  };

  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: 'modalComponent'
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});


app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

});

app.module('ui.bootstrap.demo').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;
    
    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

  }
});

