import {Order} from './Order';
import {SocialPerformance} from './SocialPerformance';

export class Record{
    constructor(
        public year: number,
        public orders: Order[],
        public socialPerformances: SocialPerformance[],
        public validatedByCEO: boolean,
        public validatedByHR: boolean,
        public validatedBySalesman: boolean,
        public remarks: string
    ) {  }
}
