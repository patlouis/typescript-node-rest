import express, { Request, Response } from 'express';
import bookRoutes from './routes/bookRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

