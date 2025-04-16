import { test, expect } from '@playwright/test';

test('Landing Page', async ({ page }) => {
    await page.goto('/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Sinfonia/);
    await expect(page.getByTestId('Ipen')).toBeVisible();
    await expect(page.getByTestId('Início')).toHaveCount(1);
    await expect(page.getByTestId('Reunião')).toHaveCount(1);
    await expect(page.getByTestId('Documentos')).toHaveCount(1);
    await expect(page.getByTestId('Administração')).toHaveCount(1);
  });


// Navigate to Reuniao
test('Navigate to Reuniao', async ({ page }) => {
    await page.goto('/');
  
    
    await page.getByTestId('Reunião').click();
    await expect(page).toHaveTitle(/Sinfonia/);
    // Header
    await expect(page.getByTestId('Ipen')).toBeVisible();
    // TopNav
    await expect(page.getByRole('link', {name:'Início'})).not.toHaveClass(/bg-sky-100/);
    await expect(page.getByRole('link', {name:'Reunião'}).first()).toHaveClass(/bg-sky-100/);
    await expect(page.getByTestId('Documentos')).toHaveCount(1);
    await expect(page.getByTestId('Administração')).toHaveCount(1);
    //SideNav
    await expect(page.getByTestId('sidenavreuniao')).toHaveCount(1);
    await expect(page.getByRole('link', {name:'Abertas'}).first()).toHaveClass(/bg-sky-100/);
    // Search
    await expect(page.getByRole('searchbox')).toHaveCount(1);
    await expect(page.getByRole('link', {name:'Criar Reunião'})).toHaveCount(1);
    await expect(page.getByRole('row')).toHaveCount(3);
});

// Navigate to edit reuniao
test('Navigate to Edit Reuniao', async ({ page }) => {
    await page.goto('/');
  
    
    await page.getByTestId('Reunião').click();
    await page.getByRole('button', {name:"Editar"}).first().click();
    await expect(page).toHaveTitle(/Sinfonia/);
    // Header
    await expect(page.getByTestId('Ipen')).toBeVisible();
    // TopNav
    await expect(page.getByTestId('sidenavreuniao')).toHaveCount(1);
    await expect(page.getByRole('link', {name:'Abertas'}).first()).toHaveClass(/bg-sky-100/);
    // Particpantes not editable
    await expect(page.getByTestId('ParticipantesByReuniao0')).toBeVisible();
    // Go back
    await page.getByRole('link', {name:"Voltar"}).first().click();
    await expect(page.getByRole('searchbox')).toHaveCount(1);
});

// Navigate to edit reuniao participant
test('Navigate to Edit Reuniao Participante', async ({ page }) => {
    await page.goto('/');
  
    
    await page.getByTestId('Reunião').click();
    await page.getByRole('button', {name:"Participantes"}).first().click();
    await expect(page).toHaveTitle(/Sinfonia/);
    // Header
    await expect(page.getByTestId('Ipen')).toBeVisible();
    // TopNav
    await expect(page.getByTestId('sidenavreuniao')).toHaveCount(1);
    await expect(page.getByRole('link', {name:'Abertas'}).first()).toHaveClass(/bg-sky-100/);
    // Particpantes not editable
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
    // Go back
    await page.getByRole('link', {name:"Voltar"}).first().click();
    await expect(page.getByRole('searchbox')).toHaveCount(1);
});

  // Reuniao Edit

test('Cannot Add Participante to Reuniao', async ({ page }) => {
    await page.goto('/sinfonia/reuniao/640/edit');
    await expect(page.getByTestId('ParticipantesByReuniao0')).toBeVisible();
});

// Reuniao Edit Participante

test('Edit Participante of Reuniao Unit', async ({ page }) => {
    await page.goto('/sinfonia/reuniao/640/editparticipante');
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
});

// Reuniao Navigate to Edit

test('Navigate to Reuniao Edit from Reuniao', async ({ page }) => {
    await page.goto('/sinfonia/reuniao');
    await page.getByLabel('Editar').first().click()
    await expect(page.getByTestId('ParticipantesByReuniao0')).toBeVisible();
 }
)

// Reuniao Navigate to Edit

test('Navigate to Reuniao AddParticipante from Reuniao', async ({ page }) => {
    await page.goto('/sinfonia/reuniao');
    await page.getByLabel('Participantes').first().click()
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
 }
)
