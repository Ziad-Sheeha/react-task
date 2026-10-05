// الشكل اللي جاي من الـ API (الحقول اللي محتاجينها بس، هنظبطه على الـ JSON بتاعك)
export interface ApiUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: { name: string }
  address: { city: string }
}

// الشكل المسطّح اللي الجدول بيعرضه (نسخة جديدة، الأصل ما بيتعدلش)
export interface UserRow {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: string
  city: string
}
