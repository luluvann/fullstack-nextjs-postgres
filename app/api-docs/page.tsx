"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/swagger.json")
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <h1 className="text-white font-semibold text-lg">API Documentation</h1>
        <p className="text-zinc-500 text-sm mt-0.5">All available API routes</p>
      </div>
      <SwaggerUI spec={spec} />
    </div>
  );
}
