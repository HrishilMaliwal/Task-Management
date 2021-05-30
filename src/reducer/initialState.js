const initialState = JSON.parse(localStorage.getItem("myState")) || {
  flag: "",
  assignment_array: [],
  student_database: [],
  student_index: [],
  teacher_database: [
    {
      id: 6001,
      first: "Teacher1",
      last: "teacher2",
      email: "teaxheremail",
      password: "1234",
      first_login: false,
      is_student: false,
    },
  ],
  current_user: {
    id: "",
    first: "",
    last: "",
    email: "",
  },
};

export default initialState;
