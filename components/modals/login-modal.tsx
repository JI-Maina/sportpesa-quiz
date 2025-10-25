"use client";

import * as z from "zod";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState, useTransition } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginSchema } from "@/lib/schema";
import { useQuizStore } from "@/store/store";
import { loginUser } from "@/actions/login-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);

  const { setUser, user } = useQuizStore((state) => state);

  const [state, action, isPending] = useActionState(loginUser, null);
  const [isTransitionPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const formData = new FormData();

    formData.append("phone_number", values.phone_number);
    formData.append("password", values.password);

    startTransition(() => {
      action(formData);
    });
  };

  const isLoading = isPending || isTransitionPending;

  // Handle successful login
  useEffect(() => {
    if (state?.success) {
      // console.log(state.data);
      setUser({
        nickname: state.data.nickname,
        phoneNo: state.data.phone_number,
        isAdmin: state.data.is_quiz_admin || false,
      });
      setOpen(false);
    }
  }, [state?.success]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Play Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-blue-500 border-2 rounded-xl">
        <DialogHeader className="flex flex-col items-center space-y-4">
          {/* Logo Section */}
          <div className="w-20 h-20 relative mb-2">
            <Image
              src="/sportpesa-logo.jpg"
              alt="SportPesa"
              fill
              className="object-contain"
            />
          </div>

          <DialogTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </DialogTitle>
          <DialogDescription className=" text-center text-base">
            Login to play and win exciting prizes
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your registered number"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Show server error message */}
            {state?.message && !state?.success && (
              <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm text-center">
                  {state.message}
                </p>
              </div>
            )}

            {/* Show success message */}
            {state?.success && (
              <div className="p-3 bg-green-900/50 border border-green-500 rounded-lg">
                <p className="text-green-300 text-sm text-center">
                  {state.message}
                </p>
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Login & Play{" "}
              {isLoading && <RotateCw className="animate-spin w-4 h-4" />}
            </Button>

            {/* Sign Up Prompt */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
