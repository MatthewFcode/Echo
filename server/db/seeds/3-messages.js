/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('messages').insert([
    {
      user_id: 2,
      chat_id: 1,
      message: 'This is a seed message',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png',
      time_stamp: '2025-09-15T06:26:08.123',
    },
  ])
}
