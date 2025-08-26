const {expect} = require("chai")
const sinon = require("sinon")

const remoteService = require('../../src/services/remote-service');
const openCRXApi = require("../../src/remote/open-crx/config/opencrx-api");
const orangeApi = require("../../src/remote/orange-hrm/config/orangehrm-api");
const SalesmanFactory = require("../support/salesman-factory");
const Salesman = require("../../src/models/Salesman");
const MongooseFactory = require("../support/mongoose-factory");

describe('remote-service unit-tests', function (){

    describe('importing records tests', function (){
        it("importing records method calls the right methods" , async () => {

            //given
            const sid = 4, year = 2023;
            let salesmen;
            let salesmenPromise = SalesmanFactory.asArrayPromise(sid, year).then(result => {
                salesmen = result;
                return result;
            });

            let updated = MongooseFactory.updatedResult(1,1);
            let findOneStub = sinon.stub(Salesman , "findOne").returns(salesmenPromise);
            let findStub = sinon.stub(Salesman , "find").returns(salesmenPromise);
            let aggregateStub = sinon.stub(Salesman , "aggregate").returns(salesmenPromise);
            let salesOrdersStub = sinon.stub(openCRXApi , "get").returns(getDefaultPromise());
            let orangeStub = sinon.stub(orangeApi , "get").returns(getDefaultPromise());
            let updateOneStub = sinon.stub(Salesman , "updateOne").returns(updated);

            //when
            let result = await remoteService.importSalesmen(year);

            //then
            expect(salesOrdersStub.called).to.equal(true);
            expect(orangeStub.called).to.equal(true);
            salesOrdersStub.restore();
            orangeStub.restore();
            findOneStub.restore();
            updateOneStub.restore();
            aggregateStub.restore();
            findStub.restore();
        })
    });
});

const getDefaultPromise = function () {
    return new Promise((resolve) => resolve({
        data: {
            objects: []
        }
    }))
}