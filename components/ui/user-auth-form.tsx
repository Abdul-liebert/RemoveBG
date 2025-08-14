"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { Icons } from "./icons"

export function UserAuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false) // mode login atau signup

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <div className="flex flex-col">

      <h2 className="text-lg font-bold text-center">
        Login to your account
      </h2>
      <p className="text-xs text-neutral-500 text-center px-4">
       Enter your email and password below to direct the page
      </p>
        </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {/* Kalau Sign Up, tampilkan input nama */}
          

          <div className="grid gap-1">
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
         
            <div className="grid gap-1">
            <Label htmlFor="password" className="sr-only">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          

          

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
           Sign in
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
      
          <>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </>
        
      </div>
    </div>
  )
}
