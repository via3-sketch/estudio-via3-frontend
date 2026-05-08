"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId="1008178673179-ba6qko3gsuvmpdsr0rd65qdtr3t854dp.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
