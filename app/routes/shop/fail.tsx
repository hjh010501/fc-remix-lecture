import { Alert, Box, Button, Grid, Slider, Space, Title } from "@mantine/core";
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
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const clientKey = "test_ck_Lex6BJGQOVD9OPgzzvJrW4w2zNbg";

interface ILoaderData {
  result: any;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken } = await authenticate(request);

  if (!accessToken) return redirect("/auth/login");

  const code = new URL(request.url).searchParams.get("code");
  const message = new URL(request.url).searchParams.get("message");
  const orderId = new URL(request.url).searchParams.get("orderId");

  return { code, message, orderId };
};

export default function Shop() {
  const data = useLoaderData<ILoaderData>();
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
      <Space h="xl" />
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="결제 실패"
        color="red"
      >
        포인트 구매를 실패하였습니다. Message: {JSON.stringify(data)}
      </Alert>
    </Box>
  );
}
