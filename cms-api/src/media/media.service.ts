import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { SignedUrlDto } from './dto/signed-url.dto';

@Injectable()
export class MediaService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {
    this.bucket = this.config.get<string>('S3_BUCKET', 'cms-assets');
    this.s3 = new S3Client({
      region: this.config.get<string>('S3_REGION', 'us-east-1'),
      endpoint: this.config.get<string>('S3_ENDPOINT'),
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.config.get<string>('S3_ACCESS_KEY', ''),
        secretAccessKey: this.config.get<string>('S3_SECRET_KEY', '')
      }
    });
  }

  create(dto: CreateMediaDto) {
    return this.prisma.mediaAsset.create({
      data: {
        ...dto
      }
    });
  }

  findAll() {
    return this.prisma.mediaAsset.findMany();
  }

  update(id: string, dto: UpdateMediaDto) {
    return this.prisma.mediaAsset.update({
      where: { id },
      data: dto
    });
  }

  remove(id: string) {
    return this.prisma.mediaAsset.delete({ where: { id } });
  }

  async signedUpload(dto: SignedUrlDto) {
    const key = `${Date.now()}-${dto.fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: dto.contentType
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });

    return {
      uploadUrl,
      assetUrl: `${this.config.get('S3_ENDPOINT')}/${this.bucket}/${key}`,
      bucket: this.bucket,
      key
    };
  }
}
