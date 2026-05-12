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
        nameEs: 'Botas Tácticas',
        nameFr: 'Bottes Tactiques',
        nameAr: 'أحذية تكتيكية',
        nameRu: 'Тактические Ботинки',
        descriptionEn: 'Professional tactical boots for military and security personnel',
        descriptionZh: '专为军事和安保人员设计的专业军靴',
        descriptionEs: 'Botas tácticas profesionales para personal militar y de seguridad',
        descriptionFr: 'Bottes tactiques professionnelles pour personnel militaire et de sécurité',
        descriptionAr: 'أحذية تكتيكية احترافية للعسكريين وقوات الأمن',
        descriptionRu: 'Профессиональные тактические ботинки для военных и сотрудников служб безопасности',
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
        nameEs: 'Mochilas Tácticas',
        nameFr: 'Sacs à Dos Tactiques',
        nameAr: 'حقائب ظهر تكتيكية',
        nameRu: 'Тактические Рюкзаки',
        descriptionEn: 'Durable tactical backpacks for various missions',
        descriptionZh: '适用于各种任务的耐用军用背包',
        descriptionEs: 'Mochilas tácticas duraderas para diversas misiones',
        descriptionFr: 'Sacs à dos tactiques durables pour diverses missions',
        descriptionAr: 'حقائب ظهر تكتيكية متينة لمختلف المهام',
        descriptionRu: 'Прочные тактические рюкзаки для различных миссий',
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
        nameEs: 'Equipo de Seguridad',
        nameFr: 'Équipement de Sécurité',
        nameAr: 'معدات أمنية',
        nameRu: 'Охранное Оборудование',
        descriptionEn: 'Professional security equipment and gear',
        descriptionZh: '专业安保设备和装备',
        descriptionEs: 'Equipo y material de seguridad profesional',
        descriptionFr: 'Équipement et matériel de sécurité professionnels',
        descriptionAr: 'معدات وعتاد أمني احترافي',
        descriptionRu: 'Профессиональное охранное оборудование и снаряжение',
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
        nameEs: 'Equipo de Rescate',
        nameFr: 'Équipement de Secours',
        nameAr: 'معدات إنقاذ',
        nameRu: 'Спасательное Оборудование',
        descriptionEn: 'Emergency rescue equipment and supplies',
        descriptionZh: '紧急救援设备和物资',
        descriptionEs: 'Equipo y suministros de rescate de emergencia',
        descriptionFr: "Équipement et fournitures de secours d'urgence",
        descriptionAr: 'معدات وإمدادات إنقاذ طارئة',
        descriptionRu: 'Аварийно-спасательное оборудование и материалы',
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
        nameEs: 'Protección Personal',
        nameFr: 'Protection Individuelle',
        nameAr: 'حماية شخصية',
        nameRu: 'Средства Индивидуальной Защиты',
        descriptionEn: 'Personal protective equipment for professionals',
        descriptionZh: '专业个人防护装备',
        descriptionEs: 'Equipo de protección personal para profesionales',
        descriptionFr: 'Équipement de protection individuelle pour professionnels',
        descriptionAr: 'معدات حماية شخصية للمحترفين',
        descriptionRu: 'Средства индивидуальной защиты для профессионалов',
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
      nameEs: 'Bota Táctica del Desierto Pro',
      nameFr: 'Botte Tactique du Désert Pro',
      nameAr: 'حذاء تكتيكي صحراوي برو',
      nameRu: 'Пустынные Тактические Ботинки Pro',
      descriptionEn: 'Professional desert tactical boot designed for harsh environments. Features breathable mesh lining, reinforced toe cap, and anti-slip outsole. Perfect for military operations in desert and arid regions.',
      descriptionZh: '专为恶劣环境设计的专业沙漠作战靴。采用透气网眼内衬、加固鞋头和防滑大底。非常适合沙漠和干旱地区的军事行动。',
      descriptionEs: 'Bota táctica del desierto profesional diseñada para entornos hostiles. Cuenta con forro de malla transpirable, puntera reforzada y suela antideslizante. Perfecta para operaciones militares en regiones desérticas y áridas.',
      descriptionFr: "Bottes tactiques du désert professionnelles conçues pour les environnements hostiles. Dotées d'une doublure en mesh respirant, d'un embout renforcé et d'une semelle antidérapante. Parfaites pour les opérations militaires dans les régions désertiques et arides.",
      descriptionAr: 'حذاء تكتيكي صحراوي احترافي مصمم للبيئات القاسية. يتميز ببطانة شبكية متنفسة و toe cap مقوى ونعل مانع للانزلاق. مثالي للعمليات العسكرية في المناطق الصحراوية والجافة.',
      descriptionRu: 'Профессиональные пустынные тактические ботинки, разработанные для суровых условий. Оснащены дышащей сетчатой подкладкой, усиленным защитным носком и нескользящей подошвой. Идеальны для военных операций в пустынных и засушливых регионах.',
      shortDescEn: 'Premium desert tactical boot with breathable design',
      shortDescZh: '透气设计的优质沙漠作战靴',
      shortDescEs: 'Bota táctica del desierto premium con diseño transpirable',
      shortDescFr: 'Bottes tactiques du désert premium avec design respirant',
      shortDescAr: 'حذاء تكتيكي صحراوي متميز بتصميم متنفس',
      shortDescRu: 'Премиальные пустынные тактические ботинки с дышащим дизайном',
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
      nameEs: 'Bota de Combate para Jungla',
      nameFr: 'Botte de Combat Jungle',
      nameAr: 'حذاء قتال للأدغال',
      nameRu: 'Джунглиевые Боевые Ботинки',
      descriptionEn: 'Lightweight jungle combat boot with quick-dry technology. Features drainage vents and anti-bacterial treatment for tropical environments.',
      descriptionZh: '采用快干技术的轻量化丛林作战靴。配备排水孔和抗菌处理，适合热带环境。',
      descriptionEs: 'Bota de combate para jungla ligera con tecnología de secado rápido. Cuenta con orificios de drenaje y tratamiento antibacteriano para entornos tropicales.',
      descriptionFr: 'Bottes de combat jungle légères avec technologie de séchage rapide. Dotées de ventilations de drainage et d’un traitement antibactérien pour les environnements tropicaux.',
      descriptionAr: 'حذاء قتال للأدغال خفيف الوزن بتقنية التجفيف السريع. يتميز بفتحات تصريف ومعالجة مضادة للبكتيريا للبيئات الاستوائية.',
      descriptionRu: 'Легкие джунглиевые боевые ботинки с технологией быстрого высыхания. Оснащены дренажными отверстиями и антибактериальной обработкой для тропических условий.',
      shortDescEn: 'Lightweight jungle boot with drainage system',
      shortDescZh: '带排水系统的轻量化丛林靴',
      shortDescEs: 'Bota de jungla ligera con sistema de drenaje',
      shortDescFr: 'Bottes jungle légères avec système de drainage',
      shortDescAr: 'حذاء أدغال خفيف الوزن بنظام تصريف',
      shortDescRu: 'Легкие джунглиевые ботинки с дренажной системой',
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
      nameEs: 'Mochila de Asalto Militar 35L',
      nameFr: 'Sac d\'Assaut Militaire 35L',
      nameAr: 'حقيبة هجوم عسكرية 35 لتر',
      nameRu: 'Военный Штурмовой Рюкзак 35L',
      descriptionEn: 'Tactical assault backpack with MOLLE system. Features multiple compartments, hydration bladder pocket, and padded shoulder straps.',
      descriptionZh: '带MOLLE系统的战术突击背包。配备多个隔层、水袋仓和加厚肩带。',
      descriptionEs: 'Mochila de asalto táctica con sistema MOLLE. Cuenta con múltiples compartimentos, bolsillo para vejiga de hidratación y correas acolchadas para los hombros.',
      descriptionFr: "Sac d'assaut tactique avec système MOLLE. Doté de plusieurs compartiments, d'une poche pour poche à eau et de bretelles rembourrées.",
      descriptionAr: 'حقيبة هجوم تكتيكية بنظام MOLLE. تتميز بعدة أقسام وجيب لحوض الترطيب و أحزمة كتف مبطنة.',
      descriptionRu: 'Тактический штурмовой рюкзак с системой MOLLE. Оснащен несколькими отделениями, карманом для гидратора и мягкими лямками.',
      shortDescEn: '35L tactical backpack with MOLLE system',
      shortDescZh: '带MOLLE系统的35L战术背包',
      shortDescEs: 'Mochila táctica 35L con sistema MOLLE',
      shortDescFr: 'Sac à dos tactique 35L avec système MOLLE',
      shortDescAr: 'حقيبة ظهر تكتيكية 35 لتر بنظام MOLLE',
      shortDescRu: 'Тактический рюкзак 35L с системой MOLLE',
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
      nameEs: 'Mochila de Patrulla de 3 Días 45L',
      nameFr: 'Sac de Patrouille 3 Jours 45L',
      nameAr: 'حقيبة دورية لمدة 3 أيام 45 لتر',
      nameRu: 'Патрульный Рюкзак на 3 Дня 45L',
      descriptionEn: 'Large capacity patrol pack for extended missions. Features internal frame, compression straps, and rain cover.',
      descriptionZh: '大容量巡逻背包，适合长时间任务。配备内骨架、压缩带和防雨罩。',
      descriptionEs: 'Mochila de patrulla de gran capacidad para misiones prolongadas. Cuenta con armazón interno, correas de compresión y cubierta para lluvia.',
      descriptionFr: 'Sac de patrouille grande capacité pour missions prolongées. Doté d\'un cadre interne, de sangles de compression et d\'une housse de pluie.',
      descriptionAr: 'حقيبة دورية سعة كبيرة للمهام الممتدة. تتميز بهيكل داخلي وأحزمة ضغط وغطاء للمطر.',
      descriptionRu: 'Большой патрульный рюкзак для длительных миссий. Оснащен внутренним каркасом, стягивающими ремнями и дождевым чехлом.',
      shortDescEn: '45L patrol pack for extended missions',
      shortDescZh: '适合长时间任务的45L巡逻背包',
      shortDescEs: 'Mochila de patrulla 45L para misiones prolongadas',
      shortDescFr: 'Sac de patrouille 45L pour missions prolongées',
      shortDescAr: 'حقيبة دورية 45 لتر للمهام الممتدة',
      shortDescRu: 'Патрульный рюкзак 45L для длительных миссий',
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

  const blogPosts = [
    {
      slug: 'tactical-vest-material-guide',
      isPublished: true,
      publishedAt: new Date('2026-04-15'),
      category: 'Material Tech',
      titleEn: 'Tactical Vest Fabric Guide: Cordura vs Nylon vs Polyester',
      titleZh: '战术背心面料选择指南：Cordura vs 尼龙 vs 涤纶',
      titleEs: 'Guía de Telas para Chalecos Tácticos: Cordura vs Nylon vs Poliéster',
      titleFr: 'Guide des Tissus pour Gilets Tactiques : Cordura vs Nylon vs Polyester',
      titleAr: 'دليل أقمشة السترات التكتيكية: كوردورا vs نايلون vs بوليستر',
      titleRu: 'Руководство по Тканям для Тактических Жилетов: Cordura vs Нейлон vs Полиэстер',
      excerptEn: 'An in-depth comparison of abrasion resistance, weight, and cost across three mainstream tactical vest fabrics to help buyers make the best choice.',
      excerptZh: '深入解析三种主流战术背心面料的耐磨性、重量、成本差异，帮助采购人员做出最优选择。',
      excerptEs: 'Una comparación en profundidad de la resistencia a la abrasión, el peso y el costo de tres telas principales para chalecos tácticos para ayudar a los compradores a tomar la mejor decisión.',
      excerptFr: 'Une comparaison approfondie de la résistance à l\'abrasion, du poids et du coût de trois tissus principaux pour gilets tactiques pour aider les acheteurs à faire le meilleur choix.',
      excerptAr: 'مقارنة معمقة لمقاومة التآكل والوزن والتكلفة عبر ثلاثة أنواع رئيسية من أقمشة السترات التكتيكية لمساعدة المشترين على اتخاذ أفضل قرار.',
      excerptRu: 'Углубленное сравнение стойкости к истиранию, веса и стоимости трех основных тканей для тактических жилетов, чтобы помочь покупателям сделать лучший выбор.',
      contentEn: 'Tactical vests are a critical piece of equipment for military, law enforcement, and security personnel. The choice of fabric directly impacts durability, comfort, and cost.\n\n**Cordura** is a high-performance fabric known for exceptional abrasion resistance and durability. It is ideal for heavy-duty tactical vests that must withstand harsh conditions.\n\n**Nylon** offers a good balance between strength and weight. It is commonly used in mid-range tactical gear and provides decent water resistance.\n\n**Polyester** is the most cost-effective option. While it is less durable than Cordura or nylon, it is suitable for training gear and budget-conscious procurement.',
      contentZh: '战术背心是军事、执法和安全人员的关键装备。面料的选择直接影响耐用性、舒适度和成本。\n\n**Cordura** 是一种高性能面料，以卓越的耐磨性和耐用性著称。它非常适合必须承受恶劣条件的重型战术背心。\n\n**尼龙** 在强度和重量之间取得了良好的平衡。它常用于中档战术装备，并提供适度的防水性能。\n\n**涤纶** 是最具成本效益的选择。虽然它的耐用性不如 Cordura 或尼龙，但它适用于训练装备和注重预算的采购。',
      contentEs: 'Los chalecos tácticos son una pieza crítica de equipo para personal militar, policial y de seguridad. La elección de la tela impacta directamente en la durabilidad, comodidad y costo.\n\n**Cordura** es una tela de alto rendimiento conocida por su excepcional resistencia a la abrasión y durabilidad. Es ideal para chalecos tácticos de servicio pesado que deben soportar condiciones adversas.\n\n**Nylon** ofrece un buen equilibrio entre resistencia y peso. Se usa comúnmente en equipo táctico de gama media y proporciona una decente resistencia al agua.\n\n**Poliéster** es la opción más económica. Aunque es menos duradero que Cordura o nylon, es adecuado para equipo de entrenamiento y adquisiciones con presupuesto limitado.',
      contentFr: 'Les gilets tactiques sont un équipement critique pour le personnel militaire, policier et de sécurité. Le choix du tissu impacte directement la durabilité, le confort et le coût.\n\n**Cordura** est un tissu haute performance reconnu pour sa résistance exceptionnelle à l\'abrasion et sa durabilité. Il est idéal pour les gilets tactiques heavy duty devant résister à des conditions difficiles.\n\n**Nylon** offre un bon équilibre entre résistance et poids. Il est couramment utilisé dans l\'équipement tactique milieu de gamme et offre une décente résistance à l\'eau.\n\n**Polyester** est l\'option la plus économique. Bien qu\'il soit moins durable que Cordura ou nylon, il convient à l\'équipement d\'entraînement et aux achats avec un budget limité.',
      contentAr: 'السترات التكتيكية هي جزء حاسم من المعدات للعسكريين وقوات الشرطة والأمن. اختيار القماش يؤثر مباشرة على المتانة والراحة والتكلفة.\n\n**كوردورا** هي قماش عالي الأداء معروف بمقاومته الاستثنائية للتآكل ومتانته. إنه مثالي للسترات التكتيكية الثقيلة التي يجب أن تتحمل ظروفاً قاسية.\n\n**النايلون** يوفر توازناً جيداً بين القوة والوزن. يُستخدم عادة في المعدات التكتيكية المتوسطة ويوفر مقاومة ماء جيدة.\n\n**البوليستر** هو الخيار الأكثر اقتصاداً. على الرغم من أنه أقل متانة من كوردورا أو النايلون، إلا أنه مناسب لمعدات التدريب والمشتريات ذات الميزانية المحدودة.',
      contentRu: 'Тактические жилеты являются критически важным снаряжением для военных, полицейских и сотрудников служб безопасности. Выбор ткани напрямую влияет на долговечность, комфорт и стоимость.\n\n**Cordura** — это высокопроизводительная ткань, известная исключительной стойкостью к истиранию и долговечностью. Идеально подходит для тактических жилетов тяжелого класса, которые должны выдерживать суровые условия.\n\n**Нейлон** обеспечивает хороший баланс между прочностью и весом. Обычно используется в тактическом снаряжении среднего класса и обеспечивает приличную водостойкость.\n\n**Полиэстер** — самый экономичный вариант. Хотя он менее долговечен, чем Cordura или нейлон, он подходит для учебного снаряжения и закупок с ограниченным бюджетом.',
    },
    {
      slug: 'ballistic-helmet-standards',
      isPublished: true,
      publishedAt: new Date('2026-03-28'),
      category: 'Industry Standards',
      titleEn: 'Understanding NIJ and EN Standards for Protective Helmets',
      titleZh: '防护头盔的NIJ与EN标准解读',
      titleEs: 'Comprendiendo las Normas NIJ y EN para Cascos Protectores',
      titleFr: 'Comprendre les Normes NIJ et EN pour Casques Protecteurs',
      titleAr: 'فهم معايير NIJ وEN للخوذات الواقية',
      titleRu: 'Понимание Стандартов NIJ и EN для Защитных Шлемов',
      excerptEn: 'Explaining the technical differences between NIJ IIIA and EN 397 standards, and certification requirements for exporting to European and North American markets.',
      excerptZh: '详解NIJ IIIA与EN 397标准的技术差异，以及出口欧洲与北美市场需要注意的认证要求。',
      excerptEs: 'Explicando las diferencias técnicas entre las normas NIJ IIIA y EN 397, y los requisitos de certificación para exportar a los mercados europeo y norteamericano.',
      excerptFr: 'Explication des différences techniques entre les normes NIJ IIIA et EN 397, et des exigences de certification pour l\'exportation vers les marchés européen et nord-américain.',
      excerptAr: 'شرح الاختلافات التقنية بين معايير NIJ IIIA وEN 397، ومتطلبات الشهادات للتصدير إلى الأسواق الأوروبية والأمريكية الشمالية.',
      excerptRu: 'Объяснение технических различий между стандартами NIJ IIIA и EN 397, а также требований к сертификации для экспорта на европейский и североамериканский рынки.',
      contentEn: 'When exporting protective helmets to Europe and North America, understanding the relevant ballistic standards is essential.\n\n**NIJ IIIA** is the standard used primarily in the United States. It requires helmets to stop .357 SIG and .44 Magnum rounds.\n\n**EN 397** is the European standard for industrial safety helmets. While it does not specifically test against ballistic threats, it covers impact absorption and penetration resistance.\n\nFor tactical helmets, many manufacturers seek dual certification to access both markets. Compliance testing must be performed by accredited laboratories such as TÜV or SGS.',
      contentZh: '向欧洲和北美出口防护头盔时，了解相关的防弹标准至关重要。\n\n**NIJ IIIA** 是美国主要使用的标准。它要求头盔能够阻挡 .357 SIG 和 .44 Magnum 子弹。\n\n**EN 397** 是欧洲工业安全头盔标准。虽然它不明确测试防弹威胁，但涵盖了冲击吸收和抗穿透性能。\n\n对于战术头盔，许多制造商寻求双重认证以进入两个市场。合规测试必须由 TÜV 或 SGS 等认证实验室进行。',
      contentEs: 'Al exportar cascos protectores a Europa y América del Norte, comprender las normas balísticas relevantes es esencial.\n\n**NIJ IIIA** es la norma utilizada principalmente en Estados Unidos. Requiere que los cascos detengan proyectiles .357 SIG y .44 Magnum.\n\n**EN 397** es la norma europea para cascos de seguridad industrial. Aunque no prueba específicamente contra amenazas balísticas, cubre la absorción de impactos y la resistencia a la penetración.\n\nPara cascos tácticos, muchos fabricantes buscan la doble certificación para acceder a ambos mercados. Las pruebas de cumplimiento deben realizarse en laboratorios acreditados como TÜV o SGS.',
      contentFr: 'Lors de l\'exportation de casques protecteurs vers l\'Europe et l\'Amérique du Nord, comprendre les normes balistiques pertinentes est essentiel.\n\n**NIJ IIIA** est la norme principalement utilisée aux États-Unis. Elle exige que les casques arrêtent les projectiles .357 SIG et .44 Magnum.\n\n**EN 397** est la norme européenne pour les casques de sécurité industriels. Bien qu\'elle ne teste pas spécifiquement contre les menaces balistiques, elle couvre l\'absorption des chocs et la résistance à la pénétration.\n\nPour les casques tactiques, de nombreux fabricants recherchent une double certification pour accéder aux deux marchés. Les tests de conformité doivent être effectués par des laboratoires accrédités tels que TÜV ou SGS.',
      contentAr: 'عند تصدير الخوذات الواقية إلى أوروبا وأمريكا الشمالية، فإن فهم معايير الحماية ذات الصلة أمر ضروري.\n\n**NIJ IIIA** هو المعيار المستخدم بشكل أساسي في الولايات المتحدة. يتطلب أن تمنع الخوذات رصاص .357 SIG و.44 Magnum.\n\n**EN 397** هو المعيار الأوروبي لخوذ السلامة الصناعية. على الرغم من أنه لا يختبر تحديداً ضد التهديدات الباليستية، إلا أنه يغطي امتصاص الصدمات ومقاومة الاختراق.\n\nبالنسبة للخوذ التكتيكية، يسعى العديد من المصنعين للحصول على شهادة مزدوجة للوصول إلى كلا السوقين. يجب إجراء اختبارات الامتثال في مختبرات معتمدة مثل TÜV أو SGS.',
      contentRu: 'При экспорте защитных шлемов в Европу и Северную Америку понимание соответствующих баллистических стандартов имеет решающее значение.\n\n**NIJ IIIA** — это стандарт, используемый в основном в Соединенных Штатах. Он требует, чтобы шлемы останавливали пули .357 SIG и .44 Magnum.\n\n**EN 397** — европейский стандарт для промышленных защитных шлемов. Хотя он специально не тестирует защиту от баллистических угроз, он охватывает поглощение удара и сопротивление проникновению.\n\nДля тактических шлемов многие производители стремятся получить двойную сертификацию для выхода на оба рынка. Испытания на соответствие должны проводиться в аккредитованных лабораториях, таких как TÜV или SGS.',
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }

  console.log(`Created ${blogPosts.length} blog posts`)
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
