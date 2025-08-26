exports.Salesorder = class {
    constructor() {
        this.identity = ''
        this.createdAt = ''
        this.customer = ''
        this.salesman = ''
        this.positions = []
    }

    addPositions(positions) {
        if(!positions) return;
        for(const position of positions) {
            this.positions.push(position);
        }
    }
}