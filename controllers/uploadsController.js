import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import path from "path";
import { fileURLToPath } from "url";
import { BadRequest } from "../errors/bad-request.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const uploadProductImage = asyncWrapper(async (req, res, next) => {
  let productImage = req.files.image;
  const uploadsPath = path.join(__dirname, "../public/uploads");
  const imagePath = path.join(`${uploadsPath}/${productImage.name}`);

  //if folder doesn't exist, create it.
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdir(uploadsPath, { recursive: true }, (err) => {
      if (err) {
        return next(new BadRequest("Something went wrong! try again."));
      }
    });
    console.log("Folder created!");
  }

  await productImage.mv(imagePath);

  res.send("Image uploaded");
});
