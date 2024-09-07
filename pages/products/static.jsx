import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/utils/api";

export default function Static({ products }) {
  return (
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
  );
}

// static site generation
export async function getStaticProps() {
  console.log("getStaticProps"); // este console log solo se renderiza del lado del servidor

  const products = await getAllProducts();

  return {
    props: {
      products,
    },
    // incremental static generation
    revalidate: 60, // cada 60 segundos se va a regenerar la pagina
  };
}
// getStatic props o getServerSideProps solo se pueden usar en pages
