"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { BsGithub, BsGoogle } from "react-icons/bs";

import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import AuthSocialButton from "./AuthSocialButton";

type FORM_TYPE = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [formType, setFormType] = React.useState<FORM_TYPE>("LOGIN");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();
  const session = useSession();

  const toggleFormType = React.useCallback(() => {
    if (formType === "LOGIN") {
      setFormType("REGISTER");
    } else {
      setFormType("LOGIN");
    }
  }, [formType]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { email, name, password } = event.target.elements;

    const data = {
      email: email?.value,
      name: name?.value,
      password: password?.value,
    };

    if (formType === "REGISTER") {
      return axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/pokemons");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    signIn("credentials", {
      redirect: false,
      ...data,
    })
      .then((callback) => {
        if (callback?.error) {
          return toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/pokemons");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }
        if (callback?.ok) {
          router.push("/pokemons");
        }
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/pokemons");
    }
  }, [session?.status, router]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            className="w-8 h-8 mr-2"
            src="https://e7.pngegg.com/pngimages/569/963/png-clipart-pokeball-illustration-ash-ketchum-pokeball-s-image-file-formats-rim.png"
            alt="logo"
          /> */}
          Pokemonoma
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {formType === "LOGIN"
                ? "Sign in into your account"
                : "Create account"}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {formType === "REGISTER" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {formType === "LOGIN" ? "Sign in" : "Register"}
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <AuthSocialButton
                  icon={BsGithub}
                  onClick={() => socialAction("github")}
                />
                <AuthSocialButton
                  icon={BsGoogle}
                  onClick={() => socialAction("google")}
                />
              </div>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                {formType === "LOGIN"
                  ? "New to Pokemonoma? "
                  : "Already have an account? "}
                <button
                  onClick={toggleFormType}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {formType === "LOGIN" ? "Create an account" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
