// https://developers.google.com/android/reference/com/google/android/gms/fitness/data/DataPoint

import { DataType } from "./types";

export default class DataPoint {
  constructor(props) {
    this.packageName = props.packageName;
    this.dataType = props.dataType;
    this.name = props.name;
    this.streamName = props.streamName;
    this.device = props.device;
    this.type = props.type;
  }

  setAppPackageName(packageName) {
    if (typeof packageName !== "string") {
      throw new Error(
        `DataPoint:setAppPackageName expects a string but got type '${typeof packageName}'`
      );
    }

    this.packageName = packageName;

    return this;
  }

  setDataType(dataType) {
    if (!DataType[dataType]) {
      throw new Error("Session:setDataType expects invalid type");
    }

    this.dataType = dataType;

    return this;
  }

  setName(name) {
    if (typeof name !== "string") {
      throw new Error(
        `DataPoint:setName expects a string but got type '${typeof name}'`
      );
    }

    this.name = name;

    return this;
  }

  setStreamName(streamName) {
    if (typeof streamName !== "string") {
      throw new Error(
        `DataPoint:setStreamName expects a string but got type '${typeof streamName}'`
      );
    }

    this.streamName = streamName;

    return this;
  }

  build() {}
}
