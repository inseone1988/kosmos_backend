const Student = require('../models/student');
const sequelize = require('../config/sequelize');

//TODO : Input validation

const studentController = {
    getStudents: async (req, res) => {
        const students = await sequelize.query("CALL get_existent_students");
        res.json({success: true, payload:students});
    },

    createStudent: async (req, res) => {
        // const {name, email, phone, address, gpa, career, quarter, credits, status, notes} = req.body;
        //Query equivalent to: INSERT INTO students (name, email, phone, address, gpa, career, quarter, credits, status, notes) VALUES (name, email, phone, address, gpa, career, quarter, credits, status, notes);
        const student = await Student.create(req.body);
        res.json({success: true, payload: student});
    },
    updateStudent: async (req, res) => {
        const {name, email, phone, address, gpa, career, quarter, credits, status, notes} = req.body;
        //Query equivalent to: UPDATE students SET name = name, email = email, phone = phone, address = address, gpa = gpa, career = career, quarter = quarter, credits = credits, status = status, notes = notes WHERE id = id;
        const student = await Student.update({name, email, phone, address, gpa, career, quarter, credits, status, notes}, {where: {id: req.params.id}});
        res.json({success: true, payload: student});
    },
    deleteStudent: async (req, res) => {
        //Query equivalent to: DELETE FROM students WHERE id = id;
        const student = await Student.destroy({where: {id: req.params.id}});
        res.json({success: true, payload: student});
    },
};

module.exports = studentController;
