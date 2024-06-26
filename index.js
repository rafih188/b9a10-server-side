const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
//middware 
app.use(cors());
app.use(express.json());

// connection to mongo server 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xfhikw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// !Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful 
        // connection
        const craftCollection = client.db('craftItems').collection('craftCard');
        
        const addedCraftList = client.db('craftItems').collection('myCraftList');

        const customerDataCollection = client.db('customerReview').collection('customerComment');

        //post operations 

        app.post('/myCraftList', async (req, res) => {
            const newItem = req.body;
            const result = await addedCraftList.insertOne(req.body);
            res.send(result);
        });


        app.post('/craft', async (req, res) => {
            const result = await craftCollection.insertOne(req.body);
            res.send(result);
        });

        app.post('/review', async (req, res) => {
            const result = await customerDataCollection.insertOne(req.body);
            res.send(result);
        });
        // get operations 
        app.get('/craft', async (req, res) => {
            const cursor = craftCollection.find();
            if ((await cursor.count) === 0) {
                console.log('no data found');
            }
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/review', async (req, res) => {
            const cursor = customerDataCollection.find();
            if ((await cursor.count) === 0) {
                console.log('no data found');
            }
            const result = await cursor.toArray();
            res.send(result);
        })


        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running perfectly')
});

app.listen(port, (req, res) => {
    console.log(`server is running in the port ${port}`)
})