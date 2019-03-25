import axios from "axios";

export default {
    getStudents: function() {
        return axios.get("/api/students/");
    },
    createStudent: function(student) {
        return axios.post("/api/students/", student);
    },
    getGroups: function() {
        return axios.get("/api/groupings/");
    },
    createGrouping: function(grouping) {
        return axios.post("/api/groupings", grouping);
    }
}