/**
 * @param { import("knex").Knex } knex


 * @returns { Promise<void> }
 */

export async function seed(knex) {

  await knex('chats').insert([{ id: 1, user_id: 2, user_id2: 1 }])
}
