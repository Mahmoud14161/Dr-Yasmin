export interface Program {
  id: string;
  title: string;
  category: 'obesity' | 'underweight' | 'clinical' | 'online';
  categoryLabel: string;
  tagline: string;
  duration: string;
  features: string[];
  recommendedFor: string;
  highlight?: boolean;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  goal: string;
  weightLoss: string;
  duration: string;
  medicalImprovement: string;
  story: string;
  rating: number;
}

export interface MealOption {
  time: string;
  title: string;
  description: string;
  calories: string;
  swaps: string[];
}

export interface NutritionTip {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
}

export const DOCTOR_INFO = {
  name: 'د. ياسمين عصام المناوي',
  title: 'أخصائية التغذية العلاجية وعلاج السمنة والنحافة',
  englishTitle: 'Dr. Yasmin Esam Elminawy · Clinical Nutritionist',
  experienceYears: 8,
  successfulCasesCount: '+4,500',
  satisfactionRate: '98%',
  consultationsCount: '+12,000',
  whatsappNumber: '201065176720',
  secondaryPhone: '+20 12 2434 7438',
  phoneDisplay: '01065176720',
  email: 'yassminelmenawy@gmail.com',
  clinicAddresses: [
    {
      city: 'المنصورة - عيادة عدن',
      details: 'مركز تجميل د. أحمد الشريفة',
      days: 'يوم الثلاثاء (من 6:00 م إلى 9:00 م)',
    },
    {
      city: 'المنصورة - عيادة جيهان',
      details: 'عيادة د. محمد عنان لجراحات السمنة',
      days: 'يوم الأحد (من 4:00 م إلى 7:00 م)',
    },
    {
      city: 'فرع سلامون',
      details: 'عيادة سلامون - الدقهلية',
      days: 'يوم الأربعاء (من 4:00 م إلى 11:00 م)',
    },
    {
      city: 'استشارات أونلاين (VIP)',
      details: 'متابعة أسبوعية عبر زووم وواتساب لجميع المحافظات والمغتربين خارج مصر',
      days: 'طوال أيام الأسبوع بمواعيد حجز مسبقة',
    },
  ],
  credentials: [
    'ماجستير الكيمياء الحيوية - كلية الصيدلة، جامعة الأزهر (2024)',
    'دبلوم التغذية الإكلينيكية والعلاجية - جامعة المنصورة (2019)',
    'بكالوريوس الصيدلة - جامعة الأزهر (ممتاز مع مرتبة الشرف)',
    'أخصائية تغذية جراحات السمنة والتكميم وتغذية الرياضيين'
  ],
  philosophy: 'فهم كيمياء الجسم الحيوية لإعادة التوازن الأيضي والهرموني وتحقيق رشاقة دائمة بدون حرمان.'
};

