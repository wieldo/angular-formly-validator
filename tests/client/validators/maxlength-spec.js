describe('formlyValidator maxlength validator', function () {
    // injectables
    var formlyTransformer;
    var $compile;
    var $rootScope;
    
    //
    var $scope;
    var field;
    var maxlength = 5;

    beforeEach(function () {
        angular.module('testApp', ['angular-meteor', 'formly', 'formlyValidator', 'ngMock']);

        module('testApp');

        inject(function (_formlyTransformer_, _$compile_, _$rootScope_) {
            formlyTransformer = _formlyTransformer_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        compile();
    });
    
    it('should be falsy on too long value', function() {
        expect(validate("testfailed")).toBeFalsy();
    });
    
    it('should be truthy on valid values', function() {
        expect(validate("test")).toBeTruthy();
    });
    
    it('should be truthy on empty values', function() {
        expect(validate("")).toBeTruthy();
    });
    
    function validate(value) {
        return testUtils.validate(value, field, $scope);
    }

    function compile() {
        $scope = $rootScope.$new();
        var setup = testUtils.setupCompile({
            name: 'maxlength',
            value: maxlength
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    }
    
});