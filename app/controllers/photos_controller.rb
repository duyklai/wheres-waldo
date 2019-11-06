class PhotosController < ApplicationController
    def show
        @photo = Photo.find(params[:id])
        @image_url = @photo.image_url
    end
end
