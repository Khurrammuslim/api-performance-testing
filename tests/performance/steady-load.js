import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    vus: 10,
    duration: '3m',
    thresholds: {
        http_req_duration: ['p(95)<500','p(99)<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/posts/1');

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response has id': (r) => JSON.parse(r.body).id !== undefined,
    });

    sleep(1);
}