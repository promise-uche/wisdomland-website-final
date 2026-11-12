// Central content file. Edit text here and it updates across the whole site.
export const SITE = {
  name: 'Wisdom Land Model Schools',
  shortName: 'Wisdom Land Model School',
  tagline: 'The Bells, Ota',
  motto: 'Wisdom is the principal thing.', // from the school anthem - replace if the school has an official motto
  founded: 2010,
  phones: [
    { display: '+234 806 364 3013', href: 'tel:+2348063643013' },
    { display: '+234 903 647 7475', href: 'tel:+2349036477475' },
  ],
  phone: '+234 806 364 3013',            // first number (used where only one can be shown)
  phoneHref: 'tel:+2348063643013',       // tap-to-call for the first number
  phoneText: '+234 806 364 3013 or +234 903 647 7475', // both, for sentences
  whatsapp: 'https://wa.me/2348063643013?text=Hello%20Wisdom%20Land%20Model%20School%2C%20I%20would%20like%20to%20make%20an%20enquiry.',
  email: 'wisdomlandschools@gmail.com',
  address: 'Lola Street, off Bells University Junction (Lola Engineering Bus Stop), Ota, Ogun State, Nigeria',
  hours: 'Monday – Friday, 8:00am – 5:00pm',
  // Replace with the real profile links
  social: {
    facebook: 'https://www.facebook.com/wisdomlandschools',
    instagram: 'https://www.instagram.com/wisdomlandschools',
    youtube: 'https://www.youtube.com/@wisdomlandschools', // placeholder
  },
  mapQuery: 'Lola Engineering Bus Stop, Bells University Junction, Ota, Ogun State, Nigeria',
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://www.wisdomlandschools.com.ng').replace(/\/+$/, ''),
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',
  appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL || '',
};

export const yearsOpen = () => new Date().getFullYear() - SITE.founded;

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Academics', to: '/academics',
    children: [
      { label: 'Academics Overview', to: '/academics' },
      { label: 'Nursery & Primary School', to: '/academics/nursery-primary' },
      { label: 'Junior Secondary School', to: '/academics/junior-secondary' },
      { label: 'Senior Secondary School', to: '/academics/senior-secondary' },
      { label: 'Pre-University Programme', to: '/academics/pre-university' },
    ],
  },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Student Life', to: '/student-life' },
  { label: 'Contact', to: '/contact' },
];

export const CORE_VALUES = ['Faith', 'Passion', 'Discipline', 'Diligence', 'Integrity', 'Dedication', 'Appreciation'];

export const MISSION = [
  'To provide academic excellence.',
  'To inculcate moral standards for a total child.',
  'To provide spiritual upbringing for higher education.',
  'To equip students for higher education.',
  'To raise students who are good and useful to themselves and society at large.',
];

export const FIRSTS = ['The first question.', 'The first friend.', 'The first book.', 'The first competition.', 'The first time they stand in front of a crowd.'];

// Day School / Boarding School options shown beside the photo on the homepage.
export const PATHS = [
  { key: 'day', icon: 'sun', title: 'Day School', line: 'Learn with us by day, home every evening.' },
  { key: 'boarding', icon: 'moon', title: 'Boarding School', line: 'A caring second home on campus.' },
];

export const JOURNEY = [
  { stage: 'Nursery', verb: 'Discover', text: 'Curiosity leads. Play, stories and songs build the first foundations.', to: '/academics/nursery-primary' },
  { stage: 'Primary', verb: 'Build', text: 'Reading, number sense and good habits grow into real confidence.', to: '/academics/nursery-primary' },
  { stage: 'Secondary', verb: 'Become', text: 'Deeper subjects, leadership and a clear path to university and beyond.', to: '/academics/senior-secondary' },
];

