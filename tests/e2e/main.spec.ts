import { test, expect } from '@playwright/test';

test.describe('TableLinker E2E Tests', () => {

  test.describe('User Authentication', () => {
    test('User can create an account, log in and log out', async ({ page }) => {
      await page.goto('http://localhost:3000/');
      await page.click('text=Sign Up');
      await page.fill('input[name="email"]', 'testuser@example.com');
      await page.fill('input[name="password"]', 'password123');
      await page.click('button:has-text("Create Account")');
      await expect(page).toHaveURL(/.*dashboard/);
      
      await page.click('text=Logout');
      await expect(page).toHaveURL(/.*\//);
    });
  });

  test.describe('Create Relationships between Tables', () => {
    test('User can create relationships between tables', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');
      await page.click('text=Add Table');
      await page.selectOption('select[name="table1"]', 'Table A');
      await page.selectOption('select[name="table2"]', 'Table B');
      await page.selectOption('select[name="relationship_type"]', 'one-to-many');
      await page.click('button:has-text("Create Relationship")');
      await expect(page.locator('text=Relationship created')).toBeVisible();
      expect(await page.locator('.relationship').count()).toBeGreaterThan(0);
    });
  });

  test.describe('Drag-and-Drop Data Views', () => {
    test('User can rearrange data views using drag-and-drop', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');
      const table = page.locator('.table').first();
      const target = page.locator('.table').nth(1);
      await table.dragTo(target);

      await page.click('button:has-text("Save Layout")');
      await expect(page.locator('text=Layout saved')).toBeVisible();
    });
  });

  test.describe('Automated Tutorials and Guided Workflows', () => {
    test('User can start and complete tutorials', async ({ page }) => {
      await page.goto('http://localhost:3000/tutorials');
      await page.click('text=Start Tutorial');
      await expect(page.locator('text=Creating Relationships')).toBeVisible();
      await page.click('button:has-text("Next")');
      await page.click('button:has-text("Finish")');
      await expect(page.locator('text=Tutorial Completed')).toBeVisible();
    });
  });

  test.describe('Export Data Views', () => {
    test('User can export data views in CSV and JSON formats', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');
      await page.click('text=Export Data');
      await page.selectOption('select[name="export_format"]', 'CSV');
      await page.click('button:has-text("Export")');
      await expect(page.locator('text=Export successful')).toBeVisible();
    });
  });

  test.describe('Basic Reporting Tools', () => {
    test('User can generate and export reports', async ({ page }) => {
      await page.goto('http://localhost:3000/dashboard');
      await page.click('text=Generate Report');
      await page.selectOption('select[name="report_template"]', 'User Activity');
      await page.click('button:has-text("Generate")');
      await expect(page.locator('text=Report generated')).toBeVisible();
      await page.click('text=Export as CSV');
      await expect(page.locator('text=Report export successful')).toBeVisible();
    });
  });

  test.describe('Admin Dashboard', () => {
    test('Admin can view user statistics', async ({ page }) => {
      await page.goto('http://localhost:3000/admin');
      await expect(page.locator('text=Total Users')).toBeVisible();
      const totalUsers = await page.locator('span.total-users').innerText();
      expect(parseInt(totalUsers)).toBeGreaterThan(0);
      await expect(page.locator('text=Active Users Last 30 Days')).toBeVisible();
    });
  });

});