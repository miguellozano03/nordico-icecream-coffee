// src/services/image.service.ts
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";
import { cloudinary } from "@/config/cloudinary";
import { config } from "@/config/env";

export class ImageService {
  private readonly uploadDir = path.join(process.cwd(), "uploads", "products");

  public async upload(file: Express.Multer.File): Promise<string> {
    const processedBuffer = await sharp(file.buffer)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toBuffer();

    if (config.IS_PRODUCTION) {
      return this.uploadToCloudinary(processedBuffer);
    }

    return this.saveToDisk(processedBuffer);
  }

  public async delete(imagePath: string): Promise<void> {
    if (this.isCloudinaryUrl(imagePath)) {
      await this.deleteFromCloudinary(imagePath);
      return;
    }
    await this.deleteFromDisk(imagePath);
  }

  public async replace(oldImage: string, file: Express.Multer.File): Promise<string> {
    const newImage = await this.upload(file);
    await this.delete(oldImage);
    return newImage;
  }

  // ---------- Local (dev) ----------

  private async saveToDisk(buffer: Buffer): Promise<string> {
    await fs.mkdir(this.uploadDir, { recursive: true });
    const filename = `${crypto.randomUUID()}.webp`;
    const filepath = path.join(this.uploadDir, filename);
    await fs.writeFile(filepath, buffer);
    return `/uploads/products/${filename}`;
  }

  private async deleteFromDisk(imagePath: string): Promise<void> {
    const fullPath = path.join(process.cwd(), imagePath);
    try {
      await fs.unlink(fullPath);
    } catch {
      // If not exists, nothing happens
    }
  }

  // ---------- Cloudinary (prod) ----------

  private uploadToCloudinary(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products", resource_type: "image", format: "webp" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      );
      stream.end(buffer);
    });
  }

  private isCloudinaryUrl(imagePath: string): boolean {
    return imagePath.startsWith("http");
  }

  private extractPublicId(url: string): string | null {
    // Ej: https://res.cloudinary.com/<cloud>/image/upload/v123456/products/uuid.webp
    // -> public_id = "products/uuid"
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    return match ? match[1] : null;
  }

  private async deleteFromCloudinary(imagePath: string): Promise<void> {
    const publicId = this.extractPublicId(imagePath);
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch {
      // If not exists, nothing happens
    }
  }
}

export const imageService = new ImageService();
