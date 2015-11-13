testUtils = class testUtils {
    static validate(value, field, scope) {
        field.$setViewValue(value);
        scope.$digest();
        return field.$valid;
    }

    static setupCompile(validator, $scope, formlyTransformer) {
        $scope.input = "";

        var validators = {};
        validators[validator.name] = validator.value;

        var fields = formlyTransformer.run([{
            key: 'test1',
            type: 'input',
            transformers: {
                validators: validators
            }
        }]);

        $scope.options = {validation: {}, validators: {}, asyncValidators: {}};

        $scope.options.validators = fields[0].validators;
        
        return {
            element: angular.element(
                '<form name="testForm">' +
                '<input ng-model="input" name="field" formly-custom-validation />' +
                '</form>'
            ),
            formName: "testForm",
            fieldName: "field"
        };
    }
};