"use client"

import React from 'react'
import {
  SlidersHorizontal,
  Info,
  Award,
  Star,
  Sparkles,
  HelpCircle,
  FilePenLine,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ContentSection {
  title: string
  description: string
  icon: LucideIcon
  manageLink: string
  itemsCount: number
  itemLabel: string
}

const sections: ContentSection[] = [
  {
    title: 'Hero Slider',
    description: 'Manage the main slides on the homepage banner.',
    icon: SlidersHorizontal,
    manageLink: '/admin/content/hero-slider',
    itemsCount: 3,
    itemLabel: 'Slides',
  },
  {
    title: 'Testimonials',
    description: 'Add, edit, or remove client testimonials.',
    icon: Star,
    manageLink: '/admin/content/testimonials',
    itemsCount: 6,
    itemLabel: 'Testimonials',
  },
  {
    title: 'Our Services',
    description: 'Manage the list of services offered on the website.',
    icon: Sparkles,
    manageLink: '/admin/content/services',
    itemsCount: 8,
    itemLabel: 'Services',
  },
  {
    title: 'FAQ Section',
    description: 'Update the Frequently Asked Questions and answers.',
    icon: HelpCircle,
    manageLink: '/admin/content/faq',
    itemsCount: 3,
    itemLabel: 'Q&A',
  },
  {
    title: 'Homepage Sections',
    description: 'Edit text content for About & Why Choose Us sections.',
    icon: FilePenLine,
    manageLink: '/admin/content/homepage-sections',
    itemsCount: 2,
    itemLabel: 'Sections',
  },
]

const ContentCard = ({ section }: { section: ContentSection }) => (
  <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-lg">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
          <section.icon className="h-6 w-6" />
        </div>
        <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{section.itemsCount}</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{section.itemLabel}</p>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 h-10">{section.description}</p>
    </div>
    <div className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 rounded-b-xl">
      <Link
        href={section.manageLink}
        className="text-sm font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
      >
        Manage Section &rarr;
      </Link>
    </div>
  </div>
)

export default function ContentManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Website Content Management</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Update your website's content from one central place. No code changes required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <ContentCard key={section.title} section={section} />
        ))}
      </div>

       <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Need to Edit Something Else?</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            For changes to static content like the footer or contact information, please visit the 'Site Settings' section.
          </p>
          <Link href="/admin/settings">
             <button className="mt-4 inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                Go to Site Settings
            </button>
          </Link>
       </div>
    </div>
  )
}