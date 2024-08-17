import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      fallbackRedirectUrl={"/dashboard"}
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-500",
        },
      }}
    />
  );
}
