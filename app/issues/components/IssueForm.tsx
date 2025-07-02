"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { IconFaceIdError } from "@tabler/icons-react";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  return (
    <div className="max-w-xl mx-auto">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=""
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmiting(true);
            if (issue) await axios.patch("/api/issues/ " + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmiting(false);
            setError("an unexpected error.");
          }
        })}
      >
        <div className=" mx-auto border-1 p-5 bg-stone-50 border-stone-400 rounded-md">
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-700 py-2 text-xs flex items-center">
              <IconFaceIdError className="me-2" width={16} stroke={2} />

              {errors.title.message}
            </p>
          )}
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => (
              <SimpleMdeReact
                placeholder="Description"
                className="my-4"
                {...field}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-700 p-2">{errors.description.message}</p>
          )}

          <Button>
            {issue ? "Update Issue" : "Submit New Issue"}
            {isSubmiting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
