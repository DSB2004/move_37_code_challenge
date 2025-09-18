export interface Poll {
  options: {
    id: string;
    option: string;
  }[];
  replies: {
    user: {
      id: string;
      username: string | null;
    };
    option: {
      id: string;
    };
  }[];
  id: string;
  ownerId: string;
  question: string;
  description: string | null;
  createdAt: Date;
}

export function PollShareEmail({
  url,
  email,
  pollTitle,
  senderName,
}: {
  url: string;
  email: string;
  pollTitle: string;
  senderName: string;
}) {
  return {
    content: `Hello,

${senderName} has invited you to participate in the poll: "${pollTitle}".

Click the link below to view and cast your vote:
${url}

Your participation will help shape the final result!

If you weren’t expecting this invitation, you can safely ignore this email.`,
    email: email,
    subject: `You're invited to vote on: ${pollTitle}`,
  };
}

export enum SocketEvent {
  VOTE = "poll.vote",
  UPDATE = "poll.update",
  DELETE = "poll.delete",
}
