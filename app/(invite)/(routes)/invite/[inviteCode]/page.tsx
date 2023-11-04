import { ErrorModal } from "@/components/modals/error-modal";
import { useModal } from "@/hooks/use-modal-store";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const userExistingInServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (userExistingInServer) {
    return redirect(`/servers/${userExistingInServer.id}`);
  }

  const newUserInServer = await db.server
    .update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [{ profileId: profile.id }],
        },
      },
    })
    .catch((err) => {});

  if (newUserInServer) {
    return redirect(`/servers/${newUserInServer.id}`);
  }

  return <ErrorModal />;
};

export default InviteCodePage;
