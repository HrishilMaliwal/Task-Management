const initialState = JSON.parse(localStorage.getItem("myState")) || {
  
    flag: "",
    assignment_array: [],
    student_database: [],
    student_index: [],
    teacher_database: [],
    current_user: {
        id: "",
        first: "",
        last: "",
        email: ""
    }
};

export default initialState;
