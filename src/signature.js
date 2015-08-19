/*
 * https://github.com/legalthings/signature-pad-angular
 * Copyright (c) 2015 ; Licensed MIT
 */

angular.module('signature', []);

angular.module('signature').directive('signaturePad', [
  function () {
    'use strict';
  
    var signaturePad, canvas, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="signature" ng-style="{height: height + \'px\', width: width + \'px\'}"><canvas height="{{ height }}" width="{{ width }}"></canvas></div>',
      scope: {
        accept: '=',
        clear: '=',
        height: '@',
        width: '@'
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.accept = function () {
            var signature = {};
            
            if (!signaturePad.isEmpty()) {
              signature.dataUrl = signaturePad.toDataURL();
              signature.isEmpty = false;
            } else {
              signature.dataUrl = EMPTY_IMAGE;
              signature.isEmpty = true;
            }
            
            return signature;
          };
          
          $scope.clear = function () {
            signaturePad.clear();
          };
        }
      ],
      link: function ($scope, $element) {
        canvas = $element.find('canvas');
        element = $element;
        signaturePad = new SignaturePad(canvas.get(0));
        
        if (!$scope.height) $scope.height = 220;
        if (!$scope.width) $scope.width = 568;
        
        if ($scope.signature && !$scope.signature.$isEmpty && $scope.signature.dataUrl) {
          signaturePad.fromDataURL($scope.signature.dataUrl);
        }
      }
    };
  }
]);

// Backward compatibility
angular.module('ngSignaturePad', ['signature']);

