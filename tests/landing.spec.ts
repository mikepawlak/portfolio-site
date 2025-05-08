import { test, expect } from '@playwright/test';

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
    page.getByRole('button', { name: 'see more More' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'download resume Resume' })
  ).toBeVisible();

  // Expect socials
  await expect(
    page.getByRole('button', { name: 'email' }).first()
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'github' }).first()
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'linkedin' }).first()
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
