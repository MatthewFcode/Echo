/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('chats', (table) => {
    table.increments('id')
    table.integer('user_id').references('users.id')
    table.integer('user_id2').references('users.id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('chats')
}
