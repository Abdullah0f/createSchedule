import { checkPossibilties, getSchedules } from "./utils/makeSchdule.js";
const arab = "103 عرب";
const xx = "201 نما";
const y = "223 امب";
const z = "104 حسب";
const alreadyOcupied = [
  // { title: ai, classCode: "2370" },
  // { title: methods, classCode: "2363" },
  // { title: theory, classCode: "1952" },
  // { title: lab, classCode: "1956" },
  { title: arab, classCode: "569" },
];
const cc = [xx, y, z];
const coursesCount = 3; //this should be <= cc.length
const allowLocked = false; //allow locked classes
const wantedCourses = [xx, y, z];

// this checks all possible combinations -without conflicts- of courses in {cc} with {coursesCount} courses each time
// checkPossibilties(cc, coursesCount, allowLocked, alreadyOcupied);

// this create .csmo files contains all schedules for {wantedCourses} courses, these files can be added to https://gizmoa.com/college-schedule-maker/ to see how it looks
let x = getSchedules(wantedCourses, allowLocked, alreadyOcupied);

// x.forEach((x) => {
//   console.log(
//     x.selectedCourses
//       .filter((y) => y.courseCode === slm106)
//       .map((y) => y.classCode)
//   );

//   x.selectedCourses
//     .filter((y) => y.courseCode === slm106)
//     .map((y) => y.periods.forEach((l) => console.table(l)));
// });
