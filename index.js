const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

async function main() {
  await mongoose.connect('mongodb+srv://PcHuy:1hHnRQtOIxxA6sTZ@cluster0.idi4juk.mongodb.net/devop_mongo?retryWrites=true&w=majority&appName=Cluster0');
}

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error when get list product', error });
  }
});

app.post('/product', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price is required!' });
  }

  try {
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json({ message: 'Product created!', product });
  } catch (error) {
    res.status(500).json({ message: 'Error when create product!', error });
  }
});


main().then(() => {
  app.listen(3001, () => {
    console.log('Server is on 3001');
  });
});