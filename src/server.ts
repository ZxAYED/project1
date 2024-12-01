import app from "./app"
import config from "./app/config";

const mongoose = require('mongoose');



async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to the database');

        const server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
        return server
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
main().catch(err => console.log(err));

