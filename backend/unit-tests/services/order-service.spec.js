const {expect} = require("chai")
const sinon = require("sinon")

const Salesman = require("../../src/models/Salesman");
const orderService = require('../../src/services/order-service');
const SalesmanFactory = require('../support/salesman-factory');
const MongooseFactory = require('../support/mongoose-factory');
const OrderFactory = require('../support/order-factory')

describe('order-service unit-tests', function (){

    describe('order addition tests', function (){
        it("orders add method calls the right methods" , async () => {

            //given
            const sid = 2, year = 2023;
            const upsertedCount = 1, modifiedCount = 1;
            let updated = MongooseFactory.updatedResult(upsertedCount,modifiedCount);
            let orders = OrderFactory.asArray();

            let findOneStub = sinon.stub(Salesman , "findOne")
                .returns(SalesmanFactory.asPromise(sid, year));
            let updateOneStub = sinon.stub(Salesman , "updateOne")
                .returns(updated);

            //when
            let result = await orderService.addOrders(sid, year, orders);

            //then
            expect(result.upsertedCount).to.eq(upsertedCount);
            expect(result.modifiedCount).to.eq(modifiedCount);
            findOneStub.restore();
            updateOneStub.restore();
        })
    });

    describe('order deletion tests', function (){
        it("orders delete method calls the right methods" , async () => {

            //given
            const sid = 0, year = 2023;
            const upsertedCount = 1, modifiedCount = 1;
            let updated = MongooseFactory.updatedResult(upsertedCount,modifiedCount);

            let updateOneStub = sinon.stub(Salesman , "updateOne")
                .returns(updated);

            //when
            let result = await orderService.deleteAllOrders(sid, year);

            //then
            expect(result.upsertedCount).to.eq(upsertedCount);
            expect(result.modifiedCount).to.eq(modifiedCount);
            updateOneStub.restore();
        })
    });
});