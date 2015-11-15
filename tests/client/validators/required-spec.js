describe('formlyValidator required validator', () => {
    //
    // vars
    //
    let formlyTransformer;
    let $compile;
    let $rootScope;
    let $scope;
    let field;

    //
    // helpers
    //

    const validate = (value) => {
        return testUtils.validate(value, field, $scope);
    };

    const compile = () => {
        $scope = $rootScope.$new();
        const setup = testUtils.setupCompile({
            name: 'required',
            value: true
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    };

    //
    // tests
    //

    beforeEach(() => {
        angular.module('testApp', ['angular-meteor', 'formly', 'formlyValidator', 'ngMock']);

        module('testApp');

        inject(function (_formlyTransformer_, _$compile_, _$rootScope_) {
            formlyTransformer = _formlyTransformer_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        compile();
    });

    it('should be falsy on empty values', () => {
        expect(validate("")).toBeFalsy();
    });

    it('should be falsy on undefined value', () => {
        expect(validate(undefined)).toBeFalsy();
    });

    it('should be falsy on null value', () => {
        expect(validate(null)).toBeFalsy();
    });

    it('should be truthy on non empty value', () => {
        const values = ["test", 1234, 0, 1, true, false, () => {
        }, {}, []];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

});
