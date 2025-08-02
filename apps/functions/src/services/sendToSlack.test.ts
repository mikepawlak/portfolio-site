/* eslint-disable */
import { FirestoreEvent } from 'firebase-functions/firestore';
import { sendSlackMessage, slackBotToken, slackChannelId } from './sendToSlack';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('sendSlackMessage', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    mockedFetch.mockReset();
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();

    // @ts-ignore - override defineSecret.value for testing
    slackBotToken.value = () => 'fake-token';
    // @ts-ignore
    slackChannelId.value = () => 'fake-channel';
  });

  it('sends a formatted Slack message on document creation', async () => {
    const eventMock = {
      data: {
        data: () => ({
          name: 'Alice',
          email: 'alice@example.com',
          message: 'Hello!',
        }),
      },
      params: {
        docId: 'abc123',
      },
    };

    mockedFetch.mockResolvedValue({
      json: async () => ({ ok: true }),
    } as any);

    await sendSlackMessage(
      eventMock as unknown as FirestoreEvent<FirebaseFirestore.QueryDocumentSnapshot>
    );

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://slack.com/api/chat.postMessage',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        }),
        body: expect.any(String),
      })
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      '✅ Slack message sent successfully.'
    );
  });

  it('logs an error when Slack API fails', async () => {
    const eventMock = {
      data: {
        data: () => ({
          name: 'Bob',
          email: 'bob@example.com',
          message: 'Hi!',
        }),
      },
      params: {
        docId: 'def456',
      },
    };

    mockedFetch.mockResolvedValue({
      json: async () => ({ ok: false, error: 'invalid_auth' }),
    } as any);

    await sendSlackMessage(
      eventMock as unknown as FirestoreEvent<FirebaseFirestore.QueryDocumentSnapshot>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '❌ Failed to send Slack message:',
      expect.any(Error)
    );
  });

  it('logs an error when no data is found', async () => {
    const eventMock = {
      data: undefined,
      params: {
        docId: 'ghi789',
      },
    };

    await sendSlackMessage(
      eventMock as unknown as FirestoreEvent<FirebaseFirestore.QueryDocumentSnapshot>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith('No document data found.');
  });
});
