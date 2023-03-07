import { Box, Button, Grid, Slider, Space, Title } from "@mantine/core";
import { useState } from "react";
import PointSelect from "~/components/Point/Select";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "~/auth.server";
import type { User } from "@supabase/supabase-js";
import supabase from "~/models/supabase";
import { updatePointByUserId } from "~/models/user.service";

const clientKey = "test_ck_Lex6BJGQOVD9OPgzzvJrW4w2zNbg";

interface ILoaderData {
  result: any;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken } = await authenticate(request);

  if (!accessToken) return redirect("/auth/login");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (!user) return redirect("/auth/login");

  const orderId = new URL(request.url).searchParams.get("orderId");
  const paymentKey = new URL(request.url).searchParams.get("paymentKey");
  const amount = new URL(request.url).searchParams.get("amount");

  const data = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic dGVzdF9za19vZXFSR2dZTzFyNXFPTWIxRWo1clFuTjJFeWF6Og==`,
    },
    body: JSON.stringify({
      orderId,
      paymentKey,
      amount,
    }),
  });

  const result = await data.json();

  if (result.status === "DONE") {
    await updatePointByUserId(user.id, result.totalAmount);
  }

  return json<ILoaderData>({ result: result });
};

export default function Shop() {
  const { result } = useLoaderData<ILoaderData>();
  return (
    <Box
      sx={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Title>포인트 구매완료</Title>
      {JSON.stringify(result)}
    </Box>
  );
}
