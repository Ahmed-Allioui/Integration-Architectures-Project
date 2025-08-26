const {expect} = require("chai")
const sinon = require("sinon")

const salesOrderService = require('../../src/remote/open-crx/service/salesorder-service');
const salesmanService = require('../../src/remote/open-crx/service/salesman-service');

describe('crx-product-service unit-tests', function (){

    describe('importing salesmen tests', function (){
        it("importing salesmen method calls the right methods" , async () => {

            //given
            let salesOrderServiceStub = sinon.stub(salesOrderService , "fetchAllSalesorders").returns(getFinalSalesOrders());

            //when
            let result = await salesmanService.fetchAllSalesmen(2022);

            //then
            expect(salesOrderServiceStub.called).to.equal(true);
            expect(result.length).to.equal(5);
            salesOrderServiceStub.restore();
        })
    });
});

const getFinalSalesOrders = function () {
    return new Promise((resolve) => resolve([
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W',
            createdAt: '2022-02-12T14:21:53.471Z',
            customer: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL',
                name: 'Germania GmbH',
                accountRating: 3
            },
            salesman: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/L0NTAXG7TQTPM0EBHQA5MAZ7J',
                employeeId: 90124
            },
            positions: getPositions()
        },
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWIA1QJWTCRW7IGMO3WKDQ7W',
            createdAt: '2022-02-13T13:44:43.358Z',
            customer: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ6MJS0KX5H2MA4T2TYJFL',
                name: 'Dirk Müller GmbH',
                accountRating: 3
            },
            salesman: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                employeeId: 90123
            },
            positions: getPositions()
        },
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/RPEPWOQDWB84S7IGMO3WKDQ7W',
            createdAt: '2022-02-12T14:11:33.905Z',
            customer: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL',
                name: 'Telekom AG',
                accountRating: 1
            },
            salesman: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/L0NTAXG7TQTPM0EBHQA5MAZ7J',
                employeeId: 90124
            },
            positions: getPositions()
        },
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/RPI8KYL4J2GA47IGMO3WKDQ7W',
            createdAt: '2022-02-09T14:03:37.020Z',
            customer: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ6MJS0KX5H2MA4T2TYJFL',
                name: 'Dirk Müller GmbH',
                accountRating: 3
            },
            salesman: '',
            positions: getPositions()
        },
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/RPI8V9YPYA8Z07IGMO3WKDQ7W',
            createdAt: '2022-02-13T13:40:53.158Z',
            customer: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL',
                name: 'Germania GmbH',
                accountRating: 3
            },
            salesman: {
                identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                employeeId: 90123
            },
            positions: getPositions()
        }
    ]))
}

const getPositions = function () {
    return [
        {
            quantity: '30.000000000',
            amount: '3417.750000000000000000000000000',
            product: {
                identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
                name: 'HooverClean'
            }
        },
        {
            quantity: '44.000000000',
            amount: '2625.700000000000000000000000000',
            product: {
                identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
                name: 'HooverGo'
            }
        }
    ];
}