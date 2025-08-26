const {expect} = require("chai")
const sinon = require("sinon")

const openCRXApi = require("../../src/remote/open-crx/config/opencrx-api");
const salesOrderService = require('../../src/remote/open-crx/service/salesorder-service');
const productService = require('../../src/remote/open-crx/service/product-service');
const positionService = require('../../src/remote/open-crx/service/position-service');
const accountService = require('../../src/remote/open-crx/service/account-service');

describe('crx-product-service unit-tests', function (){

    describe('importing sales orders tests', function (){
        it("importing sales orders method calls the right methods" , async () => {

            //given
            let openCRXApiStub = sinon.stub(openCRXApi , "get").returns(getSalesOrders());
            let productServiceStub = sinon.stub(productService , "fetchAllProducts").returns(getProducts());
            let positionServiceStub = sinon.stub(positionService , "fetchPositions").returns(getPositions());
            let accountServiceStub = sinon.stub(accountService , "fetchAllAccounts").returns(getAccount());

            //when
            let result = await salesOrderService.fetchAllSalesorders(2022);

            //then
            expect(openCRXApiStub.called).to.equal(true);
            expect(result.length).to.equal(0);
            openCRXApiStub.restore();
            productServiceStub.restore();
            positionServiceStub.restore();
            accountServiceStub.restore();
        })
    });
});

const getSalesOrders = function () {
    return new Promise((resolve) => resolve({
        data: {
            objects: [
                {
                    '@type': 'org.opencrx.kernel.contract1.SalesOrder',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DTSXR06DLHPM0EBHQA5MAZ7J',
                    '@version': 'bW9kaWZpZWRBdD0yMDIwLTAxLTA3VDExOjA1OjMzLjY3MjAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DTSXR06DLHPM0EBHQA5MAZ7J',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    contractNumber: 'Telekom_Sallinger_2019',
                    pricingState: 10,
                    createdAt: '2020-01-07T10:45:34.872Z',
                    modifiedAt: '2020-01-07T11:05:33.672Z',
                    totalDiscountAmount: '0.000000000',
                    totalBaseAmount: '5500.000000000',
                    activeOn: '2019-08-01T09:41:01.000Z',
                    contractState: 1410,
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    disabled: false,
                    priority: 3,
                    owner: { _item: [Array] },
                    salesRep: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/L0NTAXG7TQTPM0EBHQA5MAZ7J',
                        '$': 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/L0NTAXG7TQTPM0EBHQA5MAZ7J'
                    },
                    contractCurrency: 978,
                    freightTerms: 0,
                    name: 'Telekom_Sallinger_2019',
                    accessLevelBrowse: 3,
                    pricingRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule'
                    },
                    isGift: false,
                    customer: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL',
                        '$': 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL'
                    },
                    calcRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT',
                        '$': 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT'
                    },
                    totalTaxAmount: '467.500000000',
                    totalSalesCommission: '0.000000000',
                    noAutoRecalc: false,
                    totalAmountIncludingTax: '5967.500000000',
                    owningGroup: { _item: [Array] },
                    shippingMethod: 0,
                    totalAmount: '5500.000000000',
                    paymentTerms: 0,
                    submitStatus: 0,
                    contractLanguage: 0
                },
                {
                    '@type': 'org.opencrx.kernel.contract1.SalesOrder',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DXSKIH1RCHD5H2MA4T2TYJFL',
                    '@version': 'bW9kaWZpZWRBdD0yMDE5LTA1LTI2VDEzOjMzOjA3LjE4MjAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DXSKIH1RCHD5H2MA4T2TYJFL',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    contractNumber: 'German1',
                    pricingState: 10,
                    createdAt: '2019-05-26T13:32:08.372Z',
                    modifiedAt: '2019-05-26T13:33:07.182Z',
                    totalDiscountAmount: '0.000000000',
                    totalBaseAmount: '2500.000000000',
                    activeOn: '2018-02-12T14:32:53.000Z',
                    contractState: 1410,
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    disabled: false,
                    priority: 3,
                    owner: { _item: [Array] },
                    salesRep: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                        '$': 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL'
                    },
                    contractCurrency: 978,
                    freightTerms: 0,
                    name: 'German1',
                    accessLevelBrowse: 3,
                    pricingRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule'
                    },
                    isGift: false,
                    customer: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL',
                        '$': 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL'
                    },
                    calcRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT',
                        '$': 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT'
                    },
                    totalTaxAmount: '212.500000000',
                    totalSalesCommission: '0.000000000',
                    noAutoRecalc: false,
                    totalAmountIncludingTax: '2712.500000000',
                    owningGroup: { _item: [Array] },
                    shippingMethod: 0,
                    totalAmount: '2500.000000000',
                    paymentTerms: 0,
                    submitStatus: 0,
                    contractLanguage: 0
                }
            ]
        }
    }))
}

const getPositions = function () {
    return new Promise((resolve => resolve(
        [
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
        ]
    )));
}

const getProducts = function () {
    return new Promise(resolve => resolve(
        [
            {
                identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
                name: 'HooverClean'
            },
            {
                identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
                name: 'HooverGo'
            }
        ]
    ));
}

const getAccount = function() {
    return new Promise(resolve => resolve(
        {
            salesmen: [
                {
                    identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                    employeeId: 90123
                }
            ],
            customers: [
                {
                    identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL',
                    name: 'Telekom AG',
                    accountRating: 1
                }
            ]
        }
    ));
}