(function(){
    var app = angular.module('eventApp', []);
    app.controller('EventsController', ['$scope', function($scope){
        instance = this;
        instance.events = [];
        VividSeats.eventService.all(function(e){
            instance.events = e;
            console.log(instance.events);
            $scope.$apply();
        }, function(e){
            alert(e)
        });
    }]);
})();