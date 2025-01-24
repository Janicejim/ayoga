import formidable from "formidable";
import fs from "fs";
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

let counter = 0;

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    let fieldName = part.name;
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    counter++;
    return `${fieldName}-${timestamp}-${counter}.${ext}`;
  },
});
