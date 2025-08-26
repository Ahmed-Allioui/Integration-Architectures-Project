const {expect} = require("chai")
const sinon = require("sinon")

const openCRXApi = require("../../src/remote/open-crx/config/opencrx-api");
const productService = require('../../src/remote/open-crx/service/product-service');

describe('crx-product-service unit-tests', function (){

    describe('importing products tests', function (){
        it("importing products method calls the right methods" , async () => {

            //given
            let openCRXApiStub = sinon.stub(openCRXApi , "get").returns(getProducts());

            //when
            let result = await productService.fetchAllProducts();

            //then
            expect(openCRXApiStub.calledOnce).to.equal(true);
            expect(result[0].name).to.equal('HooverClean');
            expect(result[1].name).to.equal('HooverGo');
            openCRXApiStub.restore();
        })
    });
});

const getProducts = function () {
    return new Promise((resolve) => resolve({
        data: {
            objects: [
                {
                    '@type': 'org.opencrx.kernel.product1.Product',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
                    '@version': 'bW9kaWZpZWRBdD0yMDIwLTExLTI4VDIyOjQ3OjQ3LjEzOTAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL',
                    accessLevelDelete: 2,
                    productNumber: 1002,
                    createdBy: { _item: [Array] },
                    allowModification: false,
                    itemNumber: 0,
                    createdAt: '2019-05-26T12:08:42.436Z',
                    maxQuantity: '20.000000000',
                    modifiedAt: '2020-11-28T22:47:47.139Z',
                    isStockItem: false,
                    allowRemoval: false,
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    disabled: false,
                    description: 'Hoover for service agents',
                    owner: { _item: [Array] },
                    name: 'HooverClean',
                    accessLevelBrowse: 3,
                    minPositions: 1,
                    owningGroup: { _item: [Array] },
                    productState: 1,
                    minQuantity: '1.000000000',
                    minMaxQuantityHandling: 0,
                    maxPositions: 20
                },
                {
                    '@type': 'org.opencrx.kernel.product1.Product',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
                    '@version': 'bW9kaWZpZWRBdD0yMDE5LTA1LTI2VDEyOjA3OjM3LjI4NDAwMFo=',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL',
                    accessLevelDelete: 2,
                    productNumber: 1001,
                    createdBy: { _item: [Array] },
                    allowModification: false,
                    itemNumber: 0,
                    createdAt: '2019-05-26T12:07:37.284Z',
                    maxQuantity: '20.000000000',
                    modifiedAt: '2019-05-26T12:07:37.284Z',
                    isStockItem: false,
                    allowRemoval: false,
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accessLevelUpdate: 2,
                    disabled: false,
                    description: 'Hoover for big companies',
                    owner: { _item: [Array] },
                    name: 'HooverGo',
                    accessLevelBrowse: 3,
                    minPositions: 1,
                    owningGroup: { _item: [Array] },
                    productState: 1,
                    minQuantity: '1.000000000',
                    minMaxQuantityHandling: 0,
                    maxPositions: 30
                }
            ]
        }
    }))
}