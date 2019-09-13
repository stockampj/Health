import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {SearchRequest, ResponseArray, getDoctors, responseArray, logger, fillPage} from './project';

const apiKey = process.env.exports.apiKey;


$(document).ready(function(event){
  let conditionTerm = "query=Headache";
  // Portland location=45.505,-122.6750,100
  let location = "&location=45.52345%2C-122.67621%2C100";
  let userLocation = "&user_location=45.52345%2C-122.67621";

  getDoctors(conditionTerm,location,userLocation,apiKey);

  $("#logger").click(function(){
    responseArray.doctorList();
    console.log(responseArray.doctors)
  })

  fillPage();

});
