(function(){
    var app = angular.module('eventApp', []);
    
    // Event Controller
    app.controller('EventsController', ['$scope', function($scope){
        var instance = this;
        instance.events = [];
        
        // Get Events from API
        VividSeats.eventService.all(function(e){
            instance.events = e;
            // Apply updates
            $scope.$apply();
        }, function(e){
            alert(e)
        });
        
        // Date Filter
        $scope.dateFilter = function () {
            return function (item) {
                if (item['date'] === null){
                    return false;
                }
                
                var itemDate = moment(item['date']);
                var today = new Day();
                var nextMonth = today.setDate(today.getDate() + 30)
                var start = moment( today, "YYYY-MM-DD");
                var end = moment( nextMonth, "YYYY-MM-DD");
 
                if (itemDate >= start && itemDate <= end){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        
        
    }]);
    
    // Tabs Controller
    app.controller('TabController', function(){
        var instance = this;
        // Set initial tab to first tab
        this.tab = 1;
        
        // Set tab to current tab
        this.setTab = function(t){
            instance.tab = t;
        }
        
        // Check if tab is current tab
        this.isTab = function(t){
            return (instance.tab == t)
        }
    });
    
})();