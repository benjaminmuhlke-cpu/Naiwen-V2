import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// GROQ query — all projects for the showcase grid
export const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    title,
    "slug": slug.current,
    category,
    "heroImage": heroImage.asset->url,
    "images": images[].asset->url,
  }
`

// GROQ query — single project by slug
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    client,
    year,
    role,
    deliverables,
    overviewTitle,
    overview,
    overviewSub,
    tags,
    "heroImage": heroImage.asset->url,
    "images": images[].asset->url,
    closingTitle,
    closingText1,
    closingText2,
    "next": next->slug.current,
    order,
  }
`
