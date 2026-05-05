const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'tactical-boots' },
      update: {},
      create: {
        slug: 'tactical-boots',
        nameEn: 'Tactical Boots',
        nameZh: '军靴',
        descriptionEn: 'Professional tactical boots for military and security personnel',
        descriptionZh: '专为军事和安保人员设计的专业军靴',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tactical-backpacks' },
      update: {},
      create: {
        slug: 'tactical-backpacks',
        nameEn: 'Tactical Backpacks',
        nameZh: '军用背包',
        descriptionEn: 'Durable tactical backpacks for various missions',
        descriptionZh: '适用于各种任务的耐用军用背包',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'security-equipment' },
      update: {},
      create: {
        slug: 'security-equipment',
        nameEn: 'Security Equipment',
        nameZh: '安保装备',
        descriptionEn: 'Professional security equipment and gear',
        descriptionZh: '专业安保设备和装备',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'rescue-equipment' },
      update: {},
      create: {
        slug: 'rescue-equipment',
        nameEn: 'Rescue Equipment',
        nameZh: '救援设备',
        descriptionEn: 'Emergency rescue equipment and supplies',
        descriptionZh: '紧急救援设备和物资',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'personal-protection' },
      update: {},
      create: {
        slug: 'personal-protection',
        nameEn: 'Personal Protection',
        nameZh: '个人防护',
        descriptionEn: 'Personal protective equipment for professionals',
        descriptionZh: '专业个人防护装备',
        sortOrder: 5,
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  const products = [
    {
      slug: 'tactical-boot-01',
      sku: 'TB-001',
      nameEn: 'Desert Tactical Boot Pro',
      nameZh: '沙漠作战靴 Pro',
      descriptionEn: 'Professional desert tactical boot designed for harsh environments. Features breathable mesh lining, reinforced toe cap, and anti-slip outsole. Perfect for military operations in desert and arid regions.',
      descriptionZh: '专为恶劣环境设计的专业沙漠作战靴。采用透气网眼内衬、加固鞋头和防滑大底。非常适合沙漠和干旱地区的军事行动。',
      shortDescEn: 'Premium desert tactical boot with breathable design',
      shortDescZh: '透气设计的优质沙漠作战靴',
      categoryId: categories[0].id,
      isFeatured: true,
      moq: 100,
      specifications: JSON.stringify({
        'Upper Material': 'Full-grain leather & Cordura',
        'Sole': 'Rubber anti-slip',
        'Lining': 'Breathable mesh',
        'Weight': '1.2 kg/pair',
        'Sizes': '36-46',
      }),
    },
    {
      slug: 'tactical-boot-02',
      sku: 'TB-002',
      nameEn: 'Jungle Combat Boot',
      nameZh: '丛林作战靴',
      descriptionEn: 'Lightweight jungle combat boot with quick-dry technology. Features drainage vents and anti-bacterial treatment for tropical environments.',
      descriptionZh: '采用快干技术的轻量化丛林作战靴。配备排水孔和抗菌处理，适合热带环境。',
      shortDescEn: 'Lightweight jungle boot with drainage system',
      shortDescZh: '带排水系统的轻量化丛林靴',
      categoryId: categories[0].id,
      isFeatured: true,
      moq: 100,
      specifications: JSON.stringify({
        'Upper Material': 'Synthetic leather & nylon',
        'Sole': 'Vibram rubber',
        'Lining': 'Moisture-wicking',
        'Weight': '0.9 kg/pair',
        'Sizes': '36-46',
      }),
    },
    {
      slug: 'tactical-backpack-01',
      sku: 'BK-001',
      nameEn: 'Military Assault Pack 35L',
      nameZh: '军用突击背包 35L',
      descriptionEn: 'Tactical assault backpack with MOLLE system. Features multiple compartments, hydration bladder pocket, and padded shoulder straps.',
      descriptionZh: '带MOLLE系统的战术突击背包。配备多个隔层、水袋仓和加厚肩带。',
      shortDescEn: '35L tactical backpack with MOLLE system',
      shortDescZh: '带MOLLE系统的35L战术背包',
      categoryId: categories[1].id,
      isFeatured: true,
      moq: 50,
      specifications: JSON.stringify({
        'Capacity': '35L',
        'Material': '1000D Cordura nylon',
        'Weight': '1.4 kg',
        'Dimensions': '50 x 30 x 20 cm',
        'Colors': 'Black, OD Green, Camo',
      }),
    },
    {
      slug: 'tactical-backpack-02',
      sku: 'BK-002',
      nameEn: '3-Day Patrol Pack 45L',
      nameZh: '三日巡逻背包 45L',
      descriptionEn: 'Large capacity patrol pack for extended missions. Features internal frame, compression straps, and rain cover.',
      descriptionZh: '大容量巡逻背包，适合长时间任务。配备内骨架、压缩带和防雨罩。',
      shortDescEn: '45L patrol pack for extended missions',
      shortDescZh: '适合长时间任务的45L巡逻背包',
      categoryId: categories[1].id,
      isFeatured: true,
      moq: 50,
      specifications: JSON.stringify({
        'Capacity': '45L',
        'Material': '900D polyester',
        'Weight': '1.8 kg',
        'Dimensions': '55 x 35 x 25 cm',
        'Colors': 'Black, Coyote Brown',
      }),
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log(`Created ${products.length} products`)

  const certificates = [
    {
      slug: 'iso-9001',
      nameEn: 'ISO 9001:2015',
      nameZh: 'ISO 9001:2015',
      issuer: 'SGS',
      descriptionEn: 'Quality Management System Certification',
      descriptionZh: 'Quality Management System Certification',
    },
    {
      slug: 'iso-14001',
      nameEn: 'ISO 14001:2015',
      nameZh: 'ISO 14001:2015',
      issuer: 'SGS',
      descriptionEn: 'Environmental Management System Certification',
      descriptionZh: 'Environmental Management System Certification',
    },
    {
      slug: 'ce-certification',
      nameEn: 'CE Certification',
      nameZh: 'CE Certification',
      issuer: 'TUV',
      descriptionEn: 'European Conformity Certification',
      descriptionZh: 'European Conformity Certification',
    },
  ]

  for (const cert of certificates) {
    await prisma.certificate.upsert({
      where: { slug: cert.slug },
      update: cert,
      create: cert,
    })
  }

  console.log(`Created ${certificates.length} certificates`)
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
