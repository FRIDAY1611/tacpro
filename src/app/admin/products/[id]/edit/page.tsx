import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductForm from '../../_components/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">编辑产品</h1>
      <ProductForm
        initial={{
          ...product,
          moq: product.moq?.toString() || '',
          categoryId: product.categoryId || '',
          sku: product.sku || '',
          mainImage: product.mainImage || '',
          images: product.images || '',
          drawing: product.drawing || '',
          specifications: product.specifications || '',
          nameEn: product.nameEn || '',
          nameZh: product.nameZh || '',
          nameEs: product.nameEs || '',
          nameFr: product.nameFr || '',
          nameAr: product.nameAr || '',
          nameRu: product.nameRu || '',
          descriptionEn: product.descriptionEn || '',
          descriptionZh: product.descriptionZh || '',
          descriptionEs: product.descriptionEs || '',
          descriptionFr: product.descriptionFr || '',
          descriptionAr: product.descriptionAr || '',
          descriptionRu: product.descriptionRu || '',
          shortDescEn: product.shortDescEn || '',
          shortDescZh: product.shortDescZh || '',
          shortDescEs: product.shortDescEs || '',
          shortDescFr: product.shortDescFr || '',
          shortDescAr: product.shortDescAr || '',
          shortDescRu: product.shortDescRu || '',
          metaTitleEn: product.metaTitleEn || '',
          metaTitleZh: product.metaTitleZh || '',
          metaTitleEs: product.metaTitleEs || '',
          metaTitleFr: product.metaTitleFr || '',
          metaTitleAr: product.metaTitleAr || '',
          metaTitleRu: product.metaTitleRu || '',
          metaDescEn: product.metaDescEn || '',
          metaDescZh: product.metaDescZh || '',
          metaDescEs: product.metaDescEs || '',
          metaDescFr: product.metaDescFr || '',
          metaDescAr: product.metaDescAr || '',
          metaDescRu: product.metaDescRu || '',
        }}
        categories={categories}
      />
    </div>
  )
}
