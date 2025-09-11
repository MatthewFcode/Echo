/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  await knex('users').insert([
    { auth0id: 'google-oauth2|10987654321', user_name: 'Bob', profile_pic: 'https://static.wikia.nocookie.net/btb/images/9/9d/434.jpg/revision/latest/scale-to-width-down/1200?cb=20230414211405'},
    {

      auth0id: 'auth0|test-user-id', 
      user_name: 'Test User',
      profile_pic: '/images/test.jpg',
    }

  ]);
};
