const courses = [
  { subject: 'WDD', number: 130, credits: 3, completed: true },
  { subject: 'WDD', number: 131, credits: 3, completed: false },
  { subject: 'WDD', number: 231, credits: 3, completed: false },
];

const courseContainer = document.querySelector('#courseContainer');
const totalCredits = document.querySelector('#totalCredits');

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = '';
  let total = 0;

  filteredCourses.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    div.textContent = `${course.subject} ${course.number}`;

    total += course.credits;
    courseContainer.appendChild(div);
  });

  totalCredits.textContent = total;
}

displayCourses(courses);

document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () =>
  displayCourses(courses.filter(c => c.subject === 'CSE'))
);
document.querySelector('#wdd').addEventListener('click', () =>
  displayCourses(courses.filter(c => c.subject === 'WDD'))
);
