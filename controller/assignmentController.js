const  pool = require('../db.js')

const createAssignment = async (req, res) => {
    let { title, deadline } = req.body;
    if ( !title || !title.trim() || !deadline || !deadline.trim()) {
        res.status(400).json({
            success: false,
            message: "Should contain title and deadline"
        });
    }

    title = title.trim();

    const dateOnly = new Date(deadline.trim());

    const query = `INSERT INTO users (title, deadline) values ($1, $2) returning id, title, deadline, submitted;`;
    try {
        const result = await pool.query(query, [title,dateOnly ]);
        return res.status(201).json({
            success: true,
            message: "Successfully inserted value",
            data : result.rows[0]
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong"
        return res.status(400).json({
            success: false,
            message: errorMessage
        })
    }
}

const getAssignments = async( req, res) => {
    const submittedQueries = req.query?.submitted || null;
    let query = `Select * FROM users;`;
    let result;
    try {
        result = await pool.query(query);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        console.log(error)
        return res.status(400).json({
            success: false,
            message: errorMessage
        })
    }

    let rows = result.rows;

    if (submittedQueries){
        rows = rows.map( assignment => assignment.submitted == submittedQueries);
    }

    return res.status(201).json({
            success: true,
            message: "Successfully inserted value",
            data : rows
        })
}



module.exports = {
    createAssignment,
    getAssignments
}