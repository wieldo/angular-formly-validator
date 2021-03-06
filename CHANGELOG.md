# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.5.0] - 2016-01-18

### Changed

- BREAKING CHANGE: angular-meteor is no longer a dependency
- BREAKING CHANGE: pbastowski:angular2-now is no longer used
- BREAKING CHANGE: using official angular-formly package (formly:angular-formly)

## [1.4.0] - 2015-11-26
### Added
- **allowed** validator
- **notallowed** validator

## [1.3.0] - 2015-11-26
### Added
- **contain** validator
- **notcontain** validator

## [1.2.0] - 2015-11-26
### Added
- **match** validator
- **notmatch** validator

## [1.1.1] - 2015-11-18
### Changed
- Refactor all files to use Strict Dependency Injection

## [1.1.0] - 2015-11-13
### Added
- Tests of setFieldValidator, getFieldValidator, isEmpty, createError and parseRegExp methods
- Tests of register method
- Restrict validator names to match pattern [a-zA-Z]{3,}
- Tests of maxlength validator
- Tests of minlength validator
- Tests of required validator
- Tests of pattern validator
- Tests of notpattern validator
- Tests of maxnumber validator
- Support of floats in maxnumber validator
- Tests of minnumber validator
- Support of floats in minnumber validator

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

[1.5.0]: https://github.com/wieldo/angular-formly-validator/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/wieldo/angular-formly-validator/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/wieldo/angular-formly-validator/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/wieldo/angular-formly-validator/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/wieldo/angular-formly-validator/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/wieldo/angular-formly-validator/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/wieldo/angular-formly-validator/compare/v0.0.4...v1.0.0
[0.0.4]: https://github.com/wieldo/angular-formly-validator/compare/v0.3.0...v0.0.4
[0.0.3]: https://github.com/wieldo/angular-formly-validator/compare/v0.2.0...v0.0.3
[0.0.2]: https://github.com/wieldo/angular-formly-validator/compare/v0.1.0...v0.0.2
