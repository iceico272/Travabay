import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';    
import adminRoutes from './routes/adminRoutes.js';  
import categoryRoutes from './routes/categoryRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import packagesRoutes from './routes/packagesRoutes.js';
import publicPackagesRoutes from './routes/publicPackageRoutes.js';

// 2. Initialize App & Middleware
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
 'http://localhost:3000', // Assuming User Frontend
 'http://localhost:3001', // Assuming Admin Frontend (or adjust port if they are the same)
];

app.use(cors({
 origin: allowedOrigins,
 methods: 'GET,POST,PUT,DELETE',
 credentials: true,
 allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/admin', categoryRoutes); 
app.use('/api/admin', subcategoryRoutes); 

app.use('/api/admin', packagesRoutes); //for admin side
app.use('/api/packages', publicPackagesRoutes); //for frontend




app.get('/', (req, res) => {
 res.send(`API is running on port ${PORT}`);
});

// 4. Start Server
app.listen(PORT, () => {
 console.log(` Server running on port ${PORT}`);
 console.log(`Connect to database: ${process.env.DB_DATABASE}`);
});


