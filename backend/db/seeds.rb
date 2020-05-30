# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Image Instances

IMAGES = [
    {
        name: 'bag',
        source: 'bag.png'
    },
    {
        name: 'banana',
        source: 'banana.jpg'
    },
    {
        name: 'bar',
        source: 'bar.png'
    },
    {
        name: 'cherry',
        source: 'cherry.jpg'
    },
    {
        name: 'dollar',
        source: 'dollar.png'
    },
    {
        name: 'gold-seven',
        source: 'gold-seven.png'
    },
    {
        name: 'seven',
        source: 'seven.png'
    },
    {
        name: 'triple-seven',
        source: 'triple-seven.png'
    },
    {
        name: 'watermelon',
        source: 'watermelon.png'
    }
]

IMAGES.each do |image|
    Image.create(name: image[:name], source: image[:source])
end

