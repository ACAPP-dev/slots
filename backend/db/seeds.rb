# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Image Instances

# Using only a few images for testing

IMAGES = [
    # {
    #     name: 'bag',
    #     source: 'bag.png',
    #     win_code: 0
    # },
    {
        name: 'banana',
        source: 'banana.jpg',
        win_code: 3
    },
    {
        name: 'gold-seven',
        source: 'gold-seven.png',
        win_code: 2
    },
    {
        name: 'bar',
        source: 'bar.png',
        win_code: 0
    },
    # {
    #     name: 'cherry',
    #     source: 'cherry.jpg',
    #     win_code: 3
    # },
    {
        name: 'dollar',
        source: 'dollar.png',
        win_code: 1
    },
    {
        name: 'seven',
        source: 'seven.png',
        win_code: 2
    },
    # {
    #     name: 'triple-seven',
    #     source: 'triple-seven.png',
    #     win_code: 2
    # },
    {
        name: 'watermelon',
        source: 'watermelon.png',
        win_code: 3
    }
]

IMAGES.each do |image|
    Image.create(name: image[:name], source: image[:source], win_code: image[:win_code])
end

# Create 2 users

user1 = User.create(name: 'Andrew', username: 'acapp', password: '1234')
user2 = User.create(name: 'Sharon', username: 'sharon', password: '1111')

# Create deposit transactions

user1.transactions.build(transaction_type: 1, amount: 1000.00)
user1.balance += user1.transactions.last.amount
user1.save
user2.transactions.build(transaction_type: 1, amount: 10000.00)
user2.balance += user2.transactions.last.amount
user2.save

