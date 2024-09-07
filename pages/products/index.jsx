import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";

export default function Products({ products }) {
  return (
    <MainLayout>
      <main className="p-4 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-center ">Products</h1>
        <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {products.map((product, idx) => {
            return (
              <ProductCard
                key={`product-${idx}`}
                id={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            );
          })}
        </section>
      </main>
    </MainLayout>
  );
}

// server side rendering
export async function getServerSideProps() {
  console.log("getServerSideProps"); // este console log solo se renderiza del lado del servidor

  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}

// static site generation
