"use client";

import { Suspense } from "react";

import AutenticacionGoogleView from "@/app/views/autenticacion-google/AutenticacionGoogleView";

export default function AutenticacionGooglePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AutenticacionGoogleView />
    </Suspense>
  );
}