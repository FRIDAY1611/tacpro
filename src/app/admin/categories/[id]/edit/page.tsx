import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CategoryForm from '../../_components/CategoryForm'

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = await prisma.category.findUnique({ where: { id } })

  if (!category) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">编辑分类</h1>
      <CategoryForm
        initial={{
          ...category,
          nameEs: category.nameEs || '',
          nameFr: category.nameFr || '',
          nameAr: category.nameAr || '',
          nameRu: category.nameRu || '',
          descriptionEn: category.descriptionEn || '',
          descriptionZh: category.descriptionZh || '',
          descriptionEs: category.descriptionEs || '',
          descriptionFr: category.descriptionFr || '',
          descriptionAr: category.descriptionAr || '',
          descriptionRu: category.descriptionRu || '',
        }}
      />
    </div>
  )
}
