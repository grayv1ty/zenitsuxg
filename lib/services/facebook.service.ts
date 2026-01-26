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

class FacebookService {
  private baseUrl = "https://graph.facebook.com/v24.0";
  private accessToken: string;
  private myPageId = "109960841810512"; // ZenitsuX Gaming page ID
  private participantKeyword: string;

  constructor() {
    this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN || "";
    this.participantKeyword = process.env.FACEBOOK_PARTICIPANT_KEYWORD || "You are in!";
    
    if (!this.accessToken) {
      console.warn("Facebook access token not configured");
    }
  }

  /**
   * Fetch comments from a Facebook post
   * @param postId - The Facebook post ID
   * @param limit - Maximum number of comments to fetch (default: 1000)
   * @returns Promise with comments data
   */
  async getPostComments(
    postId: string,
    limit: number = 1000
  ): Promise<FacebookComment[]> {
    try {
      const url = `${this.baseUrl}/${postId}/comments?limit=${limit}&filter=stream&access_token=${this.accessToken}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        const error: FacebookError = await response.json();
        throw new Error(
          `Facebook API error: ${error.error.message} (Code: ${error.error.code})`
        );
      }

      const data: FacebookCommentsResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching Facebook comments:", error);
      throw error;
    }
  }

  /**
   * Get participants from a post by filtering comments where you replied with the participant keyword
   * @param postId - The Facebook post ID
   * @returns Promise with participant names
   */
  async getEventParticipants(postId: string): Promise<{ fullname: string }[]> {
    try {
      const comments = await this.getPostComments(postId, 1000);
      const participants: { fullname: string }[] = [];
      const participantSet = new Set<string>();

      comments.forEach((comment) => {
        // Check if this is my reply with the participant keyword
        if (
          comment.from?.id === this.myPageId &&
          comment.message.includes(this.participantKeyword)
        ) {
          // Extract the participant name from the beginning of the message
          // Format: "Name Here <keyword> ..."
          const namePart = comment.message.split(this.participantKeyword)[0].trim();
          
          if (namePart && !participantSet.has(namePart)) {
            participantSet.add(namePart);
            participants.push({ fullname: namePart });
          }
        }
      });

      return participants;
    } catch (error) {
      console.error("Error getting event participants:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const facebookService = new FacebookService();

// Export types
export type { FacebookComment, FacebookCommentsResponse };
