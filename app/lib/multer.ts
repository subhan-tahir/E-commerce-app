import multer, { FileFilterCallback } from "multer";
import path from "path";
import {Request} from "express";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const uploadPath = path.join(process.cwd(), "public/uploads/");
    // console.log("Multer destination:", uploadPath);
    cb(null, "/tmp");
    //  cb(null, "/tmp"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log("Multer filename:", filename);
    cb(null, filename);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  console.log("File mimetype:", file.mimetype);
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});