describe('formlyValidator allowed validator', () => {
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

    const compile = (values) => {
        $scope = $rootScope.$new();
        const setup = testUtils.setupCompile({
            name: 'allowed',
            value: values
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
    });

    it('should be truthy on empty values', () => {
        compile('test');
        expect(validate("")).toBeTruthy();
    });

    it('should be truthy on undefined value', () => {
        compile('test');
        expect(validate(undefined)).toBeTruthy();
    });

    it('should be truthy on null value', () => {
        compile('test');
        expect(validate(null)).toBeTruthy();
    });

    it('should be falsy if string is not allowed', () => {
        compile('foo');
        expect(validate("bar")).toBeFalsy();
    });

    it('should be falsy if string is not allowed (array)', () => {
        compile(['foo', 'bar']);
        expect(validate("baz")).toBeFalsy();
    });

    it('should be falsy if string only contains allowed value', () => {
        compile('foo');
        expect(validate("fooo")).toBeFalsy();
    });

    it('should be truthy if string is allowed', () => {
        compile('foo');
        expect(validate("foo")).toBeTruthy();
    });

    it('should be truthy if string is allowed (array)', () => {
        compile(['foo', 'bar']);
        expect(validate("bar")).toBeTruthy();
    });

});
