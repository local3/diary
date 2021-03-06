import moment, { Moment } from "moment";

export const dateFormat = "YYYY-MM-DD";
export const today = moment().format(dateFormat)

export const isSameDay = (a: Moment, b: Moment) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return a.date() === b.date()
    && a.month() === b.month()
    && a.year() === b.year();
}
