# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

photos = Photo.create([{ name: "Beach", image_url: "beach.jpg"}])

characters = Character.create([{ name: "Waldo", pos_x: 1123, pos_y: 335, photo_id: 1}])