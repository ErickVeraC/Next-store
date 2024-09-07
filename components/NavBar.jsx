import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/products",
    text: "Products",
  },
];

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLoginLogout() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/login");
    }

    if (!isLoggedIn) {
      router.push("/login");
    }
  }

  return (
    <nav className="w-full flex flex-row gap-4 bg-neutral-600">
      {links.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className="w-full text-center p-4"
          >
            {link.text}
          </Link>
        );
      })}

      <div className="w-full text-center p-4" onClick={handleLoginLogout}>
        {isLoggedIn ? "Logout" : "Login"}
      </div>
    </nav>
  );
}
