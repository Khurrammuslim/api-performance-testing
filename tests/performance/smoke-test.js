import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5, //virtual-users
    duration: '15s',
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/posts/1');

    check(response, {
        'status is 200': (r) => response.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}