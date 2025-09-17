/**
 * @param { import("knex").Knex } knex

 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  
  await knex('users').insert([
    {
      id: 1,
      auth0id: 'google-oauth2|10987654321',
      user_name: 'Bob',
      profile_pic: 'https://static.wikia.nocookie.net/btb/images/9/9d/434.jpg',
    },
    {
      id: 2,
      auth0id: 'google-oauth2|113371660698602666717',
      user_name: 'abe',
      profile_pic:
        'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
    },
    {
      id: 3,
      auth0id: 'auth0|test-user-id',
      user_name: 'Test User',
      profile_pic: '/images/test.jpg',
    },
  ])
}
