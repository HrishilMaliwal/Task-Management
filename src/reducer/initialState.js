const initialState = JSON.parse(localStorage.getItem("myState")) || {
  
    flag: "",
    assignment_array: [],
    student_database: [],
    teacher_database: [],
    current_user: {
        id: "",
        first: "",
        last: "",
        email: ""
    }
};

export default initialState;
