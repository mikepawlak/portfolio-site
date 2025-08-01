import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

import {
  sendSlackMessage,
  slackBotToken,
  slackChannelId,
} from './services/sendToSlack';

/**
 * Triggered when a new document is created in `portfolioMessages`.
 * Sends a formatted message to a Slack channel via bot token.
 */
export const formNotification = onDocumentCreated(
  {
    document: 'portfolioMessages/{docId}',
    secrets: [slackBotToken, slackChannelId],
  },
  async event => {
    logger.info('📨 New document created', { docId: event.params.docId });
    await sendSlackMessage(event);
  }
);
