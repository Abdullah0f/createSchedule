import { checkPossibilties, getSchedules } from "./utils/makeSchdule.js";
const slm104 = "104 سلم";
const slm106 = "106 سلم";
const methods = "2540 ريض";
const ai = "3501 عال";
const job = "3001 عال";
const se = "2111 هاب";
const web = "3821 عال";
const lab = "3791 هال";
const cyber = "3801 عال";
const theory = "2401 عال";
const machine = "4552 عال";
const advanced = "4311 عال";
const compilers = "4321 عال";
const pic = "4654 عال";
const research = "3101 عال";
const database = "4961 عال";
const chosenTopics = "4931 عال";
const simulation = "4211 عال";
const cloud = "4740 هال";
const alreadyOcupied = [
  // { title: ai, classCode: "2370" },
  // { title: methods, classCode: "2363" },
  { title: theory, classCode: "1952" },
  // { title: lab, classCode: "1956" },
  // { title: cyber, classCode: "1954" },
];
const cc = [se, cyber, lab, job];
const coursesCount = 4; //this should be <= cc.length
const allowLocked = true; //allow locked classes
const wantedCourses = [se, machine, web, job];

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
