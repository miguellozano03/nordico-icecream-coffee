import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export class ImageService {
  private readonly uploadDir = path.join(process.cwd(), "uploads", "products");

  public async upload(file: Express.Multer.File): Promise<string> {
    await fs.mkdir(this.uploadDir, { recursive: true });

    const filename = `${crypto.randomUUID()}.webp`;

    const filepath = path.join(this.uploadDir, filename);

    await sharp(file.buffer)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(filepath);

    return `/uploads/products/${filename}`;
  }

  public async delete(imagePath: string): Promise<void> {
    const fullPath = path.join(process.cwd(), imagePath);

    try {
      await fs.unlink(fullPath);
    } catch {
      // Si no existe, no pasa nada
    }
  }

  public async replace(
    oldImage: string,
    file: Express.Multer.File,
  ): Promise<string> {
    await this.delete(oldImage);

    return this.upload(file);
  }
}
