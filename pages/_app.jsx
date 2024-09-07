import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster richColors />
      <Component {...pageProps} />
    </>
  );
}
