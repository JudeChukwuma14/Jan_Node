const postAdsSchema = require("../model/postAdsModel");
const authSchema = require("../model/authModel");

const Cart = require("../model/cartModel")
const getHomePage = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id;
      const currentUser = await authSchema.findOne({ _id: userId })
      const allAds = await postAdsSchema.find()
      const product = allAds.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("index", { product, currentUser });
    } else {
      const allAds = await postAdsSchema.find()
      const product = allAds.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("index", { product });
    }
  } catch (error) {
    res.render("index", { error: error.message });
  }
};

const getAboutPage = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("about", { currentUser });
    } else {
      res.render("about");
    }
  } catch (error) {
    res.render("about", { error: error.message });
  }
}
const getAccountFavorite = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("account-favourite-ads", { currentUser });
    } else {
      res.render("account-favourite-ads");
    }
  } catch (error) {
    res.render("account-favourite-ads", { error: error.message });
  }
}
const getAccountMyAds = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("account-myads", { currentUser });
    } else {
      res.redirect("/login")
    }
  } catch (error) {
    res.render("account-myads", { error: error.message });
  }

}

const getAccountProfileSetting = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("account-profile-setting", { currentUser });
    } else {
      res.redirect("/login")
    }
  } catch (error) {
    res.render("account-profile-setting", { error: error.message });
  }
}
const getAdListingGrid = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const listGrid = await postAdsSchema.find();
      const listgridId = listGrid.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("adlistinggrid", { listgridId, currentUser });
    } else {
      const allAds = await postAdsSchema.find()
      const product = allAds.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("adlistinggrid", { product });
    }
  } catch (error) {
    res.render("adlistinggrid", { error: error.message });
  }
}

const getAdListingList = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const listList = await postAdsSchema.find();
      const listListId = listList.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("adlistinglist", { listListId, currentUser });

    } else {
      const allAds = await postAdsSchema.find()
      const product = allAds.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("adlistinglist", { product });
    }
  } catch (error) {
    res.render("adlistinglist", { error: error.message });

  }
}

const getAdsDetails = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const detailsId = req.params.detailsId
      const details = await postAdsSchema.findOne({ _id: detailsId });
      res.render("ads-details", { details, currentUser });
    } else {
      const detailsId = req.params.detailsId
      const details = await postAdsSchema.findOne({ _id: detailsId });
      res.render("ads-details", { details });
    }
  } catch (error) {
    res.render("ads-details", { error: error.message });

  }
}
const getBlogGrid = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("blog-grid", { currentUser });
    } else {
      res.render("blog-grid");
    }
  } catch (error) {
    res.render("blog-grid", { error: error.message })
  }
}
const getBlogLeftSide = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("blog-left-side", { currentUser });
    } else {
      res.render("blog-left-side");
    }
  } catch (error) {
    res.render("blog-left-side", { error: error.message });

  }
}
const getBlog = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("Blog", { currentUser })
    } else {
      res.render("Blog");
    }
  } catch (error) {
    res.render("Blog", { error: error.message });
  }
}
const getCategory = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const category = await postAdsSchema.find();
      const categoryId = category.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("category", { categoryId, currentUser });
    } else {
      const category = await postAdsSchema.find();
      const categoryId = category.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })
      res.render("category", { categoryId });
    }
  } catch (error) {
    res.render("category", { error: error.message })
  }
};
const getContact = async (req, res) => {
  try {
    if (res.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("contact", { currentUser });
    } else {
      res.render("contact");
    }
  } catch (error) {
    res.render("contact", { error: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    if (res.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("dashboard", { currentUser });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.render("dashboard", { error: error.message });
  }
}

const getFAQ = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("faq", { currentUser });
    } else {
      res.render("faq");
    }
  } catch (error) {
    res.render("faq", { error: error.message });
  }
}
const getForgotPassword = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("forgotpassword", { currentUser });
    } else {
      res.render("forgotpassword");
    }
  } catch (error) {
    res.render("forgotpassword", { error: error.message });
  }
}
const getIndex2 = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const posts = await postAdsSchema.find();
      const index2Id = posts.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })

      res.render("index-2", { index2Id, currentUser });
    } else {
      const posts = await postAdsSchema.find();
      const index2Id = posts.map((ads) => {
        return {
          ...ads.toObject(),
          newImage: ads.images[0] || "https://res.cloudinary.com/dltrkqcay/image/upload/v1739968550/a8wgbmfjaolunptaotkf.jpg"
        }
      })

      res.render("index-2", { index2Id });
    }
  } catch (error) {
    res.render("index-2", { error: error.message });
  }
}

const getIndex3 = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("index-3", { currentUser });
    } else {
      res.render("index-3")
    }
  } catch (error) {
    res.render("index-3", { error: error.message })
  };
}
const getLogin = async (req, res) => {
  try {

    res.render("login")

  } catch (error) {
    res.render("login", { error: error.message })
  };
}

const getOfferMessage = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("offermessage", { currentUser });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.render("offermessage", { error: error.message })
  };
}
const getPayment = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("payment", { currentUser });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.render("payment", { error: error.message })
  }
}

const getPostads = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("post-ads", { currentUser });
    } else {
      res.redirect("/login")
    }
  } catch (error) {
    res.render("post-ads", { error: error.message });
  }
}

const getPricing = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("pricing", { currentUser });
    } else {
      res.render("pricing");
    }
  } catch (error) {
    res.render("pricing", { error: error.message });
  }
}

