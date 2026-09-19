import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 5 },
    { duration: '10s', target: 20 },
    { duration: '20s', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const response = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}