export const CLINICAL_PROGRAMS: Program[] = [
  {
    id: 'obesity-intensive',
    title: 'برنامج الرشاقة ونحت القوام',
    category: 'obesity',
    categoryLabel: 'علاج السمنة وتنسيق القوام',
    tagline: 'خسارة دهون صافية مع الحفاظ على العضلات ومنع الترهلات',
    duration: '3 أشهر',
    highlight: true,
    recommendedFor: 'لمن يعانون من زيادة الوزن أو السمنة الموضعية.',
    features: [
      'فحص شامل للدهون والعضلات ومعدل الحرق (InBody)',
      'نظام غذائي مرن ومتجدد مع جدول بدائل ذكية',
      'متابعة أسبوعية مباشرة مع د. ياسمين وعبر واتساب',
      'خطة تثبيت وزن نهائية لمنع عودة الوزن'
    ]
  },
  {
    id: 'insulin-resistance',
    title: 'برنامج مقاومة الإنسولين والسكر',
    category: 'clinical',
    categoryLabel: 'تغذية علاجية',
    tagline: 'تحسين حساسية الإنسولين وخفض التراكمي وعلاج تكيس المبايض',
    duration: '3 - 6 أشهر',
    recommendedFor: 'لمقاومة الإنسولين، السكري، تكيس المبايض، والكبد الدهني.',
    features: [
      'تقييم ومتابعة التحاليل الطبية (HOMA-IR والسكر التراكمي)',
      'نظام غذائي متوازن يضبط سكر الدم والهرمونات',
      'التحكم في الجوع والشبع والشفاء من شراهة السكريات',
      'متابعة دورية لمحيط الخصر والدهون الحشوية'
    ]
  },
  {
    id: 'healthy-bulking',
    title: 'برنامج علاج النحافة الصحية',
    category: 'underweight',
    categoryLabel: 'علاج النحافة',
    tagline: 'زيادة صحية للوزن والكتلة العضلية وفتح الشهية',
    duration: '3 أشهر',
    recommendedFor: 'لمن يعانون من النحافة، فقدان الشهية، أو صعوبة زيادة الوزن.',
    features: [
      'تشخيص أسباب النحافة وفحص الغدة والامتصاص',
      'وجبات وسناكس عالية القيمة الغذائية بدون إثقال المعدة',
      'مشروبات طبيعية معززة للطاقة والبروتين',
      'بناء كتلة عضلية متناسقة وعلاج الأنيميا والإجهاد'
    ]
  },
  {
    id: 'maternal-kids',
    title: 'تغذية الحوامل والمرضعات والأطفال',
    category: 'clinical',
    categoryLabel: 'صحة الأم والطفل',
    tagline: 'رعاية غذائية آمنة للأم ونمو صحي سليم للطفل',
    duration: 'حسب المرحلة',
    recommendedFor: 'للحوامل، المرضعات، وتغذية الأطفال.',
    features: [
      'تغطية احتياجات الحديد والكالسيوم والفيتامينات بأمان',
      'ضبط وزن الحمل وعلاج سكر الحمل',
      'تغذية مدرة للحليب الطبيعي للمرضعات',
      'متابعة منحنيات النمو الصحية للأطفال'
    ]
  },
  {
    id: 'online-vip',
    title: 'باقة المتابعة أونلاين VIP',
    category: 'online',
    categoryLabel: 'متابعة عن بُعد',
    tagline: 'استشارات متكاملة ومتابعة مباشرة أينما كنت حول العالم',
    duration: 'شهري / ربع سنوي',
    recommendedFor: 'للمغتربين خارج مصر والمقيمين بجميع المحافظات.',
    features: [
      'جلسة فيديو عبر زووم مع د. ياسمين لتقييم حالتك',
      'نظام غذائي مفصل حسب الأطعمة المتوفرة ببلدك',
      'تحديث دوري للنظام مع متابعة يومية عبر واتساب',
      'مواعيد مرنة تناسب فارق التوقيت الدولي'
    ]
  }
];

export const TRANSFORMATION_STORIES: TransformationStory[] = [
  {
    id: 'story-1',
    name: 'سارة م.',
    age: 29,
    goal: 'علاج مقاومة الإنسولين وخسارة الوزن',
    weightLoss: '-26 كجم',
    duration: '5 أشهر',
    medicalImprovement: 'انخفاض التراكمي من 6.4 إلى 5.2 وانتظام الهرمونات',
    story: 'نظام مريح جداً بدون حرمان، التحاليل أصبحت ممتازة وتغيرت مقاساتي بالكامل.',
    rating: 5
  },
  {
    id: 'story-2',
    name: 'م. كريم ع.',
    age: 41,
    goal: 'التخلص من السمنة ودهون البطن',
    weightLoss: '-31 كجم',
    duration: '6 أشهر',
    medicalImprovement: 'ضبط ضغط الدم والنزول من XXL إلى L بدون ترهلات',
    story: 'جدول ذكي ناسب طبيعة عملي المكتبي وسهل تطبيقه حتى خارج المنزل.',
    rating: 5
  },
  {
    id: 'story-3',
    name: 'نورهان ف.',
    age: 24,
    goal: 'علاج النحافة وبناء كتلة صحية',
    weightLoss: '+11 كجم',
    duration: '4 أشهر',
    medicalImprovement: 'ارتفاع الهيموجلوبين من 9.5 إلى 12.8 واستعادة النشاط',
    story: 'زاد وزني بشكل متناسق جداً وبشهية ممتازة وعادت لي طاقتي وثقتي بنفسي.',
    rating: 5
  },
  {
    id: 'story-4',
    name: 'د. طارق ح.',
    age: 36,
    goal: 'خسارة دهون وتغذية رياضية',
    weightLoss: '-18 كجم دهون',
    duration: '4 أشهر',
    medicalImprovement: 'انخفاض دهون الجسم من 28% إلى 14%',
    story: 'دكتورة ياسمين متمكنة علمياً لأقصى درجة، والنتائج كانت دقيقة وسريعة.',
    rating: 5
  }
];

