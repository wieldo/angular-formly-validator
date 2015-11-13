# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Tests of setFieldValidator, getFieldValidator, isEmpty, createError and parseRegExp methods
- Tests of register method
- Restrict validator names to match pattern [a-zA-Z]{3,}
- Tests of maxlength validator
- Tests of minlength validator
- Tests of required validator
- Tests of pattern validator
- Tests of notpattern validator

### Fixed
- Not throwing errors when expression is missing or not a function

## [1.0.0] - 2015-11-11
### Changed
- Implement new formlyTransformer

### Added
- Two few helper methods (check READ ME)

## [0.0.4] - 2015-11-10
### Added
- Helper method (isEmpty) to check if value is empty
- Min number validator (minnumber)
- Max number validator (maxnumber)
- Pattern validator (pattern)
- Negation of pattern validator (notpattern)
- String to RegExp parser as helper method (parseRegExp)

### Fixed
- Use of angular.isEmpty function in maxlength and minlength validators

## [0.0.3] - 2015-11-10
### Fixed
- undefined as a result of required validator

## [0.0.2] - 2015-11-10
### Added
- Add angular-formly to package (no more need to be added manually)

## 0.0.1 - 2015-11-09

[Unreleased]: https://github.com/wieldo/angular-formly-validator/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/wieldo/angular-formly-validator/compare/v0.0.4...v1.0.0
[0.0.4]: https://github.com/wieldo/angular-formly-validator/compare/v0.3.0...v0.0.4
[0.0.3]: https://github.com/wieldo/angular-formly-validator/compare/v0.2.0...v0.0.3
[0.0.2]: https://github.com/wieldo/angular-formly-validator/compare/v0.1.0...v0.0.2