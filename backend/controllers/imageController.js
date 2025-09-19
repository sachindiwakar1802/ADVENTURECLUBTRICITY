import cloudinary from "../config/cloudinary.js";
import multer from "multer";

// Multer storage (temporary, before uploading to cloudinary)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload Image
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    const result = await cloudinary.uploader.upload_stream(
      { folder: "adventure_club" },
      (error, uploadResult) => {
        if (error) return res.status(500).json({ msg: "Upload failed", error });
        res.json({ url: uploadResult.secure_url, public_id: uploadResult.public_id });
      }
    );

    // Pipe buffer into cloudinary
    result.end(file.buffer);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    await cloudinary.uploader.destroy(public_id);
    res.json({ msg: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
