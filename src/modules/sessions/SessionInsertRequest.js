// https://developers.google.com/android/reference/com/google/android/gms/fitness/request/SessionInsertRequest

import Session from "./Session";
import DataSet from "./DataSet";

export default class SessionInsertRequest {
  constructor(request) {
    this.session = request.session;
    this.dataSets = request.dataSets;
  }

  setSession(session) {
    if (!session instanceof Session) {
      return Promise.reject(
        new Error(
          `SessionInsertRequest:setSession expects a 'Session' but got type ${typeof session}`
        )
      );
    }

    this.session = session;

    return this;
  }

  addDataSet(dataSet) {
    if (!dataSet instanceof DataSet) {
      return Promise.reject(
        new Error(
          `SessionInsertRequest:addDataSet expects a 'DataSet' but got type ${typeof dataSet}`
        )
      );
    }

    this.dataSets.push(dataSet);

    return this;
  }

  getDataSets() {
    return this.dataSets;
  }

  build() {
    return this;
  }
}
