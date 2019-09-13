import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {SearchRequest, ResponseArray, getDoctors, responseArray, logger, timeDelay} from './project';


$(document).ready(function(event){
  const apiKey = process.env.exports.apiKey;
  let conditionTerm;
  // Portland location=45.505,-122.6750,100
  let location = "&location=45.52345%2C-122.67621%2C100";
  let userLocation = "&user_location=45.52345%2C-122.67621";

  // gets user's ip address
  // $.get('http://jsonip.com', function (res) {
  //     let ip = res.ip;
  //   });

  function fillPage(){
    responseArray.doctors.forEach(function(doctor){
      let available;
      if (doctor.status === true){
        available = "Accepting new patients!";
      } else {
        available = "Not accepting new patients.";
      }
      $(".output").append(`
        <div class ="doc-profile">
          <a href="${doctor.website}">
          <h4 class="name">${doctor.firstName} ${doctor.lastName}</h4>
          </a>
          <h6>${doctor.specialty}</h6>
          <h6 class="address">${doctor.address}</h6>
          <h6 class="phone">${doctor.phone}</h6>
          <h6 class="status">${available}</h6>
        </div>
        `)
    });
  }


  $("#search").click(function(){
    responseArray.doctors = [];
    conditionTerm = "query="+$("#conditionSearch").val();
    getDoctors(conditionTerm,location,userLocation,apiKey);
    timeDelay(logger, 2000);
    timeDelay(fillPage, 2500);


  });






});
