export class SocialPerformance{
    constructor(
        public _id: string,
        public goalDescription: string,
        public targetValue: number,
        public actualValue: number,
        public bonus: number
    ) {  }

}
