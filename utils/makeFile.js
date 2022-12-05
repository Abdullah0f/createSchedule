import fs from "fs";

const uids = [
  "eb52a9b4-f45c-4572-a351-6d5c121448fe",
  "eb52a9b4-f45c-4572-a351-6d5c121448fe",
  "bc52a1cc-7665-4ede-89c4-80aed58404aa",
  "027f816b-43ea-4aa8-8c65-8bf2e43b487f",
  "18c79a9e-f56a-4b19-b92f-ce95d6346ca7",
  "fdbf3a22-35f3-4673-b4df-61c116b2be2c",
  "08bae7a0-ccfb-414b-a7da-d438a8e646f6",
  "027f816b-43ea-4aa8-8c65-8bf2e43b487f",
  "cbd0f87c-6fca-4fb4-ad23-76bd4d5eaf61",
  "1d06fcdc-b99e-499a-a674-e3f60d36d8d8",
  "027f816b-43ea-4aa8-8c65-8bf2e43b487f",
  "bf9281ea-7da5-4f64-97ab-306709e8cfa7",
  "027f816b-43ea-4aa8-8c65-8bf2e43b487f",
  "d36bd9b4-a631-4e6e-a883-f0f50c4f2c18",
  "027f816b-43ea-4aa8-8c65-8bf2e43b487f",
  "2f7cdbd1-6409-49f2-b8f6-684978d3e16c",
];
const colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export function makeFile(courses, path) {
  const s = {
    // obligatory information for the schedule maker
    dataCheck: "69761aa6-de4c-4013-b455-eb2a91fb2b76",
    saveVersion: 4,
    schedules: [
      {
        title: "",
        items: createItems(courses),
      },
    ],
    currentSchedule: 0,
  };

  fs.appendFile(
    `${path}/${Date.now().toString() + Math.floor(Math.random() * 1000)}.csmo`,
    JSON.stringify(s),
    (err) => {
      if (err) console.log(err);
      else console.log("Saved");
    }
  );
  return JSON.stringify(s);
}

function createItems(courses) {
  const items = [];
  courses.forEach((x) => {
    const item = {
      uid: getUid(),
      type: "Course",
      title: x.courseTitle,
      meetingTimes: createMeetingTimes(x),
      backgroundColor: getColor(),
    };
    items.push(item);
  });
  return items;
}

function createMeetingTimes(course) {
  let meetingTimes = [];
  course.periods.forEach((x) => {
    const period = {
      uid: getUid(),
      courseType: x.classType,
      instructor:
        course.instructor === "لم يحدد من الكلية" ? "" : course.instructor,
      location: course.classCode,
      startHour: Number(x.timee.startHour),
      endHour: Number(x.timee.endHour),
      startMinute: Number(x.timee.startMin),
      endMinute: Number(x.timee.endMin),
      days: createDays(x),
    };
    meetingTimes.push(period);
  });
  return meetingTimes;
}
function createDays(d) {
  let o = {};
  const days = d.day;
  o.monday = days.includes("2");
  o.tuesday = days.includes("3");
  o.wednesday = days.includes("4");
  o.thursday = days.includes("5");
  o.friday = false;
  o.saturday = false;
  o.sunday = days.includes("1");
  return o;
}
function getUid() {
  return uids[Math.floor(Math.random() * uids.length)];
}

function getColor() {
  let r = colorArray[Math.floor(Math.random() * colorArray.length)];
  colorArray.splice(colorArray.indexOf(r), 1);
  return r;
}
