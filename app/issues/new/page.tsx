"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setErrorMap } from "zod";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl mx-auto" >
      {error && (
        <Callout.Root className="mb-3" color="red">
          
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=""
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("an unexpected error.");
          }
        })}
      >
        <div className=" mx-auto border-1 p-5 bg-stone-50 border-stone-400 rounded-md">
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
    </div>
  );
};

export default NewIssuePage;
