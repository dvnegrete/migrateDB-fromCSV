import express from 'express';
import { router } from './router.js'

const app = express();
router(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
