let users = [
    {
        id: '0',
        username: 'admin',
        password: '$2b$10$jYJS7YuuOSsMVfes.I/V/eAieDdEZNK9.H3MjJ6MlMgv4YakzjS/2',
        type: 'user'
    }
]

function update(id, data) {
    const user = users.find(user => user.id === id)
    Object.assign(user, data)
}

module.exports = {
    users: users,
    update: update
}