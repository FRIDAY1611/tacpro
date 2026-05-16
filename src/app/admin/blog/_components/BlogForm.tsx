'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface BlogPost {
  id?: string
  slug: string
  isPublished: boolean
  publishedAt: string
  coverImage: string
  category: string
  titleEn: string
  titleZh: string
  titleEs: string
  titleFr: string
  titleAr: string
  titleRu: string
  excerptEn: string
  excerptZh: string
  excerptEs: string
  excerptFr: string
  excerptAr: string
  excerptRu: string
  contentEn: string
  contentZh: string
  contentEs: string
  contentFr: string
  contentAr: string
  contentRu: string
}

const emptyPost: BlogPost = {
  slug: '',
  isPublished: false,
  publishedAt: '',
  coverImage: '',
  category: '',
  titleEn: '',
  titleZh: '',
  titleEs: '',
  titleFr: '',
  titleAr: '',
  titleRu: '',
  excerptEn: '',
  excerptZh: '',
  excerptEs: '',
  excerptFr: '',
  excerptAr: '',
  excerptRu: '',
  contentEn: '',
  contentZh: '',
  contentEs: '',
  contentFr: '',
  contentAr: '',
  contentRu: '',
}

const locales = [
  { key: 'En', label: 'EN' },
  { key: 'Zh', label: '中文' },
  { key: 'Es', label: 'ES' },
  { key: 'Fr', label: 'FR' },
  { key: 'Ar', label: 'AR' },
  { key: 'Ru', label: 'RU' },
]

export default function BlogForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost>(initial || emptyPost)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = !!initial?.id

  function updateField(field: keyof BlogPost, value: string | boolean) {
    setPost((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = { ...post }

      const url = isEdit
        ? `/admin/api/blog/${initial.id}`
        : '/admin/api/blog'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to save blog post')
        return
      }

      router.push('/admin/blog')
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
        <h2 className="text-xl font-semibold mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={post.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input
              type="text"
              value={post.coverImage}
              onChange={(e) => updateField('coverImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Published At</label>
            <input
              type="date"
              value={post.publishedAt}
              onChange={(e) => updateField('publishedAt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            checked={post.isPublished}
            onChange={(e) => updateField('isPublished', e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">Published</span>
        </label>
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
                  标题 {loc.key === 'En' && '*'}
                </label>
                <input
                  type="text"
                  value={(post as any)[`title${loc.key}`]}
                  onChange={(e) => updateField(`title${loc.key}` as keyof BlogPost, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required={loc.key === 'En'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea
                  value={(post as any)[`excerpt${loc.key}`]}
                  onChange={(e) => updateField(`excerpt${loc.key}` as keyof BlogPost, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">正文</label>
                <textarea
                  value={(post as any)[`content${loc.key}`]}
                  onChange={(e) => updateField(`content${loc.key}` as keyof BlogPost, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-64"
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
          {loading ? '保存中...' : isEdit ? '更新文章' : '创建文章'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          取消
        </button>
      </div>
    </form>
  )
}
