import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "All available API routes",
    },
    tags: [{ name: "Auth", description: "Authentication routes" }],
    paths: {
      "/api/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", example: "John Doe" },
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "password123" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User created successfully" },
            400: { description: "Invalid input" },
            409: { description: "Email already in use" },
          },
        },
      },
      "/api/forgot-password": {
        post: {
          tags: ["Auth"],
          summary: "Request a password reset email",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", example: "john@example.com" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Reset link sent if account exists" },
            400: { description: "Email is required" },
          },
        },
      },
      "/api/reset-password": {
        post: {
          tags: ["Auth"],
          summary: "Reset password using a token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["token", "password"],
                  properties: {
                    token: { type: "string", example: "abc123..." },
                    password: { type: "string", example: "newpassword123" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Password updated successfully" },
            400: { description: "Invalid or expired token" },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
