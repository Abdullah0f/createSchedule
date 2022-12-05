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

const cc = [ai, methods, se, lab, cyber, web, theory, job];
const coursesCount = 4;
const wantedCourses = [ai, methods, cyber, theory];

// this checks all possible combinations -without conflicts- of courses in {cc} with {coursesCount} courses each time
checkPossibilties(cc, coursesCount);

// this create .csmo files contains all schedules for {wantedCourses} courses, these files can be added to https://gizmoa.com/college-schedule-maker/ to see how it looks
// getSchedules(wantedCourses);
