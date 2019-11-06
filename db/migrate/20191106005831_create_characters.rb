class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :pos_x
      t.integer :pos_y

      t.timestamps
    end
  end
end
