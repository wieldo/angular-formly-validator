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

    it('should be able to set field validator', function () {
        // empty field
        var field = {
            key: 'test'
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validator: {
                    required: true
                }
            }
        });

        // field with only transformers property

        field = {
            key: 'test',
            transformers: {}
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validators: {
                    required: true
                }
            }
        });

        // field with one validator

        field = {
            key: 'test',
            transformers: {
                validators: {
                    minlength: 3
                }
            }
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validator: {
                    required: true,
                    minlength: 3
                }
            }
        });

    });

    it('should be able to get field validator', function () {
        var fields = [
            {
                field: {
                    key: 'test'
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {}
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {
                        validators: {}
                    }
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {
                        validators: {
                            required: true
                        }
                    }
                },
                expected: true
            }
        ];

        _.each(fields, function (field) {
            expect(formlyValidator.getFieldValidator(field.field, 'required')).toEqual(field.expected);
        });
    });

});