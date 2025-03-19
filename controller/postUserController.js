const getAds = require("../model/postAdsModel")

const cloudinary = require("../middleware/cloudinary")

const postAds = async (req, res) => {
    const { title,
        price,
        message,
        firstName,
        address,
        category,
        country,
        brand,
        condition
    } = req.body
    const emptyField = []
    const images = []
    const allProductsField = [
        "title",
        "price",
        "message",
        "firstName",
        "address",
        "category",
        "country",
        "brand",
        "condition",
    ]
    for (const child of allProductsField) {
        if (!req.body[child] || req.body[child] === "" || req.body[child] === undefined) {
            emptyField.push(child)
        }
    }
    if (emptyField.length > 0) {
        return res.render("post-ads", {
            error: `This field(s) ${emptyField.join(" ,")} cannot be empty`
        })
    }
    if (req.files && Array.isArray(req.files)) {
        const fileArray = req.files.slice(0, 5)
        for (const file of fileArray) {
            const uploadedImage = await cloudinary.uploader.upload(file.path)
            images.push(uploadedImage.secure_url)
        }
    }
    await getAds.create({
        title,
        price,
        message,
        firstName,
        address,
        category,
        country,
        brand,
        condition,
        images: images,
    })
    res.render("post-ads", {
        success: "Ad posted successfully"
    })

}

module.exports = { postAds }