const {expect} = require("chai")
const sinon = require("sinon")

const Salesman = require("../../src/models/Salesman");
const recordService = require('../../src/services/record-service');
const SalesmanFactory = require('../support/salesman-factory');

describe('record-service unit-tests', function (){

    describe('getting all records tests', function (){
        it("get all records method calls the right methods" , async () => {

            //given
            const sid = 4, year = 2023;
            let salesmen;
            let salesmenPromise = SalesmanFactory.asArrayPromise(sid, year)
                .then(result => {
                    salesmen = result;
                    return result;
                });

            let findStub = sinon.stub(Salesman , "find")
                .returns(salesmenPromise);
            let aggregateStub = sinon.stub(Salesman , "aggregate")
                .returns(salesmenPromise);

            //when
            let result = await recordService.getSalesmenRecords(year);

            //then
            expect(result.salesmen).to.eq(salesmen)
            aggregateStub.restore();
            findStub.restore();
        })
    });

    describe('getting salesman records tests', function (){
        it("get salesman records method calls the right methods" , async () => {

            //given
            const sid = 0, year = 2023;
            let salesmen;
            let salesmenPromise = SalesmanFactory.asArrayPromise(sid, year)
                .then(result => {
                    salesmen = result;
                    return result;
                });

            let findStub = sinon.stub(Salesman , "find")
                .returns(salesmenPromise);
            let aggregateStub = sinon.stub(Salesman , "aggregate")
                .returns(salesmenPromise);

            //when
            let result = await recordService.getSalesmenRecords(null);

            //then
            expect(result.salesmen).to.eq(salesmen)
            expect(result.years.length).to.eq(1);
            expect(result.years[0]).to.eq(year);
            aggregateStub.restore();
            findStub.restore();
        })
    });
});