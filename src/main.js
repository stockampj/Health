import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {} from './project';

const apiKey = process.env.exports.apiKey;

$(document).ready(function(event){
  let conditionTerm = "query=Headache";
  // Portland location=45.505,-122.6750,100
  let location = "&location=45.52345%2C-122.67621%2C100";
  let userLocation = "&user_location=45.52345%2C-122.67621";


  function getDoctors(conditionTerm, location) {
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      const url = `https:\//api.betterdoctor.com/2016-03-01/doctors?${conditionTerm}${location}${userLocation}&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function (){
        if(this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET",url,true);
      request.send();
    });

    promise.then(function(response){
      let body = JSON.parse(response);
      console.log(body)
    })
  }

  getDoctors(conditionTerm,location);


});
