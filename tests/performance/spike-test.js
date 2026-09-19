import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },    
    { duration: '10s', target: 5 },    
    { duration: '5s', target: 100 },   
    { duration: '30s', target: 100 },  
    { duration: '10s', target: 5 },    
    { duration: '10s', target: 5 },    
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.10'], 
  },
};

export default function () {
  const response = http.get('http://localhost:3000/users/1');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}