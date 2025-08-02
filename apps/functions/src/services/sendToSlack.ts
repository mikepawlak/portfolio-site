import { defineSecret } from 'firebase-functions/params';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import fetch from 'node-fetch';

/**
 * Secret token for authenticating with the Slack bot.
 */
export const slackBotToken = defineSecret('SLACK_BOT_TOKEN');

/**
 * Slack channel ID where messages should be posted.
 */
export const slackChannelId = defineSecret('SLACK_CHANNEL_ID');

/**
 * Handler for processing a new Firestore document and posting to Slack.
 *
 * @param event Firestore event containing document data and metadata
 * @returns Promise<void>
 */
export const sendSlackMessage = async (
  event: FirestoreEvent<QueryDocumentSnapshot>
): Promise<void> => {
  const doc = event.data;

  if (!doc) {
    console.error('No document data found.');
    return;
  }

  const data = doc.data() as {
    name: string;
    email: string;
    message: string;
  };

  const token = slackBotToken.value();
  const channel = slackChannelId.value();

  const message = {
    channel,
    text: `📬 New contact form submission`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*New Contact Message Submitted*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Message:* ${data.message}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Document ID: ${event.params.docId}`,
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const result = (await res.json()) as { ok: boolean; error?: string };

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    console.log('✅ Slack message sent successfully.');
  } catch (err) {
    console.error('❌ Failed to send Slack message:', err);
  }
};
