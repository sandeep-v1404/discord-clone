import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id, //Only Admin can modify
      },
      data: {
        name: name,
        imageUrl: imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
