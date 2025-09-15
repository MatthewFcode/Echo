/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('chats').insert([
    {user_id: 2, user_id2: 1},
  ]);
};
