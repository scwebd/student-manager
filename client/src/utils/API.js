import axios from "axios";

export default {
    getStudents: function(classId) {
        return axios.get(`/api/students/?class=${classId}`);
    },
    createStudent: function(student) {
        return axios.post("/api/students/", student);
    }
}