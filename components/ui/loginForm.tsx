import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { UserAuthForm } from "./user-auth-form"

export default function LoginForm() {
  return (
    <Card className="mx-auto bg-neutral-900 max-w-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      
      <div className="bg-white text-black flex flex-col p-10 justify-between">
        <div className="flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <blockquote className="leading-normal text-balance mt-8">
          &ldquo;This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever
          before.&rdquo; - Sofia Davis
        </blockquote>
      </div>

      
      <CardContent className=" flex flex-col justify-center p-8">
        

        <div className="mt-6">
          <UserAuthForm />
        </div>

        <p className="text-muted-foreground px-4 text-center text-sm mt-6">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  )
}
