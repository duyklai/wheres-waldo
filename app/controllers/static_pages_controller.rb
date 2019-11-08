class StaticPagesController < ApplicationController
    def home
        @photos = Photo.all
    end
end
