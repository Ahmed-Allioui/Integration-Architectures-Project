import {Salesman} from '../Salesman';
import {Record} from '../Record';
import {Order} from '../Order';
import {SocialPerformance} from '../SocialPerformance';

export const TEST_DATA = [
    new Salesman('1', '1', 'John', 'Doe', 'Manager', [
        new Record(2022, [
            new Order('product1', 'Acme Inc', 5, 50, 10, 500),
            new Order('product2', 'Acme Inc', 4, 40, 10, 400)
        ], [
            new SocialPerformance(1, 'increase social media followers', 1000, 1100, 100),
            new SocialPerformance(2, 'increase website traffic', 2000, 2200, 200)
        ]),
        new Record(2021, [
            new Order('product1', 'Acme Inc', 3, 30, 10, 300),
            new Order('product2', 'Acme Inc', 2, 20, 10, 200)
        ], [
            new SocialPerformance(1, 'increase social media followers', 800, 900, 100),
            new SocialPerformance(2, 'increase website traffic', 1600, 1800, 200)
        ])
    ]),
    new Salesman('2', '2', 'Jane', 'Smith', 'Associate', [
        new Record(2022, [
            new Order('product1', 'Acme Inc', 5, 50, 10, 500),
            new Order('product2', 'Acme Inc', 4, 40, 10, 400)
        ], [
            new SocialPerformance(1, 'increase social media followers', 1000, 1100, 100),
            new SocialPerformance(2, 'increase website traffic', 2000, 2200, 200)
        ]),
        new Record(2021, [
            new Order('product1', 'Acme Inc', 3, 30, 10, 300),
            new Order('product2', 'Acme Inc', 2, 20, 10, 200)
        ], [
            new SocialPerformance(1, 'increase social media followers', 800, 900, 100),
            new SocialPerformance(2, 'increase website traffic', 1600, 1800, 200)
        ])
    ]),
    new Salesman('3', '3', 'Bob', 'Johnson', 'Manager', [
        new Record(2022, [
            new Order('product1', 'Acme Inc', 5, 50, 10, 500),
            new Order('product2', 'Acme Inc', 4, 40, 10, 400)
        ], [
            new SocialPerformance(1, 'increase social media followers', 1000, 1100, 100),
            new SocialPerformance(2, 'increase website traffic', 2000, 2200, 200)
        ]),
        new Record(2021, [
            new Order('product1', 'Acme Inc', 3, 30, 10, 300),
            new Order('product2', 'Acme Inc', 2, 20, 10, 200)
        ], [
            new SocialPerformance(1, 'increase social media followers', 800, 900, 100),
            new SocialPerformance(2, 'increase website traffic', 1600, 1800, 200)
        ])
    ]),
    new Salesman('4', '4', 'Amy', 'Williams', 'Associate', [
        new Record(2022, [
            new Order('product1', 'Acme Inc', 5, 50, 10, 500),
            new Order('product2', 'Acme Inc', 4, 40, 10, 400)
        ], [
            new SocialPerformance(1, 'increase social media followers', 1000, 1100, 100),
            new SocialPerformance(2, 'increase website traffic', 2000, 2200, 200)
        ]),
        new Record(2021, [
            new Order('product1', 'Acme Inc', 3, 30, 10, 300),
            new Order('product2', 'Acme Inc', 2, 20, 10, 200)
        ], [
            new SocialPerformance(1, 'increase social media followers', 800, 900, 100),
            new SocialPerformance(2, 'increase website traffic', 1600, 1800, 200)
        ])
    ]),
    new Salesman('5', '5', 'Mike', 'Brown', 'Manager', [
        new Record(2022, [
            new Order('product1', 'Acme Inc', 5, 50, 10, 500),
            new Order('product2', 'Acme Inc', 4, 40, 10, 400)
        ], [
            new SocialPerformance(1, 'increase social media followers', 1000, 1100, 100),
            new SocialPerformance(2, 'increase website traffic', 2000, 2200, 200)
        ]),
        new Record(2021, [
            new Order('product1', 'Acme Inc', 3, 30, 10, 300),
            new Order('product2', 'Acme Inc', 2, 20, 10, 200)
        ], [
            new SocialPerformance(1, 'increase social media followers', 800, 900, 100),
            new SocialPerformance(2, 'increase website traffic', 1600, 1800, 200)
        ])
    ])
];

