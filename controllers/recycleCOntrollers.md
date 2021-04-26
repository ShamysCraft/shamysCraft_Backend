const deleteProduct = (req, res) => {
  const id = req.Productdata._id;
  try {
    Product.findByIdAndDelete(id)
      .then(res.status(200).json({ message: "Product deleted successfully" }))
      .catch(err => res.status(400).json({ err: `product with ${id} cannot be deleted` }))
  } catch (error) {
    error => res.status(400).json({ error: "cannot process the request" })
  }

}