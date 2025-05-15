"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form
      className="container mx-auto"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <div className="max-w-xl mx-auto border-1 p-5 bg-stone-50 border-stone-400 rounded-md">
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact
              placeholder="Description"
              className="my-4"
              {...field}
            />
          )}
        />

        <Button>Submit New Isuue</Button>
      </div>
    </form>
  );
};

export default NewIssuePage;
