import cors from 'cors';

const allowedOrigins = [
    'http://10.0.0.253:5174',
    'http://localhost:5174',
    'http://172.22.80.1:5174'
];

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
