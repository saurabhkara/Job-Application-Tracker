import app from './app'
import env from './util/validEnv';
import mongoose from "mongoose";


mongoose.connect(env.MONGO_CONN).then(() => {
    console.log('Database Connected');
    app.listen(env.PORT, () => {
        console.log(`Server started running at ${env.PORT}`)
    })
}).catch((err) => {
    console.error(err)
})




