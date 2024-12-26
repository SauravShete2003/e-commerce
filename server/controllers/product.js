import Product from "./../models/Product.js";

const postProducts = async (req, res) => {
  const {
    name,
    price,
    shortDescription,
    longDescription,
    images,
    currentPrice,
    category,
    tags,
  } = req.body;

  const mandatoryField = [
    "name",
    "price",
    "shortDescription",
    "longDescription",
    "images",
    "currentPrice",
    "category",
    "tags",
  ];

  for (const field of mandatoryField) {
    if (!req.body[field]) {
      return res.status(400).json({
        message: `The field ${field} is required`,
        success: false,
      });
    }
  }

  const product = new Product({
    name,
    price,
    shortDescription,
    longDescription,
    images,
    currentPrice,
    category,
    tags,
  });
  try{
    const savedProduct = await product.save()
    res.status(201).json({
        message: "Product created successfully",
        success: true,
        data : savedProduct
        });
  } catch(err){
    res.status(400).json({
        message: "Error creating product",
        success: false,
        error: err.message
        });
  }
};

export { postProducts };
