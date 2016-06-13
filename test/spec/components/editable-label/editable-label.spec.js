var app = require('APP');
var editableLabel = require('../../../../src/app/components/editable-label/main');
app.define();
describe('Components:directive::editable-label', function() {
    var element, scope, $httpBackend;

    beforeEach(angular.mock.module('static.app'));

    beforeEach(inject(function($rootScope, $compile, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        element = '<editable-label editable="edit1" text-model="hello"></editable-label>';
        element = $compile(element)(scope);

    }));

    describe("editable-label: Basic", function() {
        it('should have label', function() {
            scope.$digest();
            expect((element).find('.editable-label').length).toBe(1);
        });
    });
});