"use client";

import React from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiPanelProps {
  title: string;
  method: HttpMethod;
  url: string;
  onSend?: () => void;
  isSending?: boolean;
  responseStatus?: number | null;
  responseJson?: unknown;
  className?: string;
}

function MethodBadge({ method }: { method: HttpMethod }) {
  const colorMap: Record<HttpMethod, string> = {
    GET: "bg-blue-600",
    POST: "bg-green-600",
    PUT: "bg-amber-600",
    PATCH: "bg-indigo-600",
    DELETE: "bg-rose-600",
  };
  return (
    <span className={`${colorMap[method]} text-white text-xs px-2 py-1 rounded`}>{method}</span>
  );
}

export function ApiPanel({
  title,
  method,
  url,
  onSend,
  isSending = false,
  responseStatus = null,
  responseJson,
  className,
}: ApiPanelProps) {
  return (
    <div className={`w-full ${className ?? ""}`}>
      {/* Título */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>

      {/* Barra método/URL/acción */}
      <div className="bg-white border rounded-md shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b bg-gray-50">
          <MethodBadge method={method} />
          <div className="text-gray-700 text-sm truncate">{url}</div>
          <div className="ml-auto">
            {onSend && (
              <button
                onClick={onSend}
                disabled={isSending}
                className="px-3 py-1.5 text-sm rounded bg-gray-900 text-white hover:bg-black/80 disabled:opacity-50"
              >
                {isSending ? "Enviando..." : "Enviar"}
              </button>
            )}
          </div>
        </div>

        {/* Panel de respuesta */}
        <div className="p-3">
          <div className="text-sm text-gray-700 font-medium mb-2">
            {responseStatus ? `HTTP ${responseStatus}` : "Respuesta"}
          </div>
          <pre className="text-sm bg-gray-900 text-gray-100 rounded p-3 overflow-auto max-h-96">
{JSON.stringify(responseJson ?? {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ApiPanel;