const getPrivacySetting = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("privacy-setting", { currentUser });
    } else {
      res.redirect("/login")
    }
  } catch (error) {
    res.render("privacy-setting", { error: error.message })
  }
}
const getRegister = (req, res) => {
  res.render("register");
}
const getService = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("services", { currentUser });
    } else {
      res.render("services");
    }
  } catch (error) {
    res.render("service", { error: error.message })
  }
}

const getSinglepost = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("singlepost", { currentUser });
    } else {
      res.render("singlepost");
    }
  } catch (error) {
    res.render("singlepost", { error: error.message })
  }
}
const getTestimonial = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      res.render("testimonial", { currentUser });
    } else {
      res.render("testimonial");
    }
  } catch (error) {
    res.render("testimonial", { error: error.message })
  }
}

// const getAddCart = async (req, res) => {
//   try {
//     if (req.user) {
//       const userId = req.user.id
//       const currentUser = await authSchema.findOne({ _id: userId })
//       const allCart = await Cart.find().populate("postadId")
//       let totalAmount = 0
//       const cart = allCart.map((item) => {
//         const total = item.postadId.price * item.quantity
//         totalAmount += total

//         return {
//           ...item.toObject(),
//           newImage: item.postadId.images[0],
//           total,
//         }
//       })
//       res.render("addCart", { currentUser, cart, totalAmount });
//     } else {
//       res.redirect("/login")
//     }
//   } catch (error) {
//     res.render("addCart", { error: error.message })
//   }
// }

// const addCart = async (req, res) => {
//   try {
//     if (req.user) {
//       const userId = req.user.id
//       const currentUser = await authSchema.findOne({ _id: userId })
//       const cartId = req.params.id
//       const product = await postAdsSchema.findOne({ _id: cartId })
//       await Cart.create({
//         userId: userId,
//         postadId: cartId,
//       })

//       res.render("ads-details", {
//         success: "Product added to cart successfully",
//         currentUser,
//         product,
//       })
//     } else {
//       res.redirect("/login")
//     }

//   } catch (error) {
//     res.render("addCart", { error: error.message })
//   }
// }
// const getCheckout = async (req, res) => {
//   try {
//     if (req.user) {
//       const userId = req.user.id
//       const currentUser = await authSchema.findOne({ _id: userId })
//       res.render("checkout", { currentUser });
//     } else {
//       res.redirect("/login")
//     }
//   } catch (error) {
//     res.render("checkout", { error: error.message })
//   }
// }

// const updateCart = async (req, res) => {
//   try {
//       const { quantity } = req.body;
//       const cartItemId = req.params.id;

//       if (quantity < 1) return res.status(400).send("Invalid quantity");

//       await Cart.findByIdAndUpdate(cartItemId, { quantity });

//       res.status(200).json({ message: "Cart updated" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send("Server error");
//   }
// };
// const removeCartItem = async (req, res) => {
//   try {
//       await Cart.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "Item removed from cart" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send("Server error");
//   }
// };

const getAddCart = async (req, res) => {
  try {
      if (!req.user) return res.redirect("/login");

      const userId = req.user.id;
      const currentUser = await authSchema.findById(userId);
      const allCart = await Cart.find({ userId }).populate("postadId");

      let totalAmount = 0;
      const cart = allCart.map((item) => {
     

          if (!item.postadId.price || !item.quantity) {
              throw new Error("Price or quantity is missing for an item.");
          }

          const total = item.postadId.price * item.quantity;
          totalAmount += total;

          return {
              title: item.postadId.title,
              price: item.postadId.price,
              newImage: item.postadId.images[0],
              quantity: item.quantity,
              total,
          };
      });

      totalAmount = Number(totalAmount.toFixed(2)); 
      res.render("addCart", { currentUser, cart, totalAmount });
  } catch (error) {
      res.render("addCart", { error: error.message });
  }
};
const addCart = async (req, res) => {
  try {
      if (!req.user) return res.redirect("/login");

      const userId = req.user.id;
      const cartId = req.params.id;
      const product = await postAdsSchema.findById(cartId);

      if (!product) {
          throw new Error("Product not found.");
      }

      const existingCartItem = await Cart.findOne({ userId, postadId: cartId });

      if (!existingCartItem) {
          await Cart.create({ userId, postadId: cartId, quantity: 1 });
      } else {
          await Cart.findByIdAndUpdate(existingCartItem._id, { $inc: { quantity: 1 } });
      }

      res.redirect("/getCart"); 
  } catch (error) {
      res.render("addCart", { error: error.message });
  }
};

// Checkout Page
const getCheckout = async (req, res) => {
  try {
    if(req.user){
      const userId = req.user.id
      const currentUser = await authSchema.findOne({ _id: userId })
      const userProduct = await Cart.find({userId: userId}).populate("postadId")
      let totalAmount = 0
      userProduct.forEach(item => {
        totalAmount += item.postadId.price * item.quantity
      })
      console.log(totalAmount)
      res.render("checkout", { currentUser, userProduct, totalAmount });
    }else{
      res.redirect("/login");
    }
  } catch (error) {
    res.render("checkout", { error: error.message });
  }
};



module.exports = { addCart, getCheckout, getAddCart, getHomePage, getAboutPage, getAccountFavorite, getAccountMyAds, getAccountProfileSetting, getAdListingGrid, getAdListingList, getAdsDetails, getBlog, getBlogGrid, getBlogLeftSide, getCategory, getContact, getDashboard, getFAQ, getForgotPassword, getIndex2, getIndex3, getLogin, getOfferMessage, getPayment, getPostads, getPricing, getPrivacySetting, getRegister, getService, getSinglepost, getTestimonial };
