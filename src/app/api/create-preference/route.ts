import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST() {
  try {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "item-1",
            title: "Producto de prueba",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 100,
          },
        ],
        back_urls: {
          success: "http://localhost:3000/pago/confirmacion",
          failure: "http://localhost:3000/pago",
          pending: "http://localhost:3000/pago",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    });
  } catch (error: any) {
    console.error("MP ERROR:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Error creando preference" },
      { status: 500 }
    );
  }
}