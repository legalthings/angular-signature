angular.module('app', ['signature']);

angular.module('app').controller('AppCtrl', function($scope) {
    $scope.boundingBox = {
        width: 700,
        height: 300
    };
});

