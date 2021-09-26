import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/user'
import db from '../database/config';

export default class Server {
    private app: express.Application;
    private port: string;
    private paths = {
        users: '/api/users'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        
        // Conexión a BD
        this.connectToDB()

        // Middlewares
        this.middlewares();
        
        // Routes
        this.routes();
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
    }

    async connectToDB() {
        
        try {

            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Indica el tipo de dato que vendrá
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    }
};