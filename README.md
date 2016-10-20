# Angular Signature

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/legalthings/angular-signature/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/legalthings/angular-signature/?branch=master)

AngularJS directive for the [signature pad](https://github.com/szimek/signature_pad/) JavaScript library by szimek.

_In contrast to other AngularJS directives for szimek's signature pad, this directive does not apply any styling. The
directive only places the canvas and allows you to bind your app to the signature pad by binding the functions in the scope of your
controller. This means you can call them from your own (custom) buttons._

![sign animation](https://cloud.githubusercontent.com/assets/100821/11911005/77b3e2fe-a5de-11e5-9221-cfaafb737cd7.gif)

## Demo

An online demo of the directive can be found [here](https://rawgit.com/legalthings/angular-signature/master/demo/index.html).

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

### Bootstrap Modal

This plugin works well in a [Angular UI Bootstrap Modal](https://angular-ui.github.io/bootstrap/#/modal).

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

