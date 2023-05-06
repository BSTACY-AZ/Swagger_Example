const express       = require('express');
const app           = express();
const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUI     = require('swagger-ui-express');

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Guitars API',
            version: '1.0.0'
        }
    },
    apis: ['app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /guitars:
 *    get:
 *       description: Get all guitars
 *       responses:
 *              200:
 *                  description: Success
 * 
 */
app.get('/guitars', (req, res) =>{
    res.send([
        {
            brand:'Gibson',
            model: 'FA-135CE',
            type: 'Acoustic',
            subtype: 'Acoustic Electric',
            price: 249.99            
        }
    ]);
});

/**
 * @swagger
 * /guitar:
 *    post:
 *       description: Get one guitar
 *       parameters: 
 *       - name: brand
 *         description: Guitar brand
 *         in: body
 *         required: true
 *         type: string
  *       - name: model
 *         description: Brand model #
 *         in: body
 *         required: true
 *         type: string
  *       - name: type
 *         description: type of guitar (acoustic/electric)
 *         in: body
 *         required: true
 *         type: string
  *       - name: subtype
 *         description: special subtype
 *         in: body
 *         required: true
 *         type: string
  *       - name: price
 *         description: Guitar brand
 *         in: body
 *         required: true
 *         type: decimal 
 *       responses:
 *         200:
 *           description: Success
 * 
 */
app.post('/guitar', (req, res) =>{
    const brand = req.body.brand;
    const model = req.body.model;
    const type = req.body.type;
    const subtype = req.body.subtype;
    const price = req.body.price;

    res.send({brand, model, type, subtype, price});
});

app.listen(3000, () => {
    console.log('Running on port 3000')
})