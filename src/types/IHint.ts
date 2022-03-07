export interface IHint {
  content: string;
  alarmType: string; //  "attempts" or "timestamp"
  alarm: number;
  // depends on alarmType
  // "attempts" -> number of attempts required for hint to appear
  // "timestamp" -> timestamp when hint will appear
}
