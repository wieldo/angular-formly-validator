describe('formlyValidator notcontain validator', () => {
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
            name: 'notcontain',
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

    it('should be truthy if string contain phrase', () => {
        compile('test');
        expect(validate("tes")).toBeTruthy();
    });

    it('should be truthy if string contain any phrases', () => {
        compile(['foo', 'bar']);
        expect(validate("baz")).toBeTruthy();
    });

    it('should be falsy if string not contain phrase', () => {
        compile('foo');
        expect(validate("foobar")).toBeFalsy();
    });

    it('should be falsy if string not contain any phrases', () => {
        compile(['bar', 'baz']);
        expect(validate("foobaz")).toBeFalsy();
    });

});
