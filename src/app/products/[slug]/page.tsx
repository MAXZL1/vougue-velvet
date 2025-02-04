import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { useRouter } from 'next/router'

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`
  return client.fetch(query)
}

const ProductDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Product: {slug}</h1>
      <p className="mt-4">Details about the product will go here.</p>
    </div>
  )
}

export default ProductDetailPage 