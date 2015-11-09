FormlyValidator
==========

Automate fields validation in Angular-Formly.

## Add Angular Formly

There is no official [Angular Formly] package in Atmosphere so you have to add it manually.

## Install

```
meteor add wieldo:angular-formly-validator
```


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

## How to use it

### Register validator

Each validator has unique name and expression function.

- **name** - validator name
- **expression** - expression which returns boolean value.

Expression has four arguments.  
First one has been added by this package. Other three are standard arguments of angular-formly's expression.

- **config** - validator configuration (may be object or just value)
- **$viewValue** - see [Angular-Formly expressions]
- **$modelValue** 
- **scope**

```javascript
formlyValidator.register('required', function(config, $viewValue, $modelValue, scope) {
    return true;
});
```

### Use formlyTransformer

See [formlyTransformer]

```javascript
formlyTransformer.transform(vm.fields, {
    fieldKey: {
        validatorName: validatorConfig
    }
});
```


## Example

```javascript
angular.module('myAppName', [
    'formly',
    'formlyValidator'
  ])
  .controller('demoCtrl', demoCtrl);
  
  function demoCtrl(formlyValidator, formlyTransformer) {
        var vm = this;
        
        // register required validator
        formlyValidator.register('required', function(configValue, $viewValue, $modelValue) {
            if(configValue !== true) {
                return true;
            }
            var value = $viewValue || $modelValue;
            return (value && value !== "") === true;
        });
        
        vm.fields = [
            key: 'firstName',
            type: 'input',
            templateOptions: {
                label: "First name"
            }
        ];
        
        formlyTransformer.transform(vm.fields, {
            firstName: {
                required: true
            }
        });
  }
  
```

[Angular-Formly]: http://angular-formly.com
[Angular-Formly expressions]: http://docs.angular-formly.com/v7.2.3/docs/formly-expressions
[formlyTransformer]: https://github.com/wieldo/angular-formly-transformer/blob/master/README.md