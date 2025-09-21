import React from "react";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@radix-ui/themes";

const UserData = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  return (
    <div className="flex items-center">
      {status === "authenticated" && (
        <div className="flex items-center gap-4">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={40}
              height={40}
              className="size-10 rounded-full"
            />
          )}

          <div className="flex flex-col">
            <span className="font-medium">{session.user!.name}</span>
            <span className="text-sm text-gray-500">{session.user!.email}</span>
          </div>
          <Link
            className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            href={"/api/auth/signout"}
          >
            signout
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin?callbackUrl=/"}>signin</Link>
      )}
    </div>
  );
};

export default UserData;
