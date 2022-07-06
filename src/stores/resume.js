import { defineStore } from 'pinia';

export const useResumeStore = defineStore('resume', {
  state: () => ({
    adding: {
      newExp: false,
      newEdu: false,
      newSkill: false,
      newLang: false,
    },
    intro: {
      editing: false,
      fullName: 'Mohammad Ali',
      headline: 'Math Teacher',
      phoneNumber: '(123) 456 78 99',
      emailAddress: 'info@qwikresume.com',
      address: 'Islamabad 44100',
      brief:
        '5 years of experience as a Secondary English Teacher. Dedicated professional experienced in diverse and fast-paced environments seeks a position in an organization where strengths in strategy and leadership will be applied to further the goals of the team. ',
    },
    experiences: [
      {
        editing: false,
        title: 'Secondry School Math Teacher',
        company: 'Heartland Christian School',
        startDateMonth: 'July',
        startDateYear: '2016',
        endDateMonth: 'May',
        endDataYear: '2017',
        description:
          '<ul class="q-pr-sm">\n' +
          '            <li>\n' +
          '              Complete all grading, create progress reports and conduct parent conferences in a\n' +
          '              timely manner.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Review curriculum and devise alternate approaches to presenting lessons to increase\n' +
          '              student understanding (working directly with students and parents).\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Communicate with parents, students, and other teachers on a regular basis to develop\n' +
          '              and update personal learning plans and schedules, score assessments, provide feedback\n' +
          '              on student work, suggest instructional approaches and strategies, monitor completion\n' +
          '              of assignments and coach special projects.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Work collaboratively with other teachers to ensure that all students are successfully\n' +
          '              progressing through the program, that parents have a central point of contact, and\n' +
          '              that tasks are distributed among the teachers.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Develop a general knowledge of the entire program&rsquo;s k-12 curriculum and a very\n' +
          '              detailed knowledge of the courses for which responsible.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Support students and parents with alternate strategies and provide additional\n' +
          '              assistance with daily assignments and projects.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Communicate regularly with parents, students, and curriculum specialists through the\n' +
          '              use of a computer and telephone.\n' +
          '            </li>\n' +
          '          </ul>',
      },
      {
        editing: false,
        title: 'Secondry School Math Teacher',
        company: 'Heartland Christian School',
        startDateMonth: 'July',
        startDateYear: '2016',
        endDateMonth: 'May',
        endDataYear: '2017',
        description:
          '<ul class="q-pr-sm">\n' +
          '            <li>\n' +
          '              Complete all grading, create progress reports and conduct parent conferences in a\n' +
          '              timely manner.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Review curriculum and devise alternate approaches to presenting lessons to increase\n' +
          '              student understanding (working directly with students and parents).\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Communicate with parents, students, and other teachers on a regular basis to develop\n' +
          '              and update personal learning plans and schedules, score assessments, provide feedback\n' +
          '              on student work, suggest instructional approaches and strategies, monitor completion\n' +
          '              of assignments and coach special projects.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Work collaboratively with other teachers to ensure that all students are successfully\n' +
          '              progressing through the program, that parents have a central point of contact, and\n' +
          '              that tasks are distributed among the teachers.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Develop a general knowledge of the entire program&rsquo;s k-12 curriculum and a very\n' +
          '              detailed knowledge of the courses for which responsible.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Support students and parents with alternate strategies and provide additional\n' +
          '              assistance with daily assignments and projects.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Communicate regularly with parents, students, and curriculum specialists through the\n' +
          '              use of a computer and telephone.\n' +
          '            </li>\n' +
          '          </ul>',
      },
      {
        editing: false,
        title: 'Substitute Teacher',
        company: 'School Board Of Highlands County',
        startDateMonth: 'September',
        startDateYear: '2012',
        endDateMonth: 'June',
        endDataYear: '2016',
        description:
          '<ul class="q-pr-sm">\n' +
          '            <li>\n' +
          '              Apply organization and planning skills to adapt to changing expectations within the\n' +
          '              classroom environment.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Determine teachers daily lesson plans and expedited instructions and assistance to\n' +
          '              students. Adapt to differing personalities, age groups, grade levels, and subject\n' +
          '              topics necessary for assignments.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Monitor and moderate behavior of children, rewards and disciplinary procedures when\n' +
          '              applicable.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Carry-out county school board policies and procedures as well as state and federal\n' +
          '              education regulations.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Manage regional field trips and make efforts to integrate trips into the curriculum.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Devise and implement virtual methods of creating and maintaining a &ldquo;school\n' +
          '              community&rdquo; using plan book and renewed online systems.\n' +
          '            </li>\n' +
          '          </ul>',
      },
      {
        editing: false,
        title: 'Substitute Teacher',
        company: 'School Board Of Highlands County',
        startDateMonth: 'September',
        startDateYear: '2012',
        endDateMonth: 'June',
        endDataYear: '2016',
        description:
          '<ul class="q-pr-sm">\n' +
          '            <li>\n' +
          '              Apply organization and planning skills to adapt to changing expectations within the\n' +
          '              classroom environment.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Determine teachers daily lesson plans and expedited instructions and assistance to\n' +
          '              students. Adapt to differing personalities, age groups, grade levels, and subject\n' +
          '              topics necessary for assignments.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Monitor and moderate behavior of children, rewards and disciplinary procedures when\n' +
          '              applicable.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Carry-out county school board policies and procedures as well as state and federal\n' +
          '              education regulations.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Manage regional field trips and make efforts to integrate trips into the curriculum.\n' +
          '            </li>\n' +
          '            <li>\n' +
          '              Devise and implement virtual methods of creating and maintaining a &ldquo;school\n' +
          '              community&rdquo; using plan book and renewed online systems.\n' +
          '            </li>\n' +
          '          </ul>',
      },
    ],
    educations: [
      {
        editing: false,
        levelOfEducation: "Bachelor's",
        fieldOfStudy: 'Mathematics and Basic Science',
        school: 'International Islamic University',
        schoolLocation: 'Islamabad',
        startDateMonth: 'September',
        startDateYear: '2004',
        endDateMonth: 'June',
        endDataYear: '2011',
      },
      {
        editing: false,
        levelOfEducation: "Bachelor's",
        fieldOfStudy: 'Mathematics and Basic Science',
        school: 'International Islamic University',
        schoolLocation: 'Islamabad',
        startDateMonth: 'September',
        startDateYear: '2004',
        endDateMonth: 'June',
        endDataYear: '2011',
      },
    ],
    skills: ['Creative lesson planning', 'SMART board interactive displays', 'Time management'],
    languages: [
      {
        editing: false,
        name: 'English',
        fluencyLevel: 'Fluent',
      },
      {
        editing: false,
        name: 'English',
        fluencyLevel: 'Fluent',
      },
      {
        editing: false,
        name: 'Urdu',
        fluencyLevel: 'Fluent',
      },
      {
        editing: false,
        name: 'Urdu',
        fluencyLevel: 'Fluent',
      },
      {
        editing: false,
        name: 'Pashto',
        fluencyLevel: 'Native',
      },
      {
        editing: false,
        name: 'Pashto',
        fluencyLevel: 'Native',
      },
    ],
  }),
});
