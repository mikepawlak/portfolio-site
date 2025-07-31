import { defineSecret } from 'firebase-functions/params';
import fetch from 'node-fetch';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';

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
  event: FirestoreEvent<{ name: string; email: string; message: string }>
): Promise<void> => {
  const data = event.data?.data();

  if (!data) {
    console.error('No document data found.');
    return;
  }

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

    const result = await res.json();

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    console.log('✅ Slack message sent successfully.');
  } catch (err) {
    console.error('❌ Failed to send Slack message:', err);
  }
};
