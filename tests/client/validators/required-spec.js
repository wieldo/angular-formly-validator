describe('formlyValidator required validator', function () {
    // injectables
    var formlyTransformer;
    var $compile;
    var $rootScope;

    //
    var $scope;
    var field;

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

    it('should be falsy on empty values', function () {
        expect(validate("")).toBeFalsy();
    });

    it('should be falsy on undefined value', function () {
        expect(validate(undefined)).toBeFalsy();
    });

    it('should be falsy on null value', function () {
        expect(validate(null)).toBeFalsy();
    });

    it('should be truthy on non empty value', function () {
        var values = ["test", 1234, 0, 1, true, false, function () {
        }, {}, []];
        
        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
        
        /*expect(validate(1234)).toBeTruthy();
        expect(validate(true)).toBeTruthy();
        expect(validate(false)).toBeTruthy();
        expect(validate(0)).toBeTruthy();
        expect(validate(1)).toBeTruthy();*/
    });

    function validate(value) {
        return testUtils.validate(value, field, $scope);
    }

    function compile() {
        $scope = $rootScope.$new();
        var setup = testUtils.setupCompile({
            name: 'required',
            value: true
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    }

});