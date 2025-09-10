/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.integer('chat_id').references('chats.id')
    table.string('message')
    table.string('image')
    table.integer('user_id').references('users.id')
    table.string('time_stamp')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('chats')
}
