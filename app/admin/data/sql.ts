"use client"

import { z } from "zod"
import type { SqlConfigType } from "app/admin/types/admin"

export const sqlConfigList: SqlConfigType[] = [
  {
    sqlName: "users",
    fields: [
      { field: "username", required: true, search: true },
      { field: "email", required: true, search: true },
      { field: "password", required: true, search: true },
      { field: "sort_order" },
    ],
    formSchema: z.object({
      username: z.string().min(1, {
        message: "username is required.",
      }),
      email: z.string().min(1, {
        message: "email is required.",
      }),
      password: z.string().min(1, {
        message: "password is required.",
      }),
      sort_order: z.string(),
    }),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      sort_order: "0",
    },
  },
  {
    sqlName: "bookmarks",
    fields: [
      { field: "url", required: true, search: true },
      { field: "title", required: true, search: true },
      { field: "description", search: true },
      { field: "background_image" },
      { field: "source", search: true },
      { field: "github_url" },
      { field: "sort_order" },
    ],
    formSchema: z.object({
      title: z.string().min(1, {
        message: "title is required.",
      }),
      url: z.string().min(1, {
        message: "url is required.",
      }),
      description: z.string(),
      background_image: z.string(),
      source: z.string(),
      github_url: z.string(),
      sort_order: z.string(),
    }),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      background_image: "",
      source: "",
      github_url: "",
      sort_order: "0",
    },
  },
  {
    sqlName: "bookmarkslabel",
    fields: [{ field: "name", required: true, search: true }, { field: "sort_order" }],
    formSchema: z.object({
      name: z.string().min(1, {
        message: "name is required.",
      }),
      sort_order: z.string(),
    }),
    defaultValues: {
      name: "",
      sort_order: "0",
    },
  },
  {
    sqlName: "test",
    fields: [{ field: "name", required: true }, { field: "title", required: true }, { field: "sort_order" }],
    formSchema: z.object({
      name: z.string().min(1, {
        message: "name is required.",
      }),
      title: z.string().min(1, {
        message: "title is required.",
      }),
      sort_order: z.string(),
    }),
    defaultValues: {
      name: "",
      title: "",
      sort_order: "0",
    },
  },
]
