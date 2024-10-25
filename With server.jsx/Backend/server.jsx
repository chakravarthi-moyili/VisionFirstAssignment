const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'visionfirst',
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database.");
    }
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO signup (`name`, `username`, `role`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.name, req.body.username, req.body.role, req.body.email, req.body.phone, req.body.password]
    db.query(sql, values, (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

// app.post('/login', (req, res) => {
//     const sql = "SELECT  * FROM signup WHERE `username` = ? AND `password` = ?";

//     const values = [req.body.username, req.body.password]
//     db.query(sql, values, (err, data) => {
//         if(err) {
//             return res.json("Error");
//         }
//         if(data.length > 0) {
//             return res.json("Success");
//         }
//         else {
//             return res.json("Fail");
//         }
//     })
// })

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM signup WHERE `username` = ? AND `password` = ?";
    const values = [req.body.username, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json({ status: "Error", message: "Database error" });
        }
        if (data.length > 0) {
            const userRole = data[0].role; // Assuming the role column is named 'role'
            return res.json({ status: "Success", role: userRole });
        } else {
            return res.json({ status: "Fail", message: "Invalid credentials" });
        }
    });
});


app.post('/companyform', (req, res) => {
    const sql = "INSERT INTO companies (`companyname`, `companyaddress`, `createdby`, `status`) VALUES (?, ?, ?, ?)";
    const values = [req.body.companyname, req.body.companyaddress, req.body.createdby, req.body.status];

    console.log("Incoming data:", req.body);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the actual error
            return res.status(500).json("Error creating company: " + err.message);
        }
        return res.status(201).json("Company created successfully");
    });
});

// app.get('/companyform', (req, res) => {
//     const createdby = req.query.createdby; // Get createdby from query parameters
//     const sql = 'SELECT * FROM companies WHERE createdby = ?'; // Filter by createdby
//     db.query(sql, [createdby], (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

app.get('/companyform', (req, res) => {
    const sql = 'SELECT * FROM companies';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Error fetching companies: " + err.message);
        }
        res.json(results);
    });
});

app.get('/companyform/:id', (req, res) => {
    const companyId = req.params.id;
    const sql = 'SELECT * FROM companies WHERE id = ?'; // Ensure you use a parameterized query to avoid SQL injection
    db.query(sql, [companyId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Error fetching company: " + err.message);
        }
        if (results.length === 0) {
            return res.status(404).json("Company not found");
        }
        res.json(results[0]); // Return the first (and should be only) result
    });
});

// app.get('/companyform/:id', (req, res) => {
//     const sql = 'SELECT * FROM companies WHERE id = ?';
//     db.query(sql, [req.params.id], (err, results) => {
//         if (err) {
//             console.error("Database error:", err);
//             return res.status(500).json("Error fetching company: " + err.message);
//         }
//         if (results.length > 0) {
//             res.json(results[0]); // Return the first matching company
//         } else {
//             res.status(404).json("Company not found");
//         }
//     });
// });

// Edit a company
app.put('/companyform/:id', (req, res) => {
    const sql = "UPDATE companies SET companyname = ?, companyaddress = ?, createdby = ? WHERE id = ?";
    const values = [req.body.companyname, req.body.companyaddress, req.body.createdby, req.params.id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Error updating company: " + err.message);
        }
        return res.json("Company updated successfully");
    });
});

// Delete a company
app.delete('/companyform/:id', (req, res) => {
    const sql = "DELETE FROM companies WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Error deleting company: " + err.message);
        }
        return res.json("Company deleted successfully");
    });
});

// Approve a company
app.patch('/companyform/:id/approve', (req, res) => {
    const sql = "UPDATE companies SET status = 'Approved' WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Error approving company: " + err.message);
        }
        return res.json("Company approved successfully");
    });
});

app.listen(8081, () => {
    console.log("listing");
    
})