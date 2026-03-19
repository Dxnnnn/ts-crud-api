// src/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/errorHandler';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';
import departmentsController from './departments/department.controller'; // Import department routes
import employeesController from './employees/employee.controller';
import requestsController from './requests/request.controller'; // Import request routes
import transferController from './transfers/transfer.controller'; // Import transfer routes

const app: Application = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(cors());

//API Routes
app.use('/users', usersController);
app.use('/departments', departmentsController); // Add this line to include department routes
app.use('/employees', employeesController); // Add this line to include employee routes
app.use('/requests', requestsController); // Add this line to include request routes
app.use('/transfers', transferController); // Add this line to include transfer routes

// Global Error Handler (must be last)
app.use(errorHandler);

// Start server + initialize database
const PORT = process.env.PORT || 4000;

initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Test with: POST /users with { email.password, ...}`);
    });
})
.catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});