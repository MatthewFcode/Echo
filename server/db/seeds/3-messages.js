/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('messages').insert([
    {
      chat_id: 1,
      message: 'Hey, how are you?',
      image: '',
      user_id: 1,
      time_stamp: '2025-09-12T10:00:00Z',
    },
    {
      chat_id: 1,
      message: 'Doing great! You?',
      image: '',
      user_id: 2,
      time_stamp: '2025-09-12T10:01:00Z',
    },
  ])
}
