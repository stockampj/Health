export class Doctor {
  constructor(firstName,lastName,specialty,address,phone,website,status) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialty = specialty;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.status = status;
  }
}

export class SearchRequest {
  constructor (conditionTerm, location) {
    this.condition = conditionTerm;
    this.location = location;
  }
}

export class Conditions {
  constructor(){
    this.conditionsList = [];
  }
}

export class ResponseArray {
  constructor (){
    this.object;
    this.doctors = [];
  }
  doctorList(){
    for (let i=0; i< this.object.length; i++) {
      const doc = this.object[i];
      const title = doc.profile.title;
      if (title === "MD") {
        console.log(doc)
        const firstName = doc.profile.first_name;
        const lastName = doc.profile.last_name;
        const specialty = doc.specialties[0].name;
        const address = doc.practices[0].visit_address;
        const addressString = address.street +", "+ address.city+ ", " + address.state +", " + address.zip;
        const phone = doc.practices[0].phones[0].number;
        const website = doc.practices[0].website;
        const status = doc.practices[0].accepts_new_patients;
        const doctor = new Doctor(firstName,lastName,specialty,addressString,phone,website,status);
        this.doctors.push(doctor);
      } 
    }
  }
}

export const responseArray = new ResponseArray();

export function getDoctors(conditionTerm, location, userLocation, apiKey) {
  let promise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    const url = `https:\//api.betterdoctor.com/2016-03-01/doctors?${conditionTerm}${location}${userLocation}&skip=0&limit=30&user_key=${apiKey}`;
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

  let apiResponse;
  promise.then(function(response){
    let apiResponse = JSON.parse(response);
    responseArray.object = apiResponse.data;
  })
}

export function logger(){
  responseArray.doctorList();
  console.log(responseArray.doctors)
}

export function timeDelay(action, delay) {
  let myVar = setTimeout(action, delay);
}
