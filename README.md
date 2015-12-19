# Angular signature

AngularJS directive for the [signature pad](https://github.com/szimek/signature_pad/) JavaScript library by szimek.

_In contrast to other AngularJS modules for szimek's signature pad, this library doesn't apply any styling. The
directive only places the canvas, not any buttons. You bind the signature pad js calls to the functions in scope of your
controller. This means you can call them from your own (custom) buttons._

![sign animation](https://cloud.githubusercontent.com/assets/100821/11911005/77b3e2fe-a5de-11e5-9221-cfaafb737cd7.gif)

## Installation

Install this module using bower

    bower install angular-signature --save

Add the module to your app

    angular.module('app', [
      'signature',
    ]);

## Usage

### Basics

```html
<signature-pad accept="accept" clear="clear" height="220" width="568"></signature-pad>
<button ng-click="clear()">Clear signature</button>
<button ng-click="signature = accept()">Sign</button>
```

### Bootstrap modal

This plugin works well in a [Angular UI bootstrap Modal](https://angular-ui.github.io/bootstrap/#/modal).

```js
angular.module('app').controller('SignModalCtrl', [
  '$scope', '$modalInstance'
  function ($scope, $modalInstance) {
    $scope.done = function () {
      var signature = $scope.accept();
      
      if (signature.isEmpty) {
        $modalInstance.dismiss();
      } else {
        $modalInstance.close(signature.dataUrl);
      }
    };
  }
]);
```

```html
<div class="modal-header">
    <h3 class="modal-title">Sign</h3>
</div>
<div class="modal-body">
    <signature-pad accept="accept" clear="clear"></signature-pad>
</div>
<div class="modal-footer">
    <button class="btn btn-default pull-left" ng-click="clear()">Clear signature</button>
    <button class="btn btn-default" ng-click="$dismiss()">Cancel</button>
    <button class="btn btn-primary" ng-click="done()">Sign</button>
</div>
```

