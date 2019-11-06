class AddPhotoIdToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :photo_id, :integer
  end
end
