"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthButton() {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;

      const response = await fetch(
        "http://localhost:8000/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        }
      );

      const data = await response.json();

      console.log("Usuario autenticado:", data);
    } catch (error) {
      console.error("Error autenticando con Google:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        theme="filled_black"
        size="large"
        text="continue_with"
        shape="pill"
        width="300"
      />
    </div>
  );
}
