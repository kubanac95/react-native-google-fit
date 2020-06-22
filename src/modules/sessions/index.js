"use strict";
import { NativeModules } from "react-native";

import Session from "./Session";
import SessionInsertRequest from "./SessionInsertRequest";

const Module = NativeModules.RNGoogleFit;

export default class Sessions {
  constructor() {}

  startSession(session) {
    if (!session instanceof Session) {
      return Promise.reject(
        new Error(
          `Sessions:startSession expects a 'Session' but got type ${typeof session}`
        )
      );
    }

    try {
      return Module.startSession(session.build());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  stopSession(identifier = "") {
    if (typeof identifier !== "string") {
      return Promise.reject(
        new Error(
          `Sessions:stopSession expects a string but got type '${typeof identifier}'`
        )
      );
    }

    try {
      return Module.stopSession(identifier);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  insertSession(sessionInsertRequest) {
    if (!sessionInsertRequest instanceof SessionInsertRequest) {
      return Promise.reject(
        new Error(
          `Sessions:insertSession expects a 'SessionInsertRequest' but got type ${typeof sessionInsertRequest}`
        )
      );
    }

    try {
      return Module.insertSession(sessionInsertRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  requestPermission() {
    try {
      return Module.requestPermission();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