export const EXPERIENCES = [
  { word: 'Think', title: 'Academic excellence', text: 'Strong teaching, steady revision and examination readiness.', img: 'home/Think.webp' },
  { word: 'Create', title: 'Technology & creativity', text: 'ICT, coding, music, art and drama.', img: 'home/Create.webp' },
  { word: 'Lead', title: 'Character & responsibility', text: 'Prefects, clubs and duties that build integrity.', img: 'home/Lead.webp' },
  { word: 'Belong', title: 'Friendship & community', text: 'A caring family of pupils, parents and teachers.', img: 'home/belong.webp' },
];

export const WHY_CHOOSE = [
  { icon: 'teacher', title: 'Dedicated teachers', text: 'Disciplined, hardworking and qualified staff.' },
  { icon: 'shield', title: 'Safe environment', text: 'Security, CCTV and caring supervision.' },
  { icon: 'lab', title: 'Practical facilities', text: 'ICT, science laboratories and library.' },
  { icon: 'trophy', title: 'Proven results', text: 'Strong WAEC and NECO preparation.' },
  { icon: 'heart', title: 'Moral foundation', text: 'Faith, discipline and integrity at the core.' },
  { icon: 'pin', title: 'Easy to reach', text: 'At the Bells University Junction, Ota.' },
];

export const TESTIMONIALS = [ // Placeholder stories - replace with real parent quotes
  { name: 'Mrs. Adebayo', role: 'Parent of a Primary 4 pupil', text: 'My son used to be shy. A year in, he stood up and led the class prayer. The teachers noticed him and gave him a chance.' },
  { name: 'Mr. Okonkwo', role: 'Parent of a JSS 2 pupil', text: 'What I like is the discipline. My daughter does her homework without being reminded, and she now speaks with confidence.' },
  { name: 'Mrs. Balogun', role: 'Parent of an SS 1 pupil', text: 'Fees are fair and the care is real. When my child was struggling in Mathematics, her teacher stayed back to help.' },
];

export const FACILITIES = [
  { title: 'Classrooms', text: 'Bright, well-ventilated rooms with comfortable seating.', img: 'facilities/classrooms.jpg', icon: 'teacher' },
  { title: 'ICT / Computer Lab', text: 'Hands-on computer lessons from the early years.', img: 'facilities/ict-lab.jpg', icon: 'computer' },
  { title: 'Library', text: 'A quiet space to read, research and think.', img: 'facilities/library.jpg', icon: 'book' },
  { title: 'Science Laboratories', text: 'Practical experiments in Biology, Chemistry and Physics.', img: 'facilities/science-lab.jpg', icon: 'lab' },
  { title: 'Sports Field', text: 'Space for football, athletics and inter-house sports.', img: 'facilities/sports-field.jpg', icon: 'trophy' },
  { title: 'Assembly Hall', text: 'For worship, assemblies, concerts and events.', img: 'facilities/assembly-hall.jpg', icon: 'hall' },
];

export const STAFF = [
  { name: 'Dr. Akojede Abiodun', role: 'Proprietor & Director', note: 'Ph.D, M.Ed, B.Ed (Educational Management). WAEC and NECO examiner.', img: 'staff/proprietor.jpg', lead: true },
  { name: 'Mrs. Akojede', role: 'Principal', note: '[Qualification placeholder]', img: 'staff/principal.jpg', lead: true },
  { name: '[Name placeholder]', role: 'Vice Principal', note: '[Qualification placeholder]', img: 'staff/vice-principal.jpg', lead: true },
  { name: '[Name placeholder]', role: 'Head Mistress (Primary)', note: '[Qualification placeholder]', img: 'staff/head-primary.jpg', lead: true },
  { name: '[Teacher name]', role: 'Mathematics Teacher', note: '[Qualification placeholder]', img: 'staff/teacher-1.jpg' },
  { name: '[Teacher name]', role: 'English Language Teacher', note: '[Qualification placeholder]', img: 'staff/teacher-2.jpg' },
  { name: '[Teacher name]', role: 'Science Teacher', note: '[Qualification placeholder]', img: 'staff/teacher-3.jpg' },
  { name: '[Teacher name]', role: 'Nursery Teacher', note: '[Qualification placeholder]', img: 'staff/teacher-4.jpg' },
];

