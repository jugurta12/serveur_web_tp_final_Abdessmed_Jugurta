# Marketplace – Projet Fullstack

## Description
Application marketplace réalisée avec Node.js, Express et MongoDB.  
Elle permet de gérer des produits, des utilisateurs et des avis via une API REST et une interface web simple.

## Technologies
- Node.js
- Express
- MongoDB / Mongoose
- HTML / CSS / JavaScript
- CORS

## Lancement du projet

### Installer les dépendances
```bash
npm install express mongoose cors
'''
Lancer le serveur
node server.js
Serveur disponible sur :


http://localhost:3000
Fonctionnalités
Admin
Ajouter un produit
Afficher les produits
Supprimer un produit
Client
Voir les produits
Voir les avis par produit
Laisser un avis (utilisateur + produit)
API principale
GET /api/products
POST /api/products
DELETE /api/products/:id
GET /api/users
POST /api/users
POST /api/reviews
GET /api/products/:id/reviews
Base de données
MongoDB locale : marketplace_db
Collections : products, users, reviews, categories
