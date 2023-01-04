import fs from "fs";
import path from "path";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { fileURLToPath } from "url";
// import { BadRequest } from "../errors/bad-request.js";
import { v2 as cloudinary } from "cloudinary";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
// export const uploadProductImageLOCAL = asyncWrapper(async (req, res, next) => {
//   if (!req.files) {
//     return next(new BadRequest("No file uploaded"));
//   }

//   const productImage = req.files.image;

//   if (!productImage.mimetype.startsWith("image")) {
//     return next(new BadRequest("Please upload images only"));
//   }

//   const maxSize = 5000000;
//   if (productImage.size > maxSize) {
//     return next(new BadRequest("Image is too big, max filesize is 5MB"));
//   }
//   const uploadsPath = path.join(__dirname, "../public/uploads");
//   const imagePath = path.join(`${uploadsPath}/${productImage.name}`);

//   //if folder doesn't exist, create it.
//   if (!fs.existsSync(uploadsPath)) {
//     fs.mkdir(uploadsPath, { recursive: true }, (err) => {
//       if (err) {
//         return next(new BadRequest("Something went wrong! try again."));
//       }
//     });
//     console.log("Folder created!");
//   }

//   await productImage.mv(imagePath);

//   return res
//     .status(StatusCodes.OK)
//     .json({ imageSrc: `/uploads/${productImage.name}` });
// });

export const uploadProductImage = asyncWrapper(async (req, res, next) => {
  // console.log(req.files.image);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "File Upload (Mini-Project)",
    }
  );

  //remove tmp file
  fs.unlinkSync(req.files.image.tempFilePath);
  //remove tmp dir
  fs.rmdirSync(path.join(__dirname, "../tmp"));

  return res.status(StatusCodes.OK).json({ imageSrc: result.secure_url });
});