export const ACHIEVEMENTS = [
  { title: 'Victoria Ojo Memorial Schools\' Debate', org: 'NIFST Lagos Chapter', date: '10 June 2026', result: 'Second Prize', award: 'NIFST Award of Excellence', text: 'The school placed second on the topic "Industrialization and Commercialization of Food Research Innovation is the Key to Achieving Economic Independence."', img: 'achievements/nifst-second-prize-award.jpg' },
  { title: 'NIFST Day Victoria Ojo Memorial Debate', org: 'NIFST Lagos Chapter', date: '10 June 2026', result: 'Participant', award: 'Award of Participation', text: 'Wisdomland Model Schools took part in the 2026 debate on food research innovation and economic independence.', img: 'achievements/nifst-participation-award.jpg' },
  { title: 'YWF Football Competition', org: 'YWF', date: '9 September 2026', result: '1st Position (Champions)', award: 'Championship Trophy / Medal', text: 'Our football team won the competition through teamwork, discipline and sporting excellence.', img: 'achievements/ywf-football-championship.jpg' },
  { title: 'Ota Debate Competition', org: 'Ogun State', date: '2026', result: 'Participant', award: 'Debate Competition Recognition', text: 'Our debate team represented the school with strong public speaking, critical thinking and research.', img: 'achievements/ota-debate-competition.jpg' },
];

export const STUDENT_LIFE = [
  { key: 'PLAY', line: 'Find your team.', text: 'Football, athletics, basketball, table tennis and inter-house sports.', img: 'student-life/play.jpg' },
  { key: 'CREATE', line: 'Find your voice.', text: 'Drama, music, arts, press club and creative activities.', img: 'student-life/create.jpg' },
  { key: 'TECHNOLOGY', line: 'Change your world.', text: 'Coding, programming, design, AI and tech talks.', img: 'student-life/technology.jpg' },
  { key: 'DISCOVER', line: 'Follow your curiosity.', text: 'Science/JETS, literary activities, debate and academic clubs.', img: 'student-life/discover.jpg' },
  { key: 'LEAD', line: 'Step forward.', text: 'Competitions, leadership opportunities, school responsibilities and student initiatives.', img: 'student-life/lead.jpg' },
];

export const CLUBS = ['Debate Club', 'Coding Club', 'Drama Club', 'Science / JETS Club', 'Literary & Debating Society', 'Sports'];

export const ADMISSION_STEPS = [
  ['Enquiry', 'Call, WhatsApp or visit the school office.'],
  ['Application', 'Complete the online form or download the PDF.'],
  ['Assessment', 'Entrance assessment and short interview.'],
  ['Result & offer', 'We communicate the outcome and offer.'],
  ['Registration', 'Submit documents and complete payment.'],
  ['Resumption', 'Your child joins on resumption day.'],
];

export const REQUIREMENTS = [
  'Class last read, with result attached',
  'Photocopies of last term result',
  'Birth certificate',
  'Reference letter',
  'Two passport photographs',
  'National Identification Number (NIN)',
  'School Identification Number (SIN)',
];

export const INTAKES = [ // Placeholder dates - confirm with the school
  ['First Term', 'September (resumption date to be announced)'],
  ['Second Term', 'January'],
  ['Third Term', 'April'],
];

