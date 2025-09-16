/**
 * @param { import("knex").Knex } knex
<<<<<<< HEAD

 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('chats').insert([{ id: 1, user_id: 2, user_id2: 1 }])
}
