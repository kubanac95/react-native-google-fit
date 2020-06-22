// https://developers.google.com/android/reference/com/google/android/gms/fitness/data/Session

import { FitnessType } from "./types";

export default class Session {
  constructor(nativeSession) {
    this.startTime = nativeSession.startTime;
    this.endTimeMillis = nativeSession.endTimeMillis;
    this.name = nativeSession.name;
    this.identifier = nativeSession.identifier;
    this.description = nativeSession.description;
    this.activity = nativeSession.activity;
    this.packageName = nativeSession.packageName;
  }

  setStartTime(startTime = null) {
    if (typeof startTime !== "number") {
      throw new Error(
        `Session:setStartTime expects a string but got type '${typeof startTime}'`
      );
    }

    this.startTime = startTime;

    return this;
  }

  setEndTime(endTimeMillis = null) {
    if (typeof endTimeMillis !== "number") {
      throw new Error(
        `Session:setEndTime expects a string but got type '${typeof endTimeMillis}'`
      );
    }

    this.endTimeMillis = endTimeMillis;

    return this;
  }

  setName(name = "") {
    if (typeof name !== "string") {
      throw new Error(
        `Session:setName expects a string but got type '${typeof name}'`
      );
    }

    this.name = name;

    return this;
  }

  setIdentifier(identifier = "") {
    if (typeof identifier !== "string") {
      throw new Error(
        `Session:setIdentifier expects a string but got type '${typeof identifier}'`
      );
    }

    this.identifier = identifier;

    return this;
  }

  setDescription(description = "") {
    if (typeof description !== "string") {
      throw new Error(
        `Session:setDescription expects a string but got type '${typeof description}'`
      );
    }

    this.description = description;

    return this;
  }

  setActivity(activity = null) {
    if (!FitnessType[activity]) {
      throw new Error("Session:setActivity expects invalid type");
    }

    this.activity = activity;

    return this;
  }

  build() {
    if (typeof this.identifier !== "string") {
      throw new Error("Session: Missing required `identifier` property");
    }

    if (this.startTime !== "number") {
      throw new Error("Session: Missing required `startTime` property");
    }

    if (!FitnessType[this.activity]) {
      throw new Error("Session: Missing or unsupported `activity`");
    }
  }
}
