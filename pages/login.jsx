import { useForm } from "react-hook-form";
import { login } from "@/utils/api";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      const token = await login(data.username, data.password);

      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
        setIsSubmitting(false);
        return;
      }

      setError("root.data", {
        type: "manual",
        message: "Invalid password",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error: ", error);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="p-4 flex flex-col text-white gap-10">
      <h1 className="text-2xl w-full font-bold text-center">Login</h1>
      <section className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-white/10 p-4 rounded-md flex flex-col gap-4 max-w-md mx-auto"
        >
          <div className="flex flex-col w-full gap-2">
            <input
              type="text"
              className={clsx("bg-black border-white/10 p-2 rounded-md", {
                "bg-red-500/10 border-red-500": errors.username,
              })}
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full gap-2">
            <input
              type="password"
              className={clsx("bg-black border-white/10 p-2 rounded-md", {
                "bg-red-500/10 border-red-500": errors.password,
              })}
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500 text-center uppercase">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#ffffff] text-black w-75 rounded cursor-pointer disabled:bg-neutral-400 disabled:cursor-progres hover:bg-transparent hover:text-white transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
          {errors.root?.data && (
            <span className="text-xs text-red-500">
              {errors.root.data.message}
            </span>
          )}
        </form>
      </section>
    </main>
  );
}