export const DAILY_MEAL_PLAN: MealOption[] = [
  {
    time: '8:30 ص',
    title: 'الإفطار',
    description: '2 بيضة مسلوقة أو أومليت + 4 ملاعق جبن قريش بزيت الزيتون + نصف رغيف بلدي + خضار طازج.',
    calories: '400 سعرة',
    swaps: [
      '4 ملاعق فول بالليمون بدلاً من البيض',
      '4 ملاعق شوفان بالحليب بدلاً من الخبز'
    ]
  },
  {
    time: '12:00 م',
    title: 'سناك صباحي',
    description: 'ثمرة تفاح أخضر + 10 حبات لوز نيء + شاي أخضر بالنعناع.',
    calories: '150 سعرة',
    swaps: [
      'ثمرة كمثرى أو برتقالة بدلاً من التفاح',
      'ملعقة بذور شيا أو يقطين بدلاً من اللوز'
    ]
  },
  {
    time: '3:30 م',
    title: 'الغداء',
    description: 'سمك مشوي أو صدر دجاج (180 جم) + طبق سلطة خضراء + خضار سوتيه + 5 ملاعق أرز بني.',
    calories: '550 سعرة',
    swaps: [
      'لحم مشوي أو تونة مصفاة بدلاً من الدجاج',
      'بطاطا مشوية أو 5 ملاعق مكرونة قمح كامل بدلاً من الأرز'
    ]
  },
  {
    time: '6:30 م',
    title: 'سناك مسائي',
    description: 'كوب زبادي يوناني + ملعقة بذور شيا ورشة قرفة.',
    calories: '130 سعرة',
    swaps: [
      'مكعب شوكولاتة داكنة 85% + قهوة بدون سكر'
    ]
  },
  {
    time: '9:00 م',
    title: 'العشاء',
    description: 'جبن قريش بالنعناع والخيار + بيضة مسلوقة أو زبادي لايت + شريحة توست بني.',
    calories: '280 سعرة',
    swaps: [
      'شوربة خضار دافئة بدلاً من الجبن'
    ]
  }
];

export const NUTRITION_TIPS: NutritionTip[] = [
  {
    id: 'tip-1',
    title: 'كيف تكسر ثبات الوزن علمياً؟',
    readTime: 'دقيقتان',
    summary: 'استراتيجيات طبية سريعة لإعادة تنشيط الحرق.',
    keyPoints: [
      'إعادة حساب السعرات حسب الوزن الجديد.',
      'يوم وجبة مفتوحة محسوبة لرفع هرمون الحرق.',
      'شرب 3 لترات ماء والنوم 7-8 ساعات.'
    ]
  },
  {
    id: 'tip-2',
    title: 'التغلب على مقاومة الإنسولين',
    readTime: 'دقيقتان',
    summary: 'خطوات بسيطة لضبط سكر الدم وإنقاص دهون البطن.',
    keyPoints: [
      'ابدأ الوجبة بالسلطة ثم البروتين ثم النشويات.',
      'المشي 20 دقيقة بعد الوجبة الرئيسية.',
      'استبدال السكريات البسيطة بالحبوب الكاملة.'
    ]
  }
];

