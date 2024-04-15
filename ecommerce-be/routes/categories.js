const { Category } = require("../models/category");
const express = require("express");
const uploadOptions = require("../helpers/storage");
const router = express.Router();
const BaseResponse = require("../helpers/baseResponse");
const HTTP_STATUS = require("../helpers/httpStatus");
const res = require("express/lib/response");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// router.get("/:id", async (req, res) => {
//   const category = await Category.findById(req.params.id);

//   if (!category) {
//     res
//       .status(500)
//       .json({ message: "The category with the given ID was not found." });
//   }
//   res.status(200).send(category);
// });

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const file = req.file;
  let imgUrl = "";
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imgUrl = `${basePath}${fileName}`;
  }

  let category = new Category({
    name: req.body.name,
    description: req.body.description,
    imgUrl: imgUrl,
    parentId: req.body.parentId,
    slug: req.body.slug,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get("/getAll", async (req, res) => {
  try {
    // Retrieve all categories from the repository
    const categories = await Category.find();
    // Filter categories that have a parent ID
    var filteredCategories = categories
      .filter((c) => c.parentId !== null)
      .map((c) => {
        return { ...c.toObject(), level: 0, children: [] };
      });
    // Initialize an empty array to store the final result
    var result = [];
    // Iterate through categories
    for (var category of categories) {
      // If the category has no parent, find its children
      if (category.parentId === null) {
        var categoryObj = { ...category.toObject(), level: 0, children: [] };
        findChildren(categoryObj, filteredCategories);
        result.push(categoryObj);
      }
    }
    // Return the result wrapped in a BaseResponse
    res.send(new BaseResponse(HTTP_STATUS.OK, "Success", result));
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    return { error: "An error occurred while processing the request" };
  }
});

// Define the findChildren function
const findChildren = (parent, categories) => {
  // Filter categories to find children of the given parent
  var children = categories.filter((c) => c.parentId == parent._id);
  parent.children = children;
  for (var child of children) {
    // Calculate the level of the child
    var level = parent.level + 1;
    child.level = level;

    // If the level is less than 2, recursively find children of the child
    if (level < 2) {
      findChildren(child, categories);
    }
  }
};

module.exports = router;
