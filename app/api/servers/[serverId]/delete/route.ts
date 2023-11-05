import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export const DELETE = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    await db.server.deleteMany({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
