import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {ResponseArray, getDoctors, responseArray, logger, timeDelay, ipLocation, inputCleaner} from './project';


$(document).ready(function(event){
  const apiKey = process.env.exports.apiKey;
  let conditionTerm;
  //hard code Portland if error in ip retrival
  let location = "&location=45.52345%2C-122.67621%2C40";

  $.get('http://jsonip.com', function (res) {
      let ip = res.ip;
      timeDelay(ipLocation(ip), 700);
    });

  function fillPage(){
    $(".output").text("");
    responseArray.doctors.forEach(function(doctor){
      let available;
      if (doctor.status === true){
        available = "<h6 class='status available'>Accepting new patients!</h6>";
      } else {
        available = "<h6 class='status unavailable'> Not accepting new patients.</h6>";
      }
      $(".output").append(`
        <div class ="doc-profile">
          <a href="${doctor.website}">
          <h4 class="name">${doctor.firstName} ${doctor.lastName}</h4>
          </a>
          <h6>${doctor.specialty}</h6>
          <h6 class="address">${doctor.address}</h6>
          <h6 class="phone">${doctor.phone}</h6>
          ${available}
        </div>
        `)
    });
  }


  $("#search").click(function(){
    responseArray.doctors = [];
    location = responseArray.location;
    conditionTerm = "&query="+inputCleaner($("#conditionSearch").val());
    getDoctors(conditionTerm,location,apiKey);
    timeDelay(logger, 1500);
    timeDelay(fillPage, 1600);

  });

  inputCleaner("joel stockamp likes pizza")
});
