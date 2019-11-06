class AddUrlToPhotos < ActiveRecord::Migration[5.2]
  def change
    add_column :photos, :image_url, :string
  end
end
