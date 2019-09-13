export class SearchRequest {
  constructor (conditionTerm, location) {
    this.condition = conditionTerm;
    this.location = location;
  }
}

export class ResponseArray {
  constructor (){
    this.object;
  }
}
