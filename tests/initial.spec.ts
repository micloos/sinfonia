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
    await page.goto('/sinfonia/reuniao/1/edit');
    await expect(page.getByTestId('ParticipantesByReuniao0')).toBeVisible();
});

// Reuniao Edit Participante

test('Edit Participante of Reuniao Unit', async ({ page }) => {
    await page.goto('/sinfonia/reuniao/1/editparticipante');
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
    await page.getByRole('button', {name:"Participantes"}).first().click();
    await expect (page.getByRole('heading', {name:"Participantes Usuais"})).toBeVisible();
 }
)

 test('Add a Participante to Reuniao', async ({ page }) => {
    await page.goto('/sinfonia/reuniao');
    await page.getByLabel('Participantes').first().click()
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(3);
    await page.getByRole('button', {name:"Participantes"}).first().click();
    await expect (page.getByRole('heading', {name:"Participantes Usuais"})).toBeVisible();
    await page.getByRole('button', {name:"Adicionar Participante"}).nth(2).click();
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(4);
    await page.getByRole('row', { name: 'Excluir MSc. Felipe Maia' }).getByLabel('Excluir').click();
    await expect(page.getByTestId('ParticipantesByReuniao1')).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(3);
    

 }
)

// Reuniao Add Ordem do Dia
test('Add Ordem do Dia to Reuniao', async ({ page }) => {
    await page.goto('/sinfonia/reuniao/1/ordemDia');
    await expect(page.getByTestId('Ipen')).toBeVisible();
    await expect(page.getByRole('button', {name:"Salvar"})).toHaveCount(1);
    await expect(page.getByRole('link', {name:"Voltar"})).toHaveCount(1);
    await expect(page.getByRole('button', {name:"Salvar"})).toBeVisible();
    await expect(page.getByRole('link', {name:"Voltar"})).toBeVisible();
    await expect(page.getByRole('button', {name:"Ordem do Dia"})).toBeVisible();
    await page.getByRole('button', {name:"Ordem do Dia"}).click();
    await expect(page.getByRole('heading', {name:"Criar Ordem do Dia para reuniao"})).toBeVisible();
    await expect(page.getByRole('button', {name:"Salvar"})).toBeVisible();
    await expect(page.getByRole('link', {name:"Voltar"})).toBeVisible();
    await expect(page.getByRole('textbox')).toHaveCount(2);
    await expect(page.getByRole('textbox', {name:"assunto"})).toBeVisible();
    await expect(page.getByRole('textbox', {name:"deliberacao"})).toBeVisible();
    await expect(page.getByRole('textbox', {name:"deliberacao"})).toBeDisabled();
    await expect(page.getByRole('checkbox')).toBeVisible();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await page.getByRole('textbox', {name:"assunto"}).fill('Primeiro Teste de Ordem do Dia');
    await page.getByRole('button', {name:"Salvar"}).click();
    await expect(page.getByRole('heading', {name:"Criar Ordem do Dia para reuniao"})).not.toBeVisible();

}
)