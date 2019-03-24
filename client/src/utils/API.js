import axios from "axios";

export default {
    createStudent: function(student) {
        axios.post("/api/students/", student);
    }
}