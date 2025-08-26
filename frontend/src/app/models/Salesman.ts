import {Record} from './Record';
export class Salesman{
    constructor(
        public employeeId: string,
        public orangeHRMId: string,
        public firstName: string,
        public lastName: string,
        public jobTitle: string,
        public department: string,
        public records: Record[]
    ) {  }
}
