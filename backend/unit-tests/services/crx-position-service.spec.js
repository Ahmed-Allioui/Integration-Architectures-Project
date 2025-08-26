const {expect} = require("chai")
const sinon = require("sinon")

const openCRXApi = require("../../src/remote/open-crx/config/opencrx-api");
const positionService = require('../../src/remote/open-crx/service/position-service');

describe('crx-product-service unit-tests', function (){

    describe('importing positions tests', function (){
        it("importing positions method calls the right methods" , async () => {

            //given
            let openCRXApiStub = sinon.stub(openCRXApi , "get").returns(getPositions());
            let identity = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W'

            //when
            let result = await positionService.fetchPositions(identity, getProducts());

            //then
            expect(openCRXApiStub.called).to.equal(true);
            openCRXApiStub.restore();
        })
    });
});

const getProducts = function () {
    return [
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
            name: 'HooverClean'
        },
        {
            identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
            name: 'HooverGo'
        }
    ];
}

const getPositions = function () {
    return {
        data: {
            objects: [
                {
                    '@type': 'org.opencrx.kernel.contract1.SalesOrderPosition',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W/position/9NWI6WK5381RG7IGMO3WKDQ7W',
                    '@version': 'bW9kaWZpZWRBdD0yMDIyLTAyLTEyVDE0OjIxOjU0LjMwNjAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W/position/9NWI6WK5381RG7IGMO3WKDQ7W',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    priceUomDetailedDescription: 'N/A',
                    contractPositionState: 0,
                    pricingState: 20,
                    createdAt: '2022-02-12T14:21:53.617Z',
                    quantityBackOrdered: '30.000000000',
                    amount: '3417.750000000000000000000000000',
                    modifiedAt: '2022-02-12T14:21:54.306Z',
                    discountAmount: '0.000000000',
                    taxAmount: '267.750000000000000000000000000',
                    product: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL'
                    },
                    quantityShipped: 0,
                    uomDescription: 'N/A',
                    baseAmount: '3150.000000000000000000',
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    quantity: '30.000000000',
                    owner: { _item: [Array] },
                    priceUomDescription: 'N/A',
                    positionNumber: 100000,
                    name: 'Big Money',
                    accessLevelBrowse: 3,
                    pricingRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule'
                    },
                    isGift: false,
                    lineItemNumber: 100000,
                    salesTaxType: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/salesTaxType/Vvqt0AzVEd6Oqlea7np2LA',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/salesTaxType/Vvqt0AzVEd6Oqlea7np2LA'
                    },
                    uomDetailedDescription: 'N/A',
                    calcRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT',
                        '$': 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT'
                    },
                    pricePerUnit: '105.000000000',
                    owningGroup: { _item: [Array] },
                    shippingMethod: 0,
                    productDescription: 'Hoover for service agents',
                    minMaxQuantityHandling: 0
                },
                {
                    '@type': 'org.opencrx.kernel.contract1.SalesOrderPosition',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W/position/9NWI6XBRISTF07IGMO3WKDQ7W',
                    '@version': 'bW9kaWZpZWRBdD0yMDIyLTAyLTEyVDE0OjIxOjU0LjMwNjAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9NWI6UYX6YGH87IGMO3WKDQ7W/position/9NWI6XBRISTF07IGMO3WKDQ7W',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    priceUomDetailedDescription: 'N/A',
                    contractPositionState: 0,
                    pricingState: 20,
                    createdAt: '2022-02-12T14:21:54.045Z',
                    quantityBackOrdered: '44.000000000',
                    amount: '2625.700000000000000000000000000',
                    modifiedAt: '2022-02-12T14:21:54.306Z',
                    discountAmount: '0.000000000',
                    taxAmount: '205.700000000000000000000000000',
                    product: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL'
                    },
                    quantityShipped: 0,
                    uomDescription: 'N/A',
                    baseAmount: '2420.000000000000000000',
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    quantity: '44.000000000',
                    owner: { _item: [Array] },
                    priceUomDescription: 'N/A',
                    positionNumber: 200000,
                    name: 'Pos 2',
                    accessLevelBrowse: 3,
                    pricingRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/pricingRule/LowestPriceRule'
                    },
                    isGift: false,
                    lineItemNumber: 200000,
                    salesTaxType: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/salesTaxType/Vvqt0AzVEd6Oqlea7np2LA',
                        '$': 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/salesTaxType/Vvqt0AzVEd6Oqlea7np2LA'
                    },
                    uomDetailedDescription: 'N/A',
                    calcRule: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT',
                        '$': 'xri://@openmdx*org.opencrx.kernel.contract1/provider/CRX/segment/Standard/calculationRule/DEFAULT'
                    },
                    pricePerUnit: '55.000000000',
                    owningGroup: { _item: [Array] },
                    shippingMethod: 0,
                    productDescription: 'Hoover for big companies',
                    minMaxQuantityHandling: 0
                }
            ]
        }
    }
}