import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700",
            card: "shadow-lg",
          },
        }}
        redirectUrl="/"
      />
    </div>
  );
}
