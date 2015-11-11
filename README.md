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

### <a name="formlyValidator.register"></a>*formlyValidator*.register(name, expression)

__Arguments__

* __name__ *{String}*  

 Validator name. Used to identify validator in formly field configuration

* __expression__ *{Function}*  

 Function with four arguments (config, $viewValue, $modelValue, $scope). Config is the field's validator configuration.
 See [Angular-Formly expressions].


__Returns__  *{undefined}*

-

### <a name="formlyValidator.setFieldValidator"></a>*formlyValidator*.setFieldValidator(field, name, config)

__Arguments__

* __field__ *{Object}*  

 Formly field configuration.

* __name__ *{String}*  

 Validator name
 
* __config__ *{*}*  
 
  Validator configuration for field


__Returns__  *{undefined}*


Defined validator configuration for field

-

### <a name="formlyValidator.getFieldValidator"></a>*formlyValidator*.getFieldValidator(field, name)

__Arguments__

* __field__ *{Object}*  

 Formly field configuration.

* __name__ *{String}*  

 Validator name


__Returns__  *{*}*


Returns validator configuration for field

-

### <a name="formlyValidator.createError"></a>*formlyValidator*.createError(msg)

__Arguments__

* __msg__ *{String}*  

 Error message

__Returns__  *{Error}*


Returns Error object with prefixed message.

```
[FormlyValidator] <msg>
```

-

### <a name="formlyValidator.isEmpty"></a>*formlyValidator*.isEmpty(value)

__Arguments__

* __value__ *{*}*  

 Variable to check

__Returns__  *{Boolean}*


Checks if variable is empty.

-

### <a name="formlyValidator.parseRegExp"></a>*formlyValidator*.parseRegExp(regexp)

__Arguments__

* __regexp__ *{String|RegExp}*  

 Pattern

__Returns__  *{RegExp|Undefined}*


You can put string representation of RegExp object (for example "[a-z]+") or just RegExp object.
Adds `^` and `$` to string representation and returns `undefined` if argument of function is not a string or RegExp.   

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