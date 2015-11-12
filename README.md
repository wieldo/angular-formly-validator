FormlyValidator
==========

Automate fields validation in [Angular-Formly].

-

## Install

```
meteor add wieldo:angular-formly-validator
```

-

## Getting Started

1. Add package using `meteor add` (see above)
2. Add angular-formly files to your project
3. Add the following dependencies to your AngularJS module:

```javascript
angular.module('myApp', [
    'formly',
    'formlyValidator'
  ])
```

-

## How to use it

### Register validator

```javascript
formlyValidator.register('required', function(config, $viewValue, $modelValue, scope) {
    return true;
});
```

### Set validator for formly field

In field configuration, use structure below:

```
{
    transformers: {
        validators: {
            validatorName: validatorConfig
        }
    }
}
```

## formlyValidator service

See [formlyValidator](api.md)   

-

## Helper methods

Each validator has build-in helper methods.

### this.createError(msg:string)
**@returns _Error_**

Throws Error with this message syntax

```
[formlyValidator] [validatorName] <msg>
```

-

## Built-in validators

### required

```
{
    required: <boolean>
}
```

### minlength

```
{
    minlength: <integer>
}
```

### maxlength

```
{
    maxlength: <integer>
}
```

### minnumber

```
{
    minnumber: <integer>
}
```

### maxnumber

```
{
    maxnumber: <integer>
}
```

### pattern

Check if model matches pattern

```
{
    pattern: <RegExp|string>
}
```

### notpattern

Check if model does not match pattern (negation of pattern)

```
{
    notpattern: <RegExp|string>
}
```

-

## Example

```javascript
angular.module('myAppName', [
    'formly',
    'formlyValidator'
  ])
  .run(runApp)
  .controller('demoCtrl', demoCtrl);
  
  function runApp(formlyValidator) {
        
        // register customRequired validator
        formlyValidator.register('customRequired', function(configValue, $viewValue, $modelValue) {
            if(configValue !== true) {
                return true;
            }
            var value = $viewValue || $modelValue;
            return (value && value !== "") === true;
        });
        
  }
   
  function demoCtrl() {
        var vm = this;
        
        vm.fields = [
            key: 'firstName',
            type: 'input',
            templateOptions: {
                label: "First name"
            },
            transformers: {
                validators: {
                    customRequired: true
                }
            }
        ];
        
        // if firstName value is empty
        // then $scope.form.firstName.$error contain customRequired === false
  }
  
```

[Angular-Formly]: http://angular-formly.com
[Angular-Formly expressions]: http://docs.angular-formly.com/v7.2.3/docs/formly-expressions
[formlyTransformer]: https://github.com/wieldo/angular-formly-transformer/blob/master/README.md

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wieldo/angular-formly-validator/trend.png)](https://bitdeli.com/free "Bitdeli Badge")