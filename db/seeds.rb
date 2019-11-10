# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

photos = Photo.create([{ name: "Beach", image_url: "beach.jpg"}, 
                       { name: "Store", image_url: "store.jpg"}, 
                       { name: "Town Center", image_url: "towncenter.jpg"}, 
                       { name: "Food Hall", image_url: "foodhall.jpg"}])

characters = Character.create([{ name: "Waldo", #Beach Photo
                                 pos_x: 1123, 
                                 pos_y: 390, 
                                 photo_id: 1},
                                 # Store Photo
                               { name: "Waldo",
                                 pos_x: 854,
                                 pos_y: 238, 
                                 photo_id: 2},
                                 #Town Center Photo
                               { name: "Waldo",
                                 pos_x: 866,
                                 pos_y: 706,
                                 photo_id: 3},
                               { name: "Wenda",
                                 pos_x: 876,
                                 pos_y: 585,
                                 photo_id: 3},
                               { name: "Wizard",
                                 pos_x: 1170,
                                 pos_y: 728,
                                 photo_id: 3},
                               { name: "Odlaw",
                                 pos_x: 1079,
                                 pos_y: 876,
                                 photo_id: 3},
                                 # Food Hall Photo
                                 { name: "Waldo",
                                 pos_x: 1052,
                                 pos_y: 384,
                                 photo_id: 4},
                               { name: "Wenda",
                                 pos_x: 812,
                                 pos_y: 361,
                                 photo_id: 4},
                               { name: "Wizard",
                                 pos_x: 1430,
                                 pos_y: 797,
                                 photo_id: 4},
                               { name: "Odlaw",
                                 pos_x: 828,
                                 pos_y: 590,
                                 photo_id: 4},])
