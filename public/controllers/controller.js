var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
    console.log("hello world from controller");
    
    var refresPage = function(){
        $http.get('/contactlist').success(function(response){
            console.log("got the data which is requested  :)  ");
            $scope.contactlist = response; 
        });
    };
    refresPage();

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response){
            console.log("Inside Add Contact Function");
            console.log(response);
        });
        refresPage();
        $scope.contact=null;
    };
    
    
      $scope.removeContact = function(id){
        console.log("Inside Remove Function");
        console.log("Requested ID is delievered");
        console.log(id);
      $http.delete('/contactlist/' + id)
        refresPage();
     };
    
    
     $scope.edit = function(id){
         console.log(id);
         $http.get('/contactlist/' + id).success(function(response){
             console.log("Inside Edit function");
            $scope.contact = response; 
         });
         refresPage();
     };
    
     $scope.update = function(){
        console.log($scope.contact._id);
         $http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(response){
             console.log("Inside Update Function");
             console.log(response);
         });
         refresPage();
         $scope.contact=null;
    };  
}]);
