import { JSDOM } from "jsdom";
import fs from "fs";

export function getCourses(wantedCourses = null) {
  const html = fs.readFileSync("database.html", "utf8");

  const dom = new JSDOM(html);

  let x = dom.window.document.querySelectorAll(".ROW1,.ROW2");
  const i = dom.window.document.querySelectorAll("#toggle").length ? 1 : 0;
  x = Array.prototype.slice.call(x);
  x = x.filter((x) => x.querySelectorAll("td").length > 4);
  // if (x[0].querySelectorAll("td").length < 4) x.shift();
  const courses = {};

  x.forEach((x) => {
    const courseCode = x.querySelector("td").textContent;
    const courseHours = x.querySelector("td:nth-child(5)").textContent;
    let isFollower = false;

    if (wantedCourses) if (!wantedCourses.includes(courseCode)) return;

    if (!courses[courseCode]) courses[courseCode] = [];

    if (courseHours === "") isFollower = true;

    const course = {};

    let daytimes = x.querySelector(
      "td:nth-child(" + (7 + i) + ")>a>input:nth-child(2)"
    ).value;
    let numDaytimes = [...daytimes.matchAll(/@t/g)].length;

    course.courseCode = courseCode;
    course.courseTitle = x.querySelector("td:nth-child(2)").textContent;
    course.courseTitle = x.querySelector("td:nth-child(2)").textContent;
    course.classCode = x.querySelector("td:nth-child(3)").textContent;
    course.courseHours = courseHours;
    course.open =
      x.querySelector("td:nth-child(" + (6 + i) + ")>span").textContent ===
      "مغلقة"
        ? false
        : true;
    course.instructor = x.querySelector(
      "td:nth-child(" + (7 + i) + ")>a>input:nth-child(1)"
    ).value;
    course.exam = x.querySelector(
      "td:nth-child(" + (7 + i) + ")>a>input:nth-child(3)"
    )?.value;

    course.periods = [];
    for (let i = 0; i < numDaytimes; i++) {
      const obj = {};
      obj.day = [...("@n" + daytimes).matchAll(/@n(.*?)@t/g)][i][1]
        .replaceAll(" ", "")
        .split("");
      obj.time = [...daytimes.matchAll(/@t(.*?)@r/g)][i][1];

      obj.timee = extractTime(obj.time);
      obj.class = [...(daytimes + "@n").matchAll(/@r(.*?)@n/g)][i][1];

      obj.classType = x.querySelector("td:nth-child(4)").textContent;

      if (isFollower)
        courses[courseCode][courses[courseCode].length - 1].periods.push(obj);
      else course.periods.push(obj);
    }
    if (!isFollower) courses[courseCode].push(course);
  });
  return courses;
}

function extractTime(time) {
  const nums = time.match(/\d/g).join("");
  let startHour = nums.substring(0, 2);
  if (Number(startHour) < 8) startHour = (Number(startHour) + 12).toString();
  const startMin = nums.substring(2, 4);
  let endHour = nums.substring(4, 6);
  if (Number(endHour) < 8) endHour = (Number(endHour) + 12).toString();
  const endMin = nums.substring(6, 8);
  return {
    startHour,
    startMin,
    endHour,
    endMin,
  };
}
