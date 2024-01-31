import express from 'express';
import {ProductManager} from '../managers/productManager.js'
import {__dirname} from '../utils.js';

const manager = new ProductManager(__dirname + '/db/products.json');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let {limit} = req.query;
        const {payload: products, error} = await manager.getProducts();
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).render('home', {products: limit ? products.slice(0, limit) : products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.get('/realTimeProducts', async (req, res) => {
    try {
        const {payload: products, error} = await manager.getProducts();
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).render('realTimeProducts', {products: products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.post('/realTimeProducts', async (req, res) => {
    try {
        const product = req.body;
        await manager.addProduct(product);
        const {payload: products, error} = await manager.getProducts();
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).render( 'realTImeProducts' , {products: products});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

export {router}