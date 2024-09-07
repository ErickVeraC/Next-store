import Link from "next/link";
import { useRouter } from "next/router";
import { useProduct, useAuth } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";

export default function ProductDetailPage() {
  useAuth(); // si hiciera un const { token } = useAuth(); token; me daria el token para usarlo en la api

  const router = useRouter();
  const { id } = router.query;
  const { product } = useProduct(id);

  return (
    <MainLayout>
      <main className="flex flex-col gap-4 p-4 justify-center items-center w-2/3">
        <header className="text-left w-full">
          <Link
            href={`/products#product-${id}`}
            className="cursor-pointer hover:bg-white"
          >
            🔙 Regresar
          </Link>
        </header>
        <h1 className="text-3xl font-bold text-center">{product.title}</h1>
        <img src={product.thumbnail} alt={product.title} className="size-48 " />
        <p className="max-w-prose">{product.price}</p>
        <p className="text-cyan-600 text-lg">{product.description}</p>
      </main>
    </MainLayout>
  );
}
