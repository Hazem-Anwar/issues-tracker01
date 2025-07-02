"use client";
import { Button, Flex } from "@radix-ui/themes";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setErroe] = useState(false);
  const [deletign, setDeleting] = useState(false);

  const OnDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (erroe) {
      setDeleting(false);
      setErroe(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button
            disabled={deletign}
            className="px-6 py-2 rounded-md bg-red-600 cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Delete issue
            {deletign && <span>...</span>}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-md shadow-md transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md">
            <AlertDialog.Title className="text-lg font-semibold">
              Delete issue
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              Are you sure? This application will no longer be accessible and
              any existing sessions will be expired.
            </AlertDialog.Description>

            <div className="flex items-center gap-3 mt-5">
              <AlertDialog.Cancel asChild>
                <button className="px-6 py-2 rounded-md bg-gray-200 cursor-pointer text-dark">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={OnDelete}
                  className="px-6 py-2 rounded-md bg-red-600 cursor-pointer text-white"
                >
                  Delete issue
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-md shadow-md transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md">
          <AlertDialog.Title className="text-lg font-semibold">
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? This application will no longer be accessible and any
            existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel asChild>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setErroe(false)}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
