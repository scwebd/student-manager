import axios from "axios";

export default {
    getStudents: function() {
        return axios.get(`/api/students/`);
    },
    createStudent: function(student) {
        return axios.post("/api/students/", student);
    },
    createGrouping: function(grouping) {
        return axios.post("/api/groupings", grouping);
    }
}