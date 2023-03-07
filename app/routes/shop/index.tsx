import { Box, Button, Grid, Text, Space, Title } from "@mantine/core";
import { useState } from "react";
import PointSelect from "~/components/Point/Select";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "~/auth.server";
import type { User } from "@supabase/supabase-js";
import supabase from "~/models/supabase";
import { getUserByUserId } from "~/models/user.service";

const clientKey = "test_ck_Lex6BJGQOVD9OPgzzvJrW4w2zNbg";

interface ILoaderData {
  is_login: boolean;
  user?: User | null;
  point?: number;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken } = await authenticate(request);

  if (!accessToken) return json<ILoaderData>({ is_login: false });

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  const profile = await getUserByUserId(user?.id as string);

  return json<ILoaderData>({ is_login: true, user, point: profile.data.point });
};

export default function Shop() {
  const location = useLocation();
  const { user, point } = useLoaderData<ILoaderData>();
  const [selected, setSelected] = useState(2000);
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
      <Title>포인트 구매하기</Title>
      <Text>{point}포인트 보유</Text>
      <Space h="xl" />
      <Grid columns={4}>
        <Grid.Col span={1}>
          <PointSelect
            value={2000}
            is_select={selected === 2000}
            onClick={() => setSelected(2000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={5000}
            is_select={selected === 5000}
            onClick={() => setSelected(5000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={10000}
            is_select={selected === 10000}
            onClick={() => setSelected(10000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={30000}
            is_select={selected === 30000}
            onClick={() => setSelected(30000)}
          />
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{ width: "150px" }}
          onClick={() => {
            loadTossPayments(clientKey).then((tossPayment) =>
              tossPayment.requestPayment("카드", {
                amount: 1, // Production -> selected
                orderId: Math.random().toString(36).substring(2, 11),
                orderName: `${selected}P 구매`,
                customerName: user?.app_metadata.name,
                successUrl: `${
                  window ? window.location.origin : ""
                }/shop/success`,
                failUrl: `${window ? window.location.origin : ""}/shop/fail`,
                customerEmail: user?.email,
              })
            );
          }}
        >
          구매하기
        </Button>
      </Box>
    </Box>
  );
}
