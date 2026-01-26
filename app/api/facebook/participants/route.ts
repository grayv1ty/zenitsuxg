import { NextRequest, NextResponse } from "next/server";
import { facebookService } from "@/lib/services/facebook.service";

/**
 * GET /api/facebook/participants
 * Get event participants from a Facebook post (based on "You are in!" replies)
 * Query params:
 * - postId: Facebook post ID (required)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const participants = await facebookService.getEventParticipants(postId);

    return NextResponse.json({
      success: true,
      count: participants.length,
      data: participants,
    });
  } catch (error) {
    console.error("Error in /api/facebook/participants:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch participants",
      },
      { status: 500 }
    );
  }
}
