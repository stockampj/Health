import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {ResponseArray, getDoctors, logDocs, responseArray, timeDelay, ipLocation, inputCleaner} from './project';


$(document).ready(function(){
  const apiKey = process.env.exports.apiKey;
  let conditionTerm;
  //hard code Portland if error in ip retrival
  let location = "&location=45.52345%2C-122.67621%2C40";
  let doctorSearch = ""

  $.get('http://jsonip.com', function (res) {
      let ip = res.ip;
      timeDelay(ipLocation(ip), 700);
    });

  function fillPage(){
    console.log(responseArray.doctors)
    if (responseArray.doctors.length < 1) {
      console.log("exception");
      $('.errors').text(`There were no doctors that matched your search critia`);
    }
    responseArray.doctors.forEach(function(doctor){
      let available;
      if (doctor.status === true){
        available = "<h6 class='status available'>Accepting new patients</h6>";
      } else {
        available = "<h6 class='status unavailable'> Not accepting new patients</h6>";
      }
      if (doctor.website === undefined){
        doctor.website = "#"
      }
      $(".output").append(`
        <div class ="doc-profile">
          <div class="bio">
            <a href="${doctor.website}">
            <h4 class="name">${doctor.firstName} ${doctor.lastName}</h4>
            </a>
            <h6>${doctor.specialty}</h6>
            <h6 class="address">${doctor.address}</h6>
            <h6 class="phone">${doctor.phone}</h6>
            ${available}
          </div>
        </div>
        `)
    });
  }


  $("#search").click(function(){
    $(".output").text("");
    $('.errors').text("")
    responseArray.doctors = [];
    doctorSearch = "&name=" + inputCleaner($("#doctorSearch").val());
    conditionTerm = "&query="+inputCleaner($("#conditionSearch").val());
    location = responseArray.location;
    getDoctors(doctorSearch,conditionTerm,location,apiKey);
    timeDelay(logDocs, 1500);
    timeDelay(fillPage, 1600);
  });
});
