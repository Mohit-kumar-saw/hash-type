"use client";

import Input from "../../../components/input/input";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");

  const toggleVariant = useCallback(() => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="relative flex w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div
        className={`left-box z-50 h-[100vh] w-1/2 ${
          variant === "REGISTER"
            ? "translate-x-[50vw] transition-transform duration-1000 ease-in-out"
            : "translate-x-[0vw] transition-transform duration-1000 ease-in-out"
        }`}
      >
        <div className="h-[100vh] relative w-[100%] z-50">
          <div
            className={`box1 absolute top-0 left-[-200px] bg-gradient-to-br from-purple-900/40 to-purple-600/40 backdrop-blur-sm w-[600px] h-[100vh] rounded-3xl drop-shadow-xl shadow-black ${
              variant === "REGISTER"
                ? "translate-x-[50vw] rotate-[85deg] left-[-350px] top-[-100px] transition-all duration-700"
                : "translate-x-[0vw] rotate-[-10deg] transition-all duration-700"
            }`}
          />
          <div
            className={`box2 absolute top-[-339px] left-[-350px] bg-gradient-to-br from-purple-800/30 to-indigo-600/30 backdrop-blur-sm w-[750px] h-[110vh] rounded-3xl shadow-lg transition-transform duration-1000 ease-in-out ${
              variant === "REGISTER"
                ? "translate-x-[50vw] rotate-[45deg] left-[-400px] "
                : "translate-x-[0vw] rotate-[43deg]"
            }`}
          />
          <div
            className={`box3 absolute z-0 top-[450px] bg-gradient-to-br from-purple-700/20 to-violet-500/20 backdrop-blur-sm w-[500px] h-[500px] rounded-3xl shadow-lg transition-transform duration-1000 ease-in-out ${
              variant === "REGISTER"
                ? "translate-x-[50vw] rotate-[65deg] left-[-410px]"
                : "translate-x-[0vw] rotate-[20deg]"
            }`}
          />
        </div>
      </div>

      <div
        className={`right-box mt-8 w-1/2 flex justify-center z-0 items-center sm:mx-auto sm:w-full sm:max-w-md ${
          variant === "REGISTER"
            ? "translate-x-[-50vw] transition-transform duration-1000 ease-in-out"
            : "translate-x-[0vw] transition-transform duration-1000 ease-in-out"
        }`}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm w-[100%] px-8 py-8 shadow-lg rounded-xl border border-gray-700/50">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" ? (
              <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Create Account
              </h2>
            ) : (
              <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
            )}

            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isloading}
              />
            )}
            <Input
              id="email"
              label="Email"
              register={register}
              errors={errors}
              disabled={isloading}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isloading}
            />
            <div>
              <div 
                onClick={handleSubmit(onSubmit)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer w-full"
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-800/50 px-2 text-gray-400">
                  Or continue with
                </span>
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
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-400">
            <div>
              {variant === "LOGIN"
                ? "New to HashType?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="text-purple-400 hover:text-purple-300 cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
