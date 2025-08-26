const {expect} = require("chai")
const sinon = require("sinon")

const openHRMApi = require("../../src/remote/orange-hrm/config/orangehrm-api");
const salesmanService = require('../../src/remote/orange-hrm/service/salesman-service');

describe('hrm-account-service unit-tests', function (){

    describe('importing salesmen tests', function (){
        it("importing salesmen method calls the right methods" , async () => {

            //given
            let openCRXApiStub = sinon.stub(openHRMApi , "get").returns(getData());

            //when
            await salesmanService.fetchAllEmployees();

            //then
            expect(openCRXApiStub.called).to.equal(true);
            openCRXApiStub.restore();
        })
    });
});

const getData = function () {
    return new Promise((resolve) => resolve({
        data: {
            objects: []
        }
    }))
}