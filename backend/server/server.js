import express from 'express';
import cors from './middleware/cors.js'; // Correct path to your custom CORS file
import { dbConfig } from './config.js';
import missingCasesRoutes from './routes/missingCasesRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors); // Use your custom CORS configuration

console.log('DB_USER:', dbConfig.user); // Verify the environment variable
console.log('DB_PASSWORD:', dbConfig.password); // Verify the environment variable
console.log('DB_HOST:', dbConfig.host); // Verify the environment variable

app.use(express.json());
app.use('/api/missingCases', missingCasesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
