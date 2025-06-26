const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.delete('/api/items/:id', async (req, res) => {
  const deleted = await Item.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
