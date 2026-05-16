'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface Category {
  id: string
  nameEn: string
}

interface Product {
  id?: string
  slug: string
  sku: string
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
  categoryId: string
  moq: string
  isCustomizable: boolean
  mainImage: string
  images: string
  drawing: string
  specifications: string
  nameEn: string
  nameZh: string
  nameEs: string
  nameFr: string
  nameAr: string
  nameRu: string
  descriptionEn: string
  descriptionZh: string
  descriptionEs: string
  descriptionFr: string
  descriptionAr: string
  descriptionRu: string
  shortDescEn: string
  shortDescZh: string
  shortDescEs: string
  shortDescFr: string
  shortDescAr: string
  shortDescRu: string
  metaTitleEn: string
  metaTitleZh: string
  metaTitleEs: string
  metaTitleFr: string
  metaTitleAr: string
  metaTitleRu: string
  metaDescEn: string
  metaDescZh: string
  metaDescEs: string
  metaDescFr: string
  metaDescAr: string
  metaDescRu: string
}

const emptyProduct: Product = {
  slug: '',
  sku: '',
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
  categoryId: '',
  moq: '',
  isCustomizable: true,
  mainImage: '',
  images: '',
  drawing: '',
  specifications: '',
  nameEn: '',
  nameZh: '',
  nameEs: '',
  nameFr: '',
  nameAr: '',
  nameRu: '',
  descriptionEn: '',
  descriptionZh: '',
  descriptionEs: '',
  descriptionFr: '',
  descriptionAr: '',
  descriptionRu: '',
  shortDescEn: '',
  shortDescZh: '',
  shortDescEs: '',
  shortDescFr: '',
  shortDescAr: '',
  shortDescRu: '',
  metaTitleEn: '',
  metaTitleZh: '',
  metaTitleEs: '',
  metaTitleFr: '',
  metaTitleAr: '',
  metaTitleRu: '',
  metaDescEn: '',
  metaDescZh: '',
  metaDescEs: '',
  metaDescFr: '',
  metaDescAr: '',
  metaDescRu: '',
}

const locales = [
  { key: 'En', label: 'EN' },
  { key: 'Zh', label: '中文' },
  { key: 'Es', label: 'ES' },
  { key: 'Fr', label: 'FR' },
  { key: 'Ar', label: 'AR' },
  { key: 'Ru', label: 'RU' },
]

export default function ProductForm({
  initial,
  categories,
}: {
  initial?: Product
  categories: Category[]
}) {
  const router = useRouter()
  const [product, setProduct] = useState<Product>(initial || emptyProduct)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = !!initial?.id

  function updateField(field: keyof Product, value: string | number | boolean) {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...product,
        sortOrder: Number(product.sortOrder) || 0,
        moq: product.moq ? Number(product.moq) : null,
      }

      const url = isEdit
        ? `/admin/api/products/${initial.id}`
        : '/admin/api/products'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to save product')
        return
      }

      router.push('/admin/products')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
      )}

      {/* General Info */}
      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              value={product.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              type="text"
              value={product.sku}
              onChange={(e) => updateField('sku', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={product.categoryId}
              onChange={(e) => updateField('categoryId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MOQ</label>
            <input
              type="number"
              value={product.moq}
              onChange={(e) => updateField('moq', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input
              type="number"
              value={product.sortOrder}
              onChange={(e) => updateField('sortOrder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.isActive}
              onChange={(e) => updateField('isActive', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">上架</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.isFeatured}
              onChange={(e) => updateField('isFeatured', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">推荐</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.isCustomizable}
              onChange={(e) => updateField('isCustomizable', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">可定制</span>
          </label>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">图片</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">主图 URL</label>
            <input
              type="text"
              value={product.mainImage}
              onChange={(e) => updateField('mainImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">图纸 URL</label>
            <input
              type="text"
              value={product.drawing}
              onChange={(e) => updateField('drawing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">图库图片（每行一个URL）</label>
          <textarea
            value={product.images}
            onChange={(e) => updateField('images', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
            placeholder="https://...\nhttps://..."
          />
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">规格参数（JSON）</h2>
        <textarea
          value={product.specifications}
          onChange={(e) => updateField('specifications', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32 font-mono text-sm"
          placeholder='{"Key": "Value", ...}'
        />
      </section>

      {/* Multilingual Content */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">多语言内容</h2>
        <Tabs defaultValue="En">
          <TabsList className="mb-4">
            {locales.map((loc) => (
              <TabsTrigger key={loc.key} value={loc.key}>{loc.label}</TabsTrigger>
            ))}
          </TabsList>
          {locales.map((loc) => (
            <TabsContent key={loc.key} value={loc.key} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  名称 {loc.key === 'En' && '*'}
                </label>
                <input
                  type="text"
                  value={(product as any)[`name${loc.key}`]}
                  onChange={(e) => updateField(`name${loc.key}` as keyof Product, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required={loc.key === 'En'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">短描述</label>
                <input
                  type="text"
                  value={(product as any)[`shortDesc${loc.key}`]}
                  onChange={(e) => updateField(`shortDesc${loc.key}` as keyof Product, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">详细描述</label>
                <textarea
                  value={(product as any)[`description${loc.key}`]}
                  onChange={(e) => updateField(`description${loc.key}` as keyof Product, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO 标题</label>
                <input
                  type="text"
                  value={(product as any)[`metaTitle${loc.key}`]}
                  onChange={(e) => updateField(`metaTitle${loc.key}` as keyof Product, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO 描述</label>
                <textarea
                  value={(product as any)[`metaDesc${loc.key}`]}
                  onChange={(e) => updateField(`metaDesc${loc.key}` as keyof Product, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-20"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? '保存中...' : isEdit ? '更新产品' : '创建产品'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          取消
        </button>
      </div>
    </form>
  )
}
