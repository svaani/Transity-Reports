'use strict';

angular.module('myApp.ontime_delay', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ontime_delay', {
    templateUrl: 'ontime_delay/ontime_delay.html',
    controller: 'OntimeDelayCtrl'
  });
}])

.controller('OntimeDelayCtrl', ['$scope','$http',function($scope,$http) {
     var url = 'json_data/ontime_delay.json';
            $http.get(url).then( function(response) {
               var origData = response.data;
               $scope.onTimeDelayDS = $scope.onTimeDelayToFusionCharts(origData);
            });
    $scope.onTimeDelayToFusionCharts = function(origData){
        var toData = [];
        angular.forEach(origData.result, function(value, index) {
            this.push({
                chart: {
                    caption: value.companyName,
                    subCaption: "Total number of transactions"+ value.totalNoOfTransactions,
                },
                data:[{
                    label: "OnTime",
                    value: value.onTimeCount
                },
                {
                    label: "Delayed",
                    value: value.delayedCount
                }]
        });
        }, toData);
        return toData;
    }
}]);
