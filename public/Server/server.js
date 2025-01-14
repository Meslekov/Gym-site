const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = 10;

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: "root",
  database: 'gym'
})

const secretKey = 'your_secret_key';

app.post('/redactUserName', (req, res) => {
   const newName = req.body.replacementText;
   const name = req.body.username;
const UpdateNameQuery = "UPDATE users SET name = ? WHERE name = ?;";
   
   const values = [
       newName,
       name
      ];

              db.query(UpdateNameQuery, values, (updateErr, updateResults) => {
                  if (updateErr) {
                  console.error("Failed to insert record:", updatetErr);
                  console.error("Failed to insert record:", updatetErr);
                  return res.status(500).json({ error: "Failed to register" });
                  } 
      
                  else {
                  console.log("Record updateed successfully");
                  return res.status(201).json({ success: "Registration successful" });
                  }      
                });
  });

app.post('/redactUserEmail', (req, res) => {
   const newEmail = req.body.replacementText;
   const name = req.body.username;
    const UpdateEmailQuery = "UPDATE users SET email = ? WHERE name = ?;";
    
    const values = [
        newEmail,
        name
       ];
  
               db.query(UpdateEmailQuery, values, (updateErr, updateResults) => {
                   if (updateErr) {
                   console.error("Failed to insert record:", updatetErr);
                   return res.status(500).json({ error: "Failed to register" });
                   } 
       
                   else {
                   console.log("Record updateed successfully");
                   return res.status(201).json({ success: "Registration successful" });
                   }      
                 });
  });

app.post('/redactUserPassword', (req, res) => {
   const newPassword = req.body.replacementText;
   const name = req.body.username;
    const UpdatePasswordQuery = "UPDATE users SET password = ? WHERE name = ?;";
    
    bcrypt.hash(newPassword.toString(), salt, (err, hash) => {
      if(err){
        console.log(err);
      }
       const values = [
        hash,
        name
       ];
  
               db.query(UpdatePasswordQuery, values, (updateErr, updateResults) => {
                   if (updateErr) {
                   console.error("Failed to insert record:", updatetErr);
                   return res.status(500).json({ error: "Failed to register" });
                   } 
       
                   else {
                   console.log("Record updateed successfully");
                   return res.status(201).json({ success: "Registration successful" });
                   }      
                 });
    });
  });

app.post('/redactUserPlan', (req, res) => {
   const newPlan = req.body.replacementText;
   const name = req.body.username;
     const UpdatePlanQuery = "UPDATE users SET plan = ? WHERE name = ?;";
     
     const values = [
         newPlan,
         name
        ];
  
                db.query(UpdatePlanQuery, values, (updateErr, updateResults) => {
                    if (updateErr) {
                    console.error("Failed to insert record:", updatetErr);
                    return res.status(500).json({ error: "Failed to register" });
                    } 
        
                    else {
                    console.log("Record updateed successfully");
                    return res.status(201).json({ success: "Registration successful" });
                    }      
                  });
   });

app.post('/redactUserStartDate', (req, res) => {
   const newStartDate = req.body.replacementText;
   const name = req.body.username;
     const UpdateStartDateQuery = "UPDATE users SET start_date = ? WHERE name = ?;";
     
     const values = [
         newStartDate,
         name
        ];
  
                db.query(UpdateStartDateQuery, values, (updateErr, updateResults) => {
                    if (updateErr) {
                    console.error("Failed to insert record:", updatetErr);
                    return res.status(500).json({ error: "Failed to register" });
                    } 
        
                    else {
                    console.log("Record updateed successfully");
                    return res.status(201).json({ success: "Registration successful" });
                    }      
                  });
   });

app.post('/redactUserEndDate', (req, res) => {
   const newEndDate = req.body.replacementText;
   const name = req.body.username;
const UpdateEndDateQuery = "UPDATE users SET end_date = ? WHERE name = ?;";
    
    const values = [
        newEndDate,
        name
       ];
 
               db.query(UpdateEndDateQuery, values, (updateErr, updateResults) => {
                   if (updateErr) {
                   console.error("Failed to insert record:", updatetErr);
                   return res.status(500).json({ error: "Failed to register" });
                   } 
       
                   else {
                   console.log("Record updateed successfully");
                   return res.status(201).json({ success: "Registration successful" });
                   }      
                 });
  });

app.post('/redactUserWorkouts', (req, res) => {
   const newWorkouts = req.body.replacementText;
   const name = req.body.username;
     const UpdateWorkoutsQuery = "UPDATE users SET completed_workouts = ? WHERE name = ?;";
     
     const values = [
         parseInt(newWorkouts),
         name
        ];
  
                db.query(UpdateWorkoutsQuery, values, (updateErr, updateResults) => {
                    if (updateErr) {
                    console.error("Failed to insert record:", updatetErr);
                    return res.status(500).json({ error: "Failed to register" });
                    } 
        
                    else {
                    console.log("Record updateed successfully");
                    return res.status(201).json({ success: "Registration successful" });
                    }      
                  });
   });