// Class structure. NOTE: source documents were inconsistent (Nursery 1-6 / Primary 1-5 vs Primary 1-6). Edit here if needed.
export const LEVELS = {
  'nursery-primary': {
    title: 'Nursery & Primary School',
    seoTitle: 'Nursery & Primary School in Ota',
    intro: 'Learning begins with curiosity and grows into confidence.',
    img: 'academics/nursery-primary.jpg',
    sections: [
      { heading: 'Nursery', verb: 'Discover', img: 'academics/nursery.jpg',
        text: 'Our early years programme gives children freedom to explore, ask questions, communicate and build the foundations they need for school and life.',
        facts: [['Classes', 'Nursery 1 – 3'], ['Approach', 'Child-centred, play-based and activity-based learning'], ['Key skills', 'Early literacy and numeracy, communication, creativity, critical thinking, collaboration, motor skills and personal development'], ['Activities', 'Storytelling, phonics, educational games, art and craft, music, role-play, experiments and outdoor activities']],
        subjects: ['English Studies', 'Mathematics', 'Basic Science', 'Nigerian Language', 'Physical & Health Education', 'Religion & National Values', 'Nigerian History', 'Social & Citizenship Studies', 'Cultural & Creative Arts'] },
      { heading: 'Primary School', verb: 'Build', img: 'academics/primary.jpg',
        text: 'Children build strong foundations in literacy, numeracy, science and technology, with learner-centred teaching, projects, collaboration and continuous assessment.',
        facts: [['Classes', 'Primary 1 – 6'], ['Approach', 'Learner-centred, activity-based teaching with technology and continuous assessment']],
        subjects: ['English Studies', 'Mathematics', 'Nigerian Language', 'Basic Science and Technology', 'Physical & Health Education', 'Basic Digital Literacy', 'Religion & National Values', 'Nigerian History', 'Social & Citizenship Studies', 'Cultural & Creative Arts', 'Pre-Vocational Studies'] },
    ],
  },
  'junior-secondary': {
    title: 'Junior Secondary School',
    seoTitle: 'Junior Secondary School (JSS 1–3) in Ota',
    intro: 'Students move from foundations to deeper exploration, and begin to find their strengths.',
    img: 'academics/junior-secondary.jpg',
    sections: [
      { heading: 'JSS 1 – 3', verb: 'Develop', img: 'academics/jss.jpg',
        text: 'Through practical learning, technology, creativity and teamwork, students become more independent learners and more responsible young people.',
        facts: [['Classes', 'JSS 1 – 3'], ['Approach', 'Balanced, learner-centred: instruction, practical work, technology, laboratory work, projects and continuous assessment'], ['Focus', 'Academic development, critical thinking, practical learning, technology, creativity and character'], ['Preparation', 'A strong foundation for senior secondary and future pathways']],
        subjects: ['English Language', 'General Mathematics', 'Citizenship and Heritage Studies', 'Digital Technologies', 'One approved Trade subject', 'Basic Science', 'Nigerian Language', 'Religion Studies', 'Cultural & Creative Arts', 'Physical & Health Education'] },
    ],
  },
  'senior-secondary': {
    title: 'Senior Secondary School',
    seoTitle: 'Senior Secondary School (SS 1–3), WAEC & NECO Preparation in Ota',
    intro: 'Developing potential and preparing for the future, with focused examination preparation.',
    img: 'academics/senior-secondary.jpg',
    sections: [
      { heading: 'SS 1 – 3', verb: 'Become', img: 'academics/sss.jpg',
        text: 'Students take more advanced subjects, develop independence and receive focused preparation for national examinations and further education, with leadership and career awareness.',
        facts: [['Classes', 'SS 1 – 3'], ['Examinations', 'WAEC, NECO, JAMB/UTME and Post-UTME preparation'], ['Pathways', 'University, polytechnic, college of education, vocational training and other opportunities'], ['Revision', 'Continuous revision and mock examinations']],
        tracks: [
          { name: 'Core subjects', list: ['English Language', 'General Mathematics', 'Citizenship and Heritage Studies', 'Digital Technologies', 'One approved Trade subject'] },
          { name: 'Science track', list: ['Biology', 'Chemistry', 'Physics', 'Further Mathematics', 'Agricultural Science', 'Geography', 'Technical Drawing', 'Foods & Nutrition', 'Health / Physical Education'] },
          { name: 'Arts & Humanities track', list: ['Literature-in-English', 'Government', 'History', 'Christian Religious Studies', 'Islamic Religious Studies', 'Nigerian Language', 'Visual Arts', 'Music'] },
          { name: 'Commercial / Business track', list: ['Accounting', 'Economics', 'Commerce / Business Studies', 'Marketing'] },
        ] },
    ],
  },
  'pre-university': {
    title: 'Pre-University Programme',
    seoTitle: 'JUPEB & IJMB Pre-University Programme in Ota',
    intro: 'An advanced-level route to Direct Entry admission into university.',
    img: 'academics/pre-university.jpg',
    sections: [
      { heading: 'Foundation & Advanced-Level Programmes', verb: 'Advance', img: 'academics/pre-university-1.jpg',
        text: 'For candidates who want Direct Entry admission, we offer advanced-level programmes with focused teaching and guidance.',
        programmes: [
          { name: 'JUPEB', full: 'Joint Universities Preliminary Examinations Board', text: 'A one-academic-session advanced-level programme for candidates seeking Direct Entry. Successful candidates can use JUPEB results to pursue 200-level admission, subject to university requirements and JAMB Direct Entry procedures.' },
          { name: 'IJMB', full: 'Interim Joint Matriculation Board Examination', text: 'An advanced-level programme that provides an alternative pathway to university admission through Direct Entry. IJMB is recognised among the A-Level qualifications used for Direct Entry admission.' },
        ] },
    ],
  },
};

