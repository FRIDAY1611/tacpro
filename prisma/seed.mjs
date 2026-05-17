// Seed database from JSON data files
// Runs on every deploy to create/update the database with reference data
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'src', 'data')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database from JSON data files...')

  // Seed categories
  const categoriesPath = path.join(DATA_DIR, 'categories.json')
  if (fs.existsSync(categoriesPath)) {
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
    for (const cat of categories) {
      const { id, createdAt, updatedAt, ...data } = cat
      await prisma.category.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    }
    console.log(`  ✅ ${categories.length} categories`)
  }

  // Seed certificates
  const certsPath = path.join(DATA_DIR, 'certificates.json')
  if (fs.existsSync(certsPath)) {
    const certificates = JSON.parse(fs.readFileSync(certsPath, 'utf-8'))
    for (const cert of certificates) {
      const { id, createdAt, updatedAt, ...data } = cert
      await prisma.certificate.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    }
    console.log(`  ✅ ${certificates.length} certificates`)
  }

  // Seed products (need categories to exist first)
  const productsPath = path.join(DATA_DIR, 'products.json')
  if (fs.existsSync(productsPath)) {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
    for (const product of products) {
      const { id, createdAt, updatedAt, category, categoryId, ...data } = product
      await prisma.product.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    }
    console.log(`  ✅ ${products.length} products`)
  }

  // Seed blog posts
  const blogPath = path.join(DATA_DIR, 'blog.json')
  if (fs.existsSync(blogPath)) {
    const posts = JSON.parse(fs.readFileSync(blogPath, 'utf-8'))
    for (const post of posts) {
      const { id, createdAt, updatedAt, ...data } = post
      if (data.publishedAt) data.publishedAt = new Date(data.publishedAt)
      await prisma.blogPost.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    }
    console.log(`  ✅ ${posts.length} blog posts`)
  }

  console.log('\nSeed completed!')
}

main()
  .catch(e => { console.error('Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
