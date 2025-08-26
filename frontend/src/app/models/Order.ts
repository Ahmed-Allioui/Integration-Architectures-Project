export class Order{
    constructor(
        public productName: string,
        public client: string,
        public clientRanking: number,
        public items: number,
        public unitPrice: number,
        public bonus: number
    ) {  }
}
