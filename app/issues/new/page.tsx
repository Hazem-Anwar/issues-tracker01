"use client";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="container mx-auto">
        <div className="max-w-xl mx-auto border-1 p-5 bg-stone-50 border-stone-400 rounded-md">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" className="my-4" />
      <Button>Submit New Isuue</Button>
    </div>
    </div>
  );
};

export default NewIssuePage;
