import { getCourses } from "./courses.js";
import { generateGrayarr } from "./combinations.js";
import { makeFile } from "./makeFile.js";
const courses = getCourses();

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
// just set the array wanted courses and hit run() other things are unenecssary

// checkPossibilties(csc, 5);

export function checkPossibilties(coursesList, coursesCount) {
  let wantedCourses;
  const filt = generateGrayarr(coursesList.length).filter(
    (x) => x.split("1").length - 1 === coursesCount
  );
  filt.forEach((x) => x.replace("'", ""));
  for (let i in filt) {
    const arr = [];
    for (let j in filt[i]) {
      if (filt[i][j] === "1") arr.push(coursesList[j]);
    }
    wantedCourses = arr;
    const schedules = run(wantedCourses);
    if (schedules.length > 0) {
      console.log(schedules[0].coursesTitles);
      console.log("عدد الساعات:" + schedules[0].coursesHours);
      console.log("عدد الجداول المتاحة:" + schedules.length);
      console.log("------------------------------------------");
    }
  }
}

// space

// space

export function getSchedules(wantedCourses) {
  const schedules = run(wantedCourses);

  schedules.forEach((x) => makeFile(x.selectedCourses, "results"));
}

function run(wantedCourses) {
  const allowLocked = true;
  const all = getCartesian(wantedCourses);
  const schedules = [];
  //for loop for all arrays of all posiblities [[0,0],[0,1]]
  loop1: for (let i in all) {
    let selectedCourses = [];
    const schedule = {
      coursesTitles: [],
      coursesHours: 0,
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };
    //for loop for the possibilty number i [0,0]
    for (let j in all[i]) {
      // this is courseObject of wantedCourse[j] course, and the number all[i][j] course
      let courseObject = courses[wantedCourses[j]][all[i][j]];
      //   add it to selectedCourses (wii be used to make file later)
      selectedCourses.push(courseObject);
      schedule["coursesTitles"].push(courseObject.courseTitle);
      schedule["coursesHours"] += Number(courseObject.courseHours);
      if (!allowLocked) if (!courseObject.open) continue loop1;
      // console.log(courseObject.courseTitle);
      for (let k in courseObject.periods) {
        for (let z of courseObject.periods[k].day) {
          if (isConflict(schedule, courseObject.periods[k], z)) continue loop1;

          schedule[z].push(courseObject);
        }
      }
    }
    // console.log(JSON.stringify(schedule, undefined, 2));
    schedule["selectedCourses"] = selectedCourses;
    schedules.push(schedule);
  }
  return schedules;
}

function isConflict(schedule, period, day) {
  const schedulee = { ...schedule };
  const periodd = { ...period };
  let result = false;
  const firstDate = new Date();
  const secDate = new Date();

  firstDate.setHours(periodd.timee.startHour);
  firstDate.setMinutes(periodd.timee.startMin);

  secDate.setHours(periodd.timee.endHour);
  secDate.setMinutes(periodd.timee.endMin);

  schedulee[day].forEach((x) => {
    // only periods with wanted day
    const filtred = x.periods.filter((y) => y.day.includes(day));
    filtred.forEach((y) => {
      const startDate = new Date();
      const endDate = new Date();

      startDate.setHours(y.timee.startHour);
      startDate.setMinutes(y.timee.startMin);

      endDate.setHours(y.timee.endHour);
      endDate.setMinutes(y.timee.endMin);

      if (firstDate >= startDate && firstDate <= endDate) result = true;

      if (secDate >= startDate && secDate <= endDate) result = true;
    });
  });
  return result;
}

function getCartesian(wcourses) {
  let result = [...Array(courses[wcourses[0]].length).keys()];
  for (let i = 1; i < wcourses.length; i++)
    result = cartesian(result, [...Array(courses[wcourses[i]].length).keys()]);
  return result;
}
