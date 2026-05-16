'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id?: string
  slug: string
  sortOrder: number
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
}

const emptyCategory: Category = {
  slug: '',
  sortOrder: 0,
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
}

const locales = [
  { key: 'En', label: 'EN' },
  { key: 'Zh', label: '中文' },
  { key: 'Es', label: 'ES' },
  { key: 'Fr', label: 'FR' },
  { key: 'Ar', label: 'AR' },
  { key: 'Ru', label: 'RU' },
]

export default function CategoryForm({ initial }: { initial?: Category }) {
  const router = useRouter()
  const [category, setCategory] = useState<Category>(initial || emptyCategory)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = !!initial?.id

  function updateField(field: keyof Category, value: string | number) {
    setCategory((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...category,
        sortOrder: Number(category.sortOrder) || 0,
      }

      const url = isEdit
        ? `/admin/api/categories/${initial.id}`
        : '/admin/api/categories'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || '保存失败')
        return
      }

      router.push('/admin/categories')
      router.refresh()
    } catch {
      setError('网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
      )}

      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL标识 *</label>
            <input
              type="text"
              value={category.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input
              type="number"
              value={category.sortOrder}
              onChange={(e) => updateField('sortOrder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">多语言名称与描述</h2>
        <div className="space-y-6">
          {locales.map((loc) => (
            <div key={loc.key} className="border-b border-gray-100 pb-4 last:border-0">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{loc.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    名称 {loc.key === 'En' && '*'}
                  </label>
                  <input
                    type="text"
                    value={(category as any)[`name${loc.key}`]}
                    onChange={(e) => updateField(`name${loc.key}` as keyof Category, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={loc.key === 'En'}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">描述</label>
                  <input
                    type="text"
                    value={(category as any)[`description${loc.key}`]}
                    onChange={(e) => updateField(`description${loc.key}` as keyof Category, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? '保存中...' : isEdit ? '更新分类' : '创建分类'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/categories')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          取消
        </button>
      </div>
    </form>
  )
}
