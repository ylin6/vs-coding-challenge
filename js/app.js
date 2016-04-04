(function(){
    var app = angular.module('eventApp', []);
    // Event Controller
    app.controller('EventsController', ['$scope', function($scope){
        var instance = this;
        instance.events = [];
        
        // Helper Functions
        instance.getAll = function(){
            VividSeats.eventService.all(function(e){
                instance.events = e;
                // Apply updates
                $scope.$apply();
            }, function(e){
                alert(e)
            });
        }
        
        // Get Largest ID
        instance.getLargestID = function(){
            var largestID = 0;
            for(i = 0; i < instance.events.length; i++){
                if(instance.events[i]["id"] > largestID){
                    largestID = instance.events[i]["id"];
                }
            }
            
            return largestID;
        }
        
        // Get Events from API
        instance.getAll();
        
        // Date Filter
        $scope.dateFilter = function () {
            return function (item) {
                if (item['date'] === null){
                    return false;
                }
                
                var itemDate = moment(item['date']).format();
                var today = new Date();
                var nextMonth = today.setDate(today.getDate() + 30);
                today = new Date();
                var start = moment( today).format();
                var end = moment( nextMonth).format(); 

                if (itemDate >= start && itemDate <= end){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        
        // Add New Event
        
        // Show Add New Event Bootstrap Modal
        instance.showAddEventModal = function(){
            $("#add-Event-Modal").modal("show");
        }
        
        // Add Event to API
        instance.newEvent = {};
        instance.addNewEvent = function(){
            instance.newEvent["date"] = moment($('#add-event-date').val() + ' ' + $('#add-event-time').val()).format();
            instance.newEvent["id"] = instance.getLargestID() + 1;
            VividSeats.eventService.add(instance.newEvent, function(){
                // Get New List
                instance.getAll();
                
                // Close Modal
                $("#add-Event-Modal").modal("hide");
                
                // Clear Event
                instance.newEvent = {};
            }, function(e){
                alert(e);
            });
            instance.event = {};
        }
        
        instance.editedEvent = {};
        // Edit/Remove Event Modal
        instance.showEditEventModal = function(selectedEvent){
            instance.editedEvent = selectedEvent;
            console.log(instance.editedEvent["date"]);
            $('#edit-event-date').val( moment(instance.editedEvent["date"]).format('YYYY-MM-DD'));
            $('#edit-event-time').val( moment(instance.editedEvent["date"]).format('HH:MM:SS'));
            $("#edit-Event-Modal").modal("show");
        }
        
        // Remove Event
        instance.removeEvent = function(){
            VividSeats.eventService.remove(instance.editedEvent,function(){
                instance.getAll();
                instance.editedEvent = {};
            }, function(e){
                alert(e);
            });
            
        }
        
        // Edit Event
        instance.editEvent = function(){
            VividSeats.eventService.update(instance.editedEvent,function(){
                instance.getAll();
                instance.editedEvent = {};
            }, function(e){
                alert(e);
            });
            
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