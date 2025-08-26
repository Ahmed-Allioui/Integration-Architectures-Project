const {expect} = require("chai")
const sinon = require("sinon")

const openCRXApi = require("../../src/remote/open-crx/config/opencrx-api");
const accountService = require('../../src/remote/open-crx/service/account-service');

describe('crx-account-service unit-tests', function (){

    describe('importing accounts tests', function (){
        it("importing accounts method calls the right methods" , async () => {

            //given
            let openCRXApiStub = sinon.stub(openCRXApi , "get").returns(getAccounts());

            //when
            let result = await accountService.fetchAllAccounts();

            //then
            expect(openCRXApiStub.calledOnce).to.equal(true);
            expect(result.salesmen[0].employeeId).to.equal(90123);
            expect(result.customers[0].name).to.be.equal('Telekom AG')
            openCRXApiStub.restore();
        })
    });
});

const getAccounts = function () {
    return new Promise((resolve) => resolve({
        data: {
            objects: [
                {
                    '@type': 'org.opencrx.kernel.account1.LegalEntity',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL',
                    '@version': 'bW9kaWZpZWRBdD0yMDE5LTA1LTI2VDEyOjAxOjAxLjI3ODAwMFo=',
                    numberOfEmployeesCategory: 5,
                    createdAt: '2019-05-26T12:01:01.278Z',
                    externalLink: { _item: [Array] },
                    vcard: 'BEGIN:VCARD\n' +
                        'VERSION:3.0\n' +
                        'UID:97NB4O91UQORTH2MA4T2TYJFL\n' +
                        'REV:20190526T120101Z\n' +
                        'N:Telekom AG\n' +
                        'FN:Telekom AG\n' +
                        'ADR;WORK:;;Konrad Adenauer Allee 9;Bonn;;53111;Germany\n' +
                        'END:VCARD\n',
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accountRating: 1,
                    owner: { _item: [Array] },
                    accessLevelBrowse: 3,
                    accountState: 1,
                    owningGroup: { _item: [Array] },
                    fullName: 'Telekom AG',
                    modifiedBy: { _item: [Array] },
                    identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/97NB4O91UQORTH2MA4T2TYJFL',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    modifiedAt: '2019-05-26T12:01:01.278Z',
                    accessLevelUpdate: 2,
                    disabled: false,
                    industry: 26,
                    name: 'Telekom AG'
                },
                {
                    '@type': 'org.opencrx.kernel.account1.Contact',
                    '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                    '@version': 'bW9kaWZpZWRBdD0yMDE5LTA1LTI2VDEzOjI0OjM2Ljk3NDAwMFo=',
                    closingCode: 201,
                    department: 'Sales',
                    createdAt: '2019-05-26T13:24:36.974Z',
                    governmentId: 90123,
                    jobRole: 'Senior Salesman',
                    doNotEMail: false,
                    doNotFax: false,
                    externalLink: { _item: [Array] },
                    vcard: 'BEGIN:VCARD\n' +
                        'VERSION:3.0\n' +
                        'UID:9ENFSDRCBESBTH2MA4T2TYJFL\n' +
                        'REV:20190526T132437Z\n' +
                        'N:Smith;John;Steven;Mr.;\n' +
                        'FN:John Steven Smith\n' +
                        'NICKNAME:Steve\n' +
                        'ORG:SmartHoover Ltd.\n' +
                        'TITLE:Senior Salesman\n' +
                        'TEL;WORK;VOICE:01233 33232\n' +
                        'ADR;WORK:;;Liverpool Road;London;;;Great Britain\n' +
                        'END:VCARD\n',
                    owningUser: {
                        '@href': 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User',
                        '$': 'xri://@openmdx*org.openmdx.security.realm1/provider/CRX/segment/Root/realm/Standard/principal/guest.User'
                    },
                    accountRating: 0,
                    owner: { _item: [Array] },
                    accessLevelBrowse: 3,
                    preferredContactMethod: 3,
                    preferredSpokenLanguage: 110,
                    accountState: 1,
                    owningGroup: { _item: [Array] },
                    doNotBulkPostalMail: false,
                    organization: 'SmartHoover Ltd.',
                    firstName: 'John',
                    doNotPhone: false,
                    fullName: 'Smith, John Steven',
                    modifiedBy: { _item: [Array] },
                    salutationCode: 1,
                    identity: 'xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL',
                    accessLevelDelete: 2,
                    createdBy: { _item: [Array] },
                    middleName: 'Steven',
                    modifiedAt: '2019-05-26T13:24:36.974Z',
                    nickName: 'Steve',
                    doNotPostalMail: false,
                    accessLevelUpdate: 2,
                    disabled: false,
                    lastName: 'Smith',
                    gender: 1,
                    familyStatus: 1,
                    jobTitle: 'Senior Salesman',
                    education: 7,
                    annualIncomeCurrency: 978,
                    preferredWrittenLanguage: 110
                }
            ]
        }
    }))
}