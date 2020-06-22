// https://developers.google.com/android/reference/com/google/android/gms/fitness/request/SessionInsertRequest

import Session from "./session";

export default class SessionInsertRequest {
  constructor(nativeSession) {
    this.session = nativeSession.session;
    this.dataPoint;
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

  addDataSet() {
    return this;
  }

  addAggregatedDataPoint() {
    return this;
  }

  build() {
    return this;
  }
}
