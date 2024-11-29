import { MomentInput } from "moment";
import moment, { Moment } from "moment-timezone";

type TimeDateProps = {
  add?: number;
  subtract?: number;
  unit?: moment.unitOfTime.DurationConstructor;
  format?: string;
};

type GetMomentProp = {
  date?: MomentInput;
  format?: string;
};

export const zone = moment.tz.guess();
export const momentInstance = moment;

export const getMoment = (data?: GetMomentProp): Moment => {
  var zone = moment.tz.guess();

  return moment(data?.date, data?.format ?? "DD MMM YYYY HH:mm").tz(zone);
};
