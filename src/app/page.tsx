import { urlFor } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    slug,
    images,
    price,
    description,
    category
  }`;

  const products = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(
      query
    )}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return products.result;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <Link
            href={`/product/${product.slug.current}`}
            key={product._id}
            className="group"
          >
            <div className="aspect-square relative">
              <Image
                src={urlFor(product.images[0]).url()}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
