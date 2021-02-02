import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 2,
  duration: "2s",
  thresholds: {
    errors: ["count<10"]
  }
};

export default function() {
 // const path = Math.random() < 0.9 ? "200" : "500";

  let res = http.get(`http://host.docker.internal:3001/login`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
  }
  
  // Print all Response Headers
  //for (var p in res.headers) {
  //  if (res.headers.hasOwnProperty(p)) {
  //    console.log(p + ' : ' + res.headers[p]);
  //  }
 // }
  
 let authToken = res.headers["Login-Session-Token"];
  check(authToken, { 'logged in successfully': () => authToken !== '', });

    console.log( authToken);

  sleep(2);
}
