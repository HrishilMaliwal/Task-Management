const initialState = JSON.parse(localStorage.getItem("myState")) || {
  
    flag: "",
    assignment_array: [],
    student_database: [],
    teacher_database: [],
};

export default initialState;
