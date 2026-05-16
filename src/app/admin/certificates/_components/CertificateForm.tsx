'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Certificate {
  id?: string
  slug: string
  sortOrder: number
  nameEn: string
  nameZh: string
  issuer: string
  issueDate: string
  expiryDate: string
  image: string
  descriptionEn: string
  descriptionZh: string
}

const emptyCert: Certificate = {
  slug: '',
  sortOrder: 0,
  nameEn: '',
  nameZh: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  image: '',
  descriptionEn: '',
  descriptionZh: '',
}

export default function CertificateForm({ initial }: { initial?: Certificate }) {
  const router = useRouter()
  const [cert, setCert] = useState<Certificate>(initial || emptyCert)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = !!initial?.id

  function updateField(field: keyof Certificate, value: string | number) {
    setCert((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...cert,
        sortOrder: Number(cert.sortOrder) || 0,
      }

      const url = isEdit
        ? `/admin/api/certificates/${initial.id}`
        : '/admin/api/certificates'
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

      router.push('/admin/certificates')
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
              value={cert.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input
              type="number"
              value={cert.sortOrder}
              onChange={(e) => updateField('sortOrder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名称（英文）*</label>
            <input
              type="text"
              value={cert.nameEn}
              onChange={(e) => updateField('nameEn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名称（中文）</label>
            <input
              type="text"
              value={cert.nameZh}
              onChange={(e) => updateField('nameZh', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">颁发机构</label>
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => updateField('issuer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">图片 URL</label>
            <input
              type="text"
              value={cert.image}
              onChange={(e) => updateField('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">颁发日期</label>
            <input
              type="date"
              value={cert.issueDate}
              onChange={(e) => updateField('issueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">到期日期</label>
            <input
              type="date"
              value={cert.expiryDate}
              onChange={(e) => updateField('expiryDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述（英文）</label>
            <textarea
              value={cert.descriptionEn}
              onChange={(e) => updateField('descriptionEn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述（中文）</label>
            <textarea
              value={cert.descriptionZh}
              onChange={(e) => updateField('descriptionZh', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
            />
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? '保存中...' : isEdit ? '更新证书' : '创建证书'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/certificates')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          取消
        </button>
      </div>
    </form>
  )
}
