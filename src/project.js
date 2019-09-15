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


export class ResponseArray {
  constructor (){
    this.object;
    this.doctors = [];
    this.location = "";
  }
  doctorList(){
    for (let i=0; i< this.object.length; i++) {
      const doc = this.object[i];
      const title = doc.profile.title;
      if (title === "MD") {
        const firstName = doc.profile.first_name;
        const lastName = doc.profile.last_name;
        const specialty = doc.specialties[0].name;
        const address = doc.practices[0].visit_address;
        const addressString = address.street +"<br>"+ address.city+ ", " + address.state +" " + address.zip;
        const phoneString = doc.practices[0].phones[0].number.toString();
        const phone = phoneCleaner(phoneString);
        const website = doc.practices[0].website;
        const status = doc.practices[0].accepts_new_patients;

        const doctor = new Doctor(firstName,lastName,specialty,addressString,phone,website,status);
        this.doctors.push(doctor);
      }
    }
  }
}

export const responseArray = new ResponseArray();

export function getDoctors(doctorSearch,conditionTerm,location, apiKey) {
  let promise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    const url = `https:\//api.betterdoctor.com/2016-03-01/doctors?${doctorSearch}${conditionTerm}${location}&skip=0&limit=30&user_key=${apiKey}`;
    console.log(url)
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
    // console.log(responseArray)
  }, function(error) {
    $('.errors').text(`There was an error processing your request: ${error.message}`);
  });
}

export function ipLocation(ip){
  let promise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    const url = `http:\//ip-api.com/json/${ip}`;
    request.onload = function(){
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
    const lat = apiResponse.lat;
    const lon = apiResponse.lon;
    const radius = 40;
    let locationString = `&location=${lat}%2C${lon}%2C${radius}`;
    responseArray.location = locationString;
  }, function(error) {
    $('.errors').text(`There was an error processing your request: ${error.message}`);
  });
}

export function timeDelay(action, delay) {
  setTimeout(action, delay);
}

export function logDocs(){
  responseArray.doctorList();
}

export function inputCleaner (string){
  let input = string.split(" ");
  let output= input[0];
  if (input.length>1) {
    for (let i=1;i<input.length;i++){
      output = output + "%20" + input[i]
    }
  }
  return output;
}

function phoneCleaner(string){
  let part1 = string.slice(0, 3);
  let part2 = string.slice(3, 6);
  let part3 = string.slice(6);
  let phone = `(${part1}) ${part2}-${part3}`

  return phone;
}
