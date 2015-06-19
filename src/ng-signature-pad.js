/**
 * https://github.com/legalthings/signature-pad-angular
 * Copyright (c) 2015 ; Licensed MIT
 */
angular.module('signaturePad', []);

angular.module('signaturePad').directive('signaturePad', [
  function () {
    'use strict';
    var signaturePad, canvas, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
    return {
      restrict: 'A',
      replace: true,
      template: '<div class="signature" style="height: 220px; width: 568px;"><canvas height="220" width="568"></canvas></div>',
      scope: {
        accept: '=',
        clear: '='
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
        
        if ($scope.signature && !$scope.signature.$isEmpty && $scope.signature.dataUrl) {
          signaturePad.fromDataURL($scope.signature.dataUrl);
        }
      }
    };
  }
]);

// Backward compatibility
angular.module('ngSignaturePad', ['signaturePad']);
