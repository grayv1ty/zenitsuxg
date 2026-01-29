'use server';

/**
 * Facebook Graph API Service
 * Handles fetching comments and interactions from Facebook posts
 */

interface FacebookComment {
  id: string;
  from?: {
    id: string;
    name: string;
  };
  message: string;
  created_time: string;
  like_count?: number;
  comment_count?: number;
}

interface FacebookCommentsResponse {
  data: FacebookComment[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface FacebookError {
  error: {
    message: string;
    type: string;
    code: number;
  };
}

const baseUrl = "https://graph.facebook.com/v24.0";
const myPageId = "109960841810512"; // ZenitsuX Gaming page ID

function getAccessToken() {
  const token = process.env.FACEBOOK_ACCESS_TOKEN || "";
  if (!token) {
    console.warn("Facebook access token not configured");
  }
  return token;
}

function getParticipantKeyword() {
  return process.env.FACEBOOK_PARTICIPANT_KEYWORD || "You are in!";
}


/**
 * Fetch comments from a Facebook post with pagination support
 */
async function getPostComments(
  postId: string,
  limit: number = 1000
): Promise<FacebookComment[]> {
  try {
    const accessToken = getAccessToken();
    const allComments: FacebookComment[] = [];
    const fullPostId = postId
    let url = `${baseUrl}/${fullPostId}/comments?limit=${limit}&filter=stream&access_token=${accessToken}`;

    while (url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        const error: FacebookError = await response.json();
        console.error(`Failed to fetch comments for post ${postId}:`, error.error.message);
        return []; // Return empty array instead of throwing
      }

      const data: FacebookCommentsResponse = await response.json();
      
      if (data.data && data.data.length > 0) {
        allComments.push(...data.data);
      }

      // Check if there's a next page
      url = data.paging?.next || "";
    }

    console.log(`Fetched ${allComments.length} total comments from post ${postId}`);
    return allComments;
  } catch (error) {
    console.error("Error fetching Facebook comments:", error);
    return []; // Return empty array on any error
  }
}

/**
 * Get participants from a post by filtering comments where you replied with the participant keyword
 */
export async function getEventParticipants(postId: string): Promise<{ fullname: string }[]> {
  // Return empty array if no postId provided
  if (!postId || postId.trim() === '') {
    console.log('No post ID provided, returning empty participants list');
    return [];
  }

  try {
    const participantKeyword = getParticipantKeyword();
    const comments = await getPostComments(postId, 1000);
    const participants: { fullname: string }[] = [];
    const participantSet = new Set<string>();

    comments.forEach((comment) => {
      // Check if this is my reply with the participant keyword
      if (
        comment.from?.id === myPageId &&
        comment.message.includes(participantKeyword)
      ) {
        // Extract the participant name from the beginning of the message
        // Format: "Name Here <keyword> ..."
        const namePart = comment.message.split(participantKeyword)[0].trim();
        
        if (namePart && !participantSet.has(namePart)) {
          participantSet.add(namePart);
          participants.push({ fullname: namePart });
        }
      }
    });

    return participants;
  } catch (error) {
    console.error("Error getting event participants:", error);
    // Return empty array instead of throwing to prevent page from crashing
    return [];
  }
}
