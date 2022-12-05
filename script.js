let x = document.querySelectorAll("tr.ROW1,tr.ROW2");
x = Array.prototype.slice.call(x);

// delete anounsment message wich has the class ROW1
if (x[0].querySelectorAll("td").length < 4) x.shift();

const courses = {};
const wantedCourses = null;
let daytimes = x[0].querySelector("td:nth-child(7)>a>input:nth-child(2)").value;
let numDaytimes = [...daytimes.matchAll(/@t/g)].length;

x.forEach((x) => {
  const courseCode = x.querySelector("td").textContent;
  const courseHours = x.querySelector("td:nth-child(5)").textContent;
  let isFollower = false;

  if (wantedCourses) if (!wantedCourses.includes(courseCode)) return;

  if (!courses[courseCode]) courses[courseCode] = [];

  if (x.querySelector("td:nth-child(5)").textContent === "") isFollower = true;

  const course = {};

  let daytimes = x.querySelector("td:nth-child(7)>a>input:nth-child(2)").value;
  let numDaytimes = [...daytimes.matchAll(/@t/g)].length;

  course.courseCode = courseCode;
  course.courseTitle = x.querySelector("td:nth-child(2)").textContent;
  course.courseTitle = x.querySelector("td:nth-child(2)").textContent;
  course.classCode = x.querySelector("td:nth-child(3)").textContent;
  course.courseHours = courseHours;
  course.open =
    x.querySelector("td:nth-child(6)>span").textContent === "مغلقة"
      ? false
      : true;
  course.instructor = x.querySelector(
    "td:nth-child(7)>a>input:nth-child(1)"
  ).value;
  course.exam = x.querySelector("td:nth-child(7)>a>input:nth-child(3)").value;

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
      courses[courseCode][courses[courseCode].length - 1].days.push(obj);
    else course.periods.push(obj);
  }
  if (!isFollower) courses[courseCode].push(course);
});

const schedule = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

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