app.post('/addUser', (req, res) => {

      db.query("SELECT COUNT(*) AS num_records FROM users", (err, results) => {
         if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ error: "Database error" });
         }  

         else {
             const numRecords = results[0].num_records;
             if (numRecords > 0) {

             db.query("SELECT MAX(id) AS max_id FROM users", (err, results) => {
              
              if (err) {
               console.error("Database error:", err);
               return res.status(500).json({ error: "Database error" });
               } 
              
               else {
                   const maxId = results[0].max_id;
                   const insertQuery = "INSERT INTO users (id, name, email, password, plan, start_date, end_date, completed_Workouts, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

                   const pass = req.body.password;
                   bcrypt.hash(pass.toString(), salt, (err, hash) =>{
                    if(err)
                    {
                      console.log(err);
                    }
                    const type = 1;
                    const values = [
                      maxId + 1, 
                      req.body.username,
                      req.body.email,
                      hash,
                      req.body.plan,
                      req.body.startDate,
                      req.body.endDate,
                      req.body.completedWorkouts,
                      type
                     ];
  
                   db.query(insertQuery, values, (insertErr, insertResults) => {
                    if (insertErr) {
                    console.error("Failed to insert record:", insertErr);
                    return res.status(500).json({ error: "Failed to register" });
                    } 
        
                    else {
                    console.log("Record inserted successfully");
                    return res.status(201).json({ success: "Registration successful" });
                    }
                 });
               });

              }
           });
         } 

         else {
             const insertFirstQuery = "INSERT INTO users (id, name, email, password, plan, start_date, end_date, completed_Workouts, type) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)";

                   const pass = req.body.password;
                   bcrypt.hash(pass.toString(), salt, (err, hash) =>{
                    if(err)
                    {
                      console.log(err);
                    }

                     const type = 1;
             const values = [
                    req.body.username,
                    req.body.email,
                    hash,
                    req.body.plan,
                    req.body.startDate,
                    req.body.endDate,
                    req.body.completedWorkouts,
                    type
                  ];

                          db.query(insertFirstQuery, values, (insertErr, insertResults) => {
                  if (insertErr) {
                  console.error("Failed to register:", insertErr);
                  return res.status(500).json({ error: "Failed to register" });
                  }
     
                  else
                  return res.status(201).json({ success: "Registration successful" }); // 201 Created
               });
               });

            
                  
                }
      }
     });
    // }
    });

app.get('/getData', (req, res) => {
  const getUsersQuery = `
    SELECT 
      name AS username, 
      email, 
      plan, 
      start_date AS startDate, 
      end_date AS endDate, 
      completed_Workouts AS completedWorkouts
    FROM 
      users
    WHERE id > 1
     `;

  db.query(getUsersQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

app.post('/getUserData', (req, res) => {
  const name  = req.body.username;
  console.log(name);
  const getUsersQuery = "SELECT name AS username, email, plan, start_date AS startDate, end_date AS endDate, completed_Workouts AS completedWorkouts FROM users WHERE name = ?";

  db.query(getUsersQuery, [name], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    console.log(results);
    return res.json(results);
  });
});

app.post('/login', (req, res) => {
  const password  = req.body.password; 
  const name = req.body.username;
  console.log(name);

  const getUsersQuery = 'SELECT *, type FROM users WHERE name = ?';

  db.query(getUsersQuery, [name], async (err, results) => {
    if (err) {
      console.error('Грешка в базата данни:', err);
      return res.status(500).json({ error: 'Грешка в базата данни' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Невалидно име!' });
    }
    
         console.log(password);
         console.log(results[0].Password);
         const isMatch = await bcrypt.compare(password, results[0].Password);
         console.log(isMatch);
         if(isMatch == true){
           const type = results[0].type;
          
             const token = jwt.sign({ name }, secretKey, { expiresIn: '1d' });
      
             return res.json({ type: type, token: token, errCode: false });
         }
         else
           return res.json({ errCode: true });
      
     });
    
  });


const verifyToken = (req, res, next) => {
    const token = req.headers['access-token']; 

    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }
    else{
      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
              return res.status(401).json({ error: 'Invalid token' });
          }
          req.username = decoded.name;
          next();
      });
    }
}


app.post('/auth', verifyToken, (req, res) => {
    res.json({ message: 'Protected endpoint accessed successfully', isLoggedIn: true});
});

app.listen(5000,()=> {
  console.log("Listening...");
})