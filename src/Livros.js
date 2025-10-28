//criando um modelo para livros 

import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId}, 
    titulo: {type: String, required: true},
    autor: {type: String},
    paginas: {type: Number}
}, {versionKey: false });

//a string 'livro' se refere a coleção que a gnt definio no banco de dados
const livro = mongoose.model("livro", livroSchema, "livros");

export default livro;