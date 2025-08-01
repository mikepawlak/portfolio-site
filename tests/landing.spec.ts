import { test, expect } from '@playwright/test';
import admin from 'firebase-admin';

test.beforeAll(async () => {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  admin.initializeApp({ projectId: 'portfolio-mikepawlak' });
});

test('landing page', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Expect all title elements
  await expect(page).toHaveTitle(/Mike Pawlak - Software Engineer/);
  await expect(page.getByText('<MIKE/>')).toBeVisible();

  const currentIntro = page.getByText('I am currently', { exact: false });
  await expect(currentIntro).toBeVisible();
  await expect(currentIntro).toHaveText(/I am currently\s+.+/);

  // Expect CTAs
  await expect(
    page.getByRole('link', { name: 'download resume Resume' })
  ).toBeVisible();

  // Expect socials
  await expect(page.getByRole('link', { name: 'email' }).first()).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'github' }).first()
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'linkedin' }).first()
  ).toBeVisible();

  // Expect form
  await expect(page.getByText('Get In Touch!')).toBeVisible();
  await expect(
    page.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit…')
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test');
  await page.getByText('Message').click();
  await page.getByRole('textbox', { name: 'Message' }).fill('asdf');
  page.once('dialog', async dialog => {
    await expect(dialog.message()).toBe('Message sent!');
    dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Send' }).click();
});

test('contact form', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // fill in form (incorrectly)
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test');
  await page.getByRole('textbox', { name: 'Company' }).click();
  await page.getByRole('textbox', { name: 'Company' }).fill('test');
  await page.getByText('Message').click();
  await page.getByRole('textbox', { name: 'Message' }).fill('hello from e2e');

  // expect email validation error and correct
  await expect(page.getByText('Must be a valid email')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@e2e.com');

  // send message
  await page.getByRole('button', { name: 'Send' }).click();

  // expect success message
  await expect(page.getByText('Thank you for your interest')).toBeVisible();

  // wire up to db
  const db = admin.firestore();
  const snapshot = await db
    .collection('portfolioMessages')
    .where('email', '==', 'test@e2e.com')
    .get();
  // Assert that at least one document matched:
  expect(snapshot.size).toBeGreaterThan(0);
  const data = snapshot.docs[0].data();
  expect(data.name).toBe('test');
  expect(data.message).toContain('hello from e2e');
});
