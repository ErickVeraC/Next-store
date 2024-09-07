import NavBar from "@/components/NavBar";

export default function MainLayout({ children }) {
  // podemos usar props.children para renderizar los componentes hijos pero de esta forma deconstructuramos el children
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