export const LEARNING = [
  { icon: '🔬', word: 'Discover', text: 'Science experiments and investigation' },
  { icon: '💻', word: 'Create', text: 'ICT, coding and digital projects' },
  { icon: '🧠', word: 'Think', text: 'Mathematics, reasoning and problem-solving' },
  { icon: '🎨', word: 'Express', text: 'Arts, music and creative work' },
  { icon: '🌍', word: 'Understand', text: 'Social sciences, culture and society' },
  { icon: '📖', word: 'Communicate', text: 'Reading, writing, speaking and debate' },
];

// Examinations shown on the Academics page. `slug` = logo file name in public/images/exams/<slug>.png
// (until a file is added, a coloured placeholder badge with `short` is shown).
export const EXAMS = [
  { slug: 'jamb', name: 'JAMB', sub: 'University Entry', short: 'JAMB', color: '#1B7F4B' },
  { slug: 'waec', name: 'WAEC', sub: 'West African Exams', short: 'WAEC', color: '#1F4E9C' },
  { slug: 'neco', name: 'NECO', sub: 'National Exams', short: 'NECO', color: '#0F7C7A' },
  { slug: 'ogun-bece', name: 'OGUN STATE BECE', sub: 'Basic Education', short: 'BECE', color: '#D9731A' },
  { slug: 'ielts', name: 'IELTS', sub: 'English Proficiency', short: 'IELTS', color: '#C8102E' },
  { slug: 'toefl', name: 'TOEFL', sub: 'English Language Test', short: 'TOEFL', color: '#5B3A9B' },
  { slug: 'gmat', name: 'GMAT', sub: 'Graduate Management', short: 'GMAT', color: '#2F3A4A' },
  { slug: 'cambridge', name: 'CAMBRIDGE', sub: 'International Exams', short: 'CIE', color: '#7A1F3D' },
];

export const FIND_PLACE = ['Sports', 'Science', 'Arts', 'Leadership', 'Technology', 'Debate'];

export const STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','Other / Non-Nigerian'];

export const CLASSES = ['Nursery 1','Nursery 2','Nursery 3','Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6','JSS 1','JSS 2','JSS 3','SS 1','SS 2','SS 3','JUPEB / IJMB'];


// Videos shown on the site. To change a video, replace the `id` with the part of the
// YouTube link after "watch?v=" (e.g. https://www.youtube.com/watch?v=ABC123 -> 'ABC123').
export const VIDEOS = {
  studentLife: {
    id: 'M7lc1UVf-VE', // PLACEHOLDER video. Replace with the school's own YouTube video ID.
    title: 'Life at Wisdom Land Model Schools',
  },
};
