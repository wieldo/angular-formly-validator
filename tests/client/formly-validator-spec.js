describe('formlyValidator', function () {
    var formlyValidator;

    beforeEach(function () {
        module('formlyValidator');

        inject(function (_formlyValidator_) {
            formlyValidator = _formlyValidator_;
        });
    });

    it('should be able to parse RegExp', function () {
        var objects = [];

        // valid
        objects.push({
            value: "[a-z]+",
            expected: new RegExp("^[a-z]+$")
        });

        objects.push({
            value: new RegExp("^[a-z]+$"),
            expected: new RegExp("^[a-z]+$")
        });

        objects.push({
            value: "1234",
            expected: new RegExp("^1234$")
        });

        objects.push({
            value: "undefined",
            expected: new RegExp("^undefined$")
        });

        // invalid
        objects.push({
            value: [],
            expected: undefined
        });

        objects.push({
            value: 1234,
            expected: undefined
        });

        objects.push({
            value: null,
            expected: undefined
        });

        objects.push({
            value: function () {
            },
            expected: undefined
        });

        objects.push({
            value: {},
            expected: undefined
        });

        _.each(objects, function (obj) {
            expect(formlyValidator.parseRegExp(obj.value)).toEqual(obj.expected);
        });
    });

    it('should be able to check empty value', function () {
        var emptyValues = [
            null, undefined, ""
        ];
        var notEmptyValues = [
            function () {
            }, {}, true, false, " ", 1, 0, -1, "1", "0", "-1", "s", "undefined", "null"
        ];

        // empty
        _.each(emptyValues, function (val) {
            expect(formlyValidator.isEmpty(val)).toBeTruthy();
        });
        // not empty
        _.each(notEmptyValues, function (val) {
            expect(formlyValidator.isEmpty(val)).toBeFalsy();
        });
    });

    it('should be able to create error with prefixed message', function () {
        expect(function () {
            throw formlyValidator.createError("test");
        }).toThrowError(Error, "[formlyValidator] test");

        expect(function () {
            formlyValidator.createError("test");
        }).not.toThrowError();
    });

});