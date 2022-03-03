import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';

import db from '../db/connection';



class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Server running in port', this.port);
      
    })
  }

  async dbConnection() {
    try {

      await db.authenticate();
      console.log('Database is online!');

    } catch (err: any) {
      throw new Error(err);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse body
    this.app.use(express.json());

    // Public dir
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

}

export default Server;