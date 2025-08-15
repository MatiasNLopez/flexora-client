"use client";

import React, { useCallback, useState } from "react";
import ApiPanel from "@/components/ApiPanel";
import { api } from "@/lib/api";
import { AUTH_ENDPOINTS } from "@/lib/api_endpoints";

export default function CurrentUserExamplePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<unknown>({});

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      setStatus(null);
      setData({});
      const res = await api.get(AUTH_ENDPOINTS.CURRENT_USER);
      setStatus(res.status as number);
      setData(res.data);
    } catch (err: any) {
      setStatus(err?.response?.status ?? null);
      setData(err?.response?.data ?? { detail: "Error" });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ApiPanel
        title="Current User"
        method="GET"
        url={`/flexora/api/${AUTH_ENDPOINTS.CURRENT_USER}`}
        onSend={fetchCurrentUser}
        isSending={loading}
        responseStatus={status}
        responseJson={data}
      />
    </div>
  );
}