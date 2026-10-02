'use client'
import { useState } from 'react'

const categories = ['All', 'Digital Marketing', 'Web Design', 'Web Development', 'SEO', 'Local SEO', 'Branding', 'AI & Automation', 'Business Growth', 'Technology', 'Case Studies', 'Industry Insights']

export default function BlogCategoryFilter() {
  const [active, setActive] = useState('All')
  return (
    <div className="categories-bar">
      {categories.map((cat) => (
        <button key={cat} className={`category-pill${cat === active ? ' active' : ''}`} onClick={() => setActive(cat)}>
          {cat}
        </button>
      ))}
    </div>
  )
}
