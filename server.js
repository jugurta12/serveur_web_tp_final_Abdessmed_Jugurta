const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/marketplace_db')
    .then(() => console.log("Connecté au Garage MongoDB"))
    .catch(err => console.error(err));

// Modèle Categories

const categorieSchema = new mongoose.Schema({
    nom: { type: String, required: true },
})
const Categorie = mongoose.model('Categorie', categorieSchema);

//Modèle Product
const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    stock: { type: Number, required: true },
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
})
const Product = mongoose.model('Product', productSchema);


//Modèle Users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: String, required: true },
})
const User = mongoose.model('User', userSchema);

//Modèle Reviews
const reviewSchema = new mongoose.Schema({
    commentaire: { type: String, required: true },
    note: {type: Number,min: 1,max: 5,required: false},
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
const Review = mongoose.model('Review',reviewSchema);

// ROUTES PRODUCTS

//GET
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

//ADD
app.post('/api/products', async (req, res) => {
    const { prix, stock } = req.body;

    // Vérification prix positif
    if (prix <= 0) {
        return res.status(400).json({
            message: "Le prix doit être supérieur à 0"
        });
    }
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
});

//Commentaire sur produit
app.post('/api/reviews', async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
});

// afficher review

app.get('/api/reviews/:id', async (req, res) => {
    const review = await Review.findById(req.params.id)
        .populate('auteur', 'username')
        .populate({
            path: 'produit',
            populate: { path: 'categorie' }
        });
    res.json(review);
});

app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        await Review.deleteMany({ produit: product._id });
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Produit et reviews sup" });

    } catch (err) {
        res.status(400).json({ message: "ID in valide" });
    }
});





















app.listen(3000, () => console.log("Serveur Garage sur port 3000"));