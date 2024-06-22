import cors from 'cors';

const allowedOrigins = ['http://10.0.0.253:5173', 'http://localhost:5000', 'http://172.18.32.1:5173'];

export default cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
});
