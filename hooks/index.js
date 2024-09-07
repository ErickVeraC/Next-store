// hook para proveer la lista de productos

import { useState, useEffect } from "react";
import { getAllProducts, getProduct } from "@/utils/api";
import { useRouter } from "next/router";
import { toast } from "sonner";

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("[useProducts]", error));
  }, []);

  return { products };
}

// hook para obtener informacion del producto

export function useProduct(id) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!id) return;

    getProduct(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error("[useProduct]", error));
  }, [id]); // el id es una dependencia que sirver por si cambia el id

  //if (!id) return { product }; otra forma de hacerlo pero menos efienciente

  return { product };
}

export function useAuth() {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      router.push("/login");
      toast.error("Debes iniciar sesion");
    }
    setToken(localStorageToken);
  }, []);

  return { token };
}
