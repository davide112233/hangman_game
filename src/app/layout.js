"use client";

import "./globals.css";
import DOMPurify from "isomorphic-dompurify";
import { metadata } from "./utils/metaData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <title dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(metadata.title) }} />
      <meta name="description" content={DOMPurify.sanitize(metadata.description)} />
      <meta name="keywords" content={DOMPurify.sanitize(metadata.keywords)} />
      <meta name="author" content={DOMPurify.sanitize(metadata.author)} />
      <meta name="robots" content={DOMPurify.sanitize(metadata.robots)} />
      <meta name="viewport" content={DOMPurify.sanitize(metadata.viewport)} />
      <meta name="type" content={DOMPurify.sanitize(metadata.type)} />
      <body>
        <div className="app-container">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
