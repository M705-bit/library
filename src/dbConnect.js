import mongoose, { mongo } from "mongoose"

async function conectaNaDatabase() { 

mongoose.connect("mongodb+srv://marinaHJ:Marnina876@cluster0.bdautyc.mongodb.net/livros?appName=Cluster0");

return mongoose.connection;

}

export default conectaNaDatabase;