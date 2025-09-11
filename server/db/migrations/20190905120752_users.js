/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('auth0id')
    table.string('user_name')
    table.string('profile_pic')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
