import app from './app.js'
import config from './config.js'
import dotenv from 'dotenv'
import { sequelize } from './config/rdb.js';

dotenv.config()

async function main() {
    await sequelize.sync({ force: false });
    /* await sequelize.authenticate();  */
    app.listen(process.env.PORT || config.PORT);
    console.log("Server on port ", process.env.PORT || config.PORT);
}

main();
/*Formula_detalle.sync({ force: true})*/