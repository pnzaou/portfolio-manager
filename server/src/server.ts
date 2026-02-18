import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import contactRoute from './routes/contact.route'
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}))

app.use(morgan('combined'))

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PORTFOLIO_URL,
].filter((url): url is string => !!url);

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Manager API is running!',
    timestamp: new Date().toISOString()
  })
})

if(process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
  });
}

export default app;