export class Doctor {
  constructor(firstName,lastName,address,phone,website,status) {
    this.firstName = firstName;
    this.lastName = lastName;
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

export class ResponseArray {
  constructor (){
    this.object;
    this.doctors = [];
  }
  doctorList(){
    for (let i=0; i< this.object.length; i++) {
      let doc = this.object[i];
      const firstName = doc.profile.first_name;
      const lastName = doc.profile.first_name;
      const address = doc.practices[0].visit_address;
      const addressString = address.street +", "+ address.city+ ", " + address.state +", " + address.zip;
      const phone = doc.practices[0].phones[0].number;
      const website = "www.google.com"
      const status = doc.practices[0].accepts_new_patients;
      const doctor = new Doctor(firstName,lastName,addressString,phone,website,status);
      this.doctors.push(doctor);
    }
  }
}

export const responseArray = new ResponseArray();

export function getDoctors(conditionTerm, location, userLocation, apiKey) {
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

export function fillPage() {
  let myVar = setTimeout(logger, 3000);
}
