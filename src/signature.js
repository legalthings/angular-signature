/*
 * https://github.com/legalthings/signature-pad-angular
 * Copyright (c) 2015 ; Licensed MIT
 */

angular.module('signature', []);

angular.module('signature').directive('signaturePad', ['$window', '$timeout',
  function ($window, $timeout) {
    'use strict';

    var EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

    return {
      restrict: 'EA',
      replace: true,
      template: (
        '<div class="signature" ng-style="{height: height + \'px\', width: width + \'px\'}">' +
        '<canvas ng-mouseup="updateModel()" style="width: 100%; height: 100%;"></canvas>' +
        '</div>'
      ),
      scope: {
        accept: '=',
        clear: '=',
        dataurl: '=?',
        isEmpty: '=?',
        height: '@',
        width: '@'
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.isEmpty = function () {
            return $scope.signaturePad.isEmpty();
          };

          $scope.accept = function () {
            var signature = {};

            if (!$scope.signaturePad.isEmpty()) {
              signature.dataUrl = $scope.signaturePad.toDataURL();
              signature.isEmpty = false;
            } else {
              signature.dataUrl = EMPTY_IMAGE;
              signature.isEmpty = true;
            }

            return signature;
          };

          $scope.updateModel = function () {
            var result = $scope.accept();
            $scope.dataurl = result.isEmpty ? undefined : result.dataUrl;
          };

          $scope.$watch(['width', 'height'], $scope.onResize);
        }
      ],
      link: function (scope, element) {
        var canvas = element.find('canvas')[0];
        var parent = element;
        var onDevicePixelRatioChange = $window.matchMedia('(-webkit-device-pixel-ratio:1)');

        scope.signaturePad = new SignaturePad(canvas);

        if (scope.signature && !scope.signature.$isEmpty && scope.signature.dataUrl) {
          scope.signaturePad.fromDataURL(scope.signature.dataUrl);
        }

        function updateScale() {
          var ctx = canvas.getContext('2d');
          var scaleWidth = canvas.width / parent[0].offsetWidth;
          var scaleHeight = canvas.height / parent[0].offsetHeight;

          ctx.resetTransform();
          ctx.scale(scaleWidth, scaleHeight);
        }

        scope.clear = function() {
          var ctx = canvas.getContext('2d');
          ctx.resetTransform();
          scope.signaturePad.clear();
          scope.dataurl = undefined;
          updateScale();
        }

        scope.onResize = function () {
          var ratio = Math.max($window.devicePixelRatio || 1, 1);

          if (
              canvas.width !== scope.width * ratio ||
              canvas.height !== scope.height * ratio
          ) {
            canvas.width = scope.width * ratio;
            canvas.height = scope.height * ratio;
            scope.signaturePad.clear();
          }
          updateScale();
        };

        $timeout(scope.onResize);

        var resizeCallback = scope.onResize.bind(this);

        angular.element($window).bind('resize', resizeCallback);
        onDevicePixelRatioChange.addListener(resizeCallback);

        scope.$on('$destroy', function removeListeners() {
          angular.element($window).unbind('resize', resizeCallback);
          onDevicePixelRatioChange.removeListener(resizeCallback);
        });
      }
    };
  }
]);

// Backward compatibility
angular.module('ngSignaturePad', ['signature']);
