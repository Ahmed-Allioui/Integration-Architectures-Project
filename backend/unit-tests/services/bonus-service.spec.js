const {expect} = require("chai")
const sinon = require("sinon")

const Salesman = require("../../src/models/Salesman");
const bonusService = require('../../src/services/bonus-service');
const SalesmanFactory = require('../support/salesman-factory');
const MongooseFactory = require('../support/mongoose-factory');
const UserFactory = require('../support/user-factory');

describe('bonus-service unit-tests', function (){

    describe('bonus generation tests', function (){
        it("bonus generate method calls the right methods" , async () => {

            //given
            const sid = 0, year = 2023;
            let salesman;
            let salesmen = SalesmanFactory.asArrayPromise(sid, year)
                .then(salesmen => {
                    salesman = salesmen[0];
                    return salesmen;
                });
            let updated = MongooseFactory.updatedResult();

            let aggregateStub = sinon.stub(Salesman , "aggregate")
                .returns(salesmen);
            let updateOneStub = sinon.stub(Salesman , "updateOne")
                .returns(updated);

            //when
            let result = await bonusService.generateSalesmanBonus(sid, year);

            //then
            expect(result).to.eq(salesman)
            aggregateStub.restore();
            updateOneStub.restore();
        })
    });

    describe('bonus validation for CEO tests', function (){
        it("bonus validation for CEO calls the right methods" , async () => {
            await testValidateOrRejectBonus(UserFactory.asCEO(), (currentUser, sid, year) => {
                return bonusService.validateBonus(currentUser, sid, year);
            });
        })
    });

    describe('bonus rejection for CEO tests', function (){
        it("bonus rejection for CEO calls the right methods" , async () => {
            await testValidateOrRejectBonus(UserFactory.asCEO(), (currentUser, sid, year) => {
                return bonusService.rejectBonus(currentUser, sid, year);
            });
        })
    });

    describe('bonus validation for HR tests', function (){
        it("bonus validation for HR calls the right methods" , async () => {
            await testValidateOrRejectBonus(UserFactory.asHR(), (currentUser, sid, year) => {
                return bonusService.validateBonus(currentUser, sid, year);
            });
        })
    });

    describe('bonus rejection for HR tests', function (){
        it("bonus rejection for HR calls the right methods" , async () => {
            await testValidateOrRejectBonus(UserFactory.asHR(), (currentUser, sid, year) => {
                return bonusService.rejectBonus(currentUser, sid, year);
            });
        })
    });

    describe('bonus validation for salesman tests', function (){
        it("bonus validation for salesman calls the right methods" , async () => {
            await testCurrentSalesmanValidateOrRejectBonus((currentUser, year) => {
                return bonusService.validateCurrentSalesmanBonus(currentUser, year);
            });
        })
    });

    describe('bonus rejection for salesman tests', function (){
        it("bonus rejection for salesman calls the right methods" , async () => {
            await testCurrentSalesmanValidateOrRejectBonus((currentUser, year) => {
                return bonusService.rejectCurrentSalesmanBonus(currentUser, year);
            });
        })
    });
});

/**
 * Helper functions to avoid redundancy
 */
const testValidateOrRejectBonus = async function(currentUser, fun) {
    //given
    const sid = 1, year = 2022;
    let salesman = SalesmanFactory.asSingle(sid, year);
    let salesmen = new Promise((resolve => resolve([salesman])))
    let updated = MongooseFactory.updatedResult();

    let aggregateStub = sinon.stub(Salesman , "aggregate")
        .returns(salesmen);
    let updateOneStub = sinon.stub(Salesman , "updateOne")
        .returns(updated);

    //when
    let result = await fun(currentUser, sid, year);

    //then
    expect(result).to.eq(salesman)
    aggregateStub.restore();
    updateOneStub.restore();
}

const testCurrentSalesmanValidateOrRejectBonus = async function(fun) {
    //given
    const sid = 2, year = 2022;
    let currentUser = UserFactory.asSalesman(sid);
    let salesman = SalesmanFactory.asSingle(sid, year);
    let salesmen = new Promise((resolve => resolve([salesman])))
    let updated = MongooseFactory.updatedResult();

    let aggregateStub = sinon.stub(Salesman , "aggregate")
        .returns(salesmen);
    let updateOneStub = sinon.stub(Salesman , "updateOne")
        .returns(updated);

    //when
    let result = await fun(currentUser, year);

    //then
    expect(result).to.eq(salesman)
    aggregateStub.restore();
    updateOneStub.restore();